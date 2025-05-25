/**
 * components/layout/Header/Logo.tsx
 * Composant Logo optimisé et mémorisé
 */
import Link from "next/link";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = memo(function Logo({ className }: LogoProps) {
  return (
    <div className="w-auto">
      <Link 
        href="/" 
        className={cn(
          "flex items-center font-bold whitespace-nowrap",
          "transition-colors duration-300 hover:text-primary",
          "text-3xl sm:text-4xl logo-text font-annie",
          className
        )}
        aria-label="Accueil Éducateur péi"
      >
        Éducateur péi
      </Link>
    </div>
  );
});

export default Logo;