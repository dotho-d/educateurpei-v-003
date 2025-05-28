/**
 * middleware.ts - Middleware sécurisé optimisé
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cache pour rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Récupération de l'IP avec fallback
  const ip = request.ip ?? 
    request.headers.get('x-forwarded-for')?.split(',')[0] ?? 
    request.headers.get('x-real-ip') ?? 
    '127.0.0.1';
    
  const userAgent = request.headers.get('user-agent') || '';
  const now = Date.now();
  
  // Rate limiting amélioré
  const rateLimitKey = `${ip}:${request.nextUrl.pathname}`;
  const requestData = requestCounts.get(rateLimitKey);
  
  if (!requestData || now > requestData.resetTime) {
    requestCounts.set(rateLimitKey, {
      count: 1,
      resetTime: now + 60000 // 1 minute
    });
  } else if (requestData.count >= 100) { // 100 requests per minute
    return new Response('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(requestData.resetTime / 1000))
      }
    });
  } else {
    requestData.count++;
  }
  
  // Détection de bots malveillants améliorée
  const suspiciousPatterns = [
    /curl/i, /wget/i, /python-requests/i, /go-http-client/i,
    /bot(?!.*google|.*bing|.*yahoo)/i, 
    /crawler/i, /spider/i, /scanner/i, /exploit/i, 
    /hack/i, /sql/i, /injection/i, /\.\.\//, /\/\.\./,
    /union.*select/i, /script.*alert/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    // Log l'tentative suspecte
    console.warn(`Blocked suspicious request from ${ip}: ${userAgent}`);
    return new Response('Forbidden', { status: 403 });
  }
  
  // Blocage des extensions dangereuses
  const dangerousExtensions = [
    '.php', '.asp', '.aspx', '.jsp', '.cgi', '.pl', 
    '.py', '.rb', '.sh', '.bat', '.exe', '.dll'
  ];
  
  if (dangerousExtensions.some(ext => request.nextUrl.pathname.endsWith(ext))) {
    return new Response('Not Found', { status: 404 });
  }
  
  // Headers de sécurité renforcés
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin'
  };
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Blocage d'accès aux fichiers sensibles
  const sensitiveFiles = [
    '/.env', '/config', '/.git', '/.vscode', 
    '/node_modules', '/.next', '/package.json', 
    '/yarn.lock', '/package-lock.json'
  ];
  
  if (sensitiveFiles.some(file => request.nextUrl.pathname.includes(file))) {
    return new Response('Forbidden', { status: 403 });
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};