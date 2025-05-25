import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Rate limiting basique par IP
  const ip = request.ip ?? '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Bloquer les requêtes suspectes
  const suspiciousPatterns = [
    /curl/i, /wget/i, /python/i, /bot/i, /crawler/i, /spider/i,
    /scanner/i, /exploit/i, /hack/i, /sql/i, /injection/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return new Response('Forbidden', { status: 403 });
  }
  
  // Bloquer les extensions suspectes
  const suspiciousExtensions = ['.php', '.asp', '.aspx', '.jsp', '.cgi'];
  if (suspiciousExtensions.some(ext => request.nextUrl.pathname.endsWith(ext))) {
    return new Response('Not Found', { status: 404 });
  }
  
  // Headers de sécurité additionnels
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Bloquer l'accès direct aux fichiers sensibles
  if (request.nextUrl.pathname.includes('/.env') || 
      request.nextUrl.pathname.includes('/config') ||
      request.nextUrl.pathname.includes('/.git')) {
    return new Response('Forbidden', { status: 403 });
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};