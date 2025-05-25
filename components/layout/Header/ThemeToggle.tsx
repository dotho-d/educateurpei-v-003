/**
 * components/layout/Header/ThemeToggle.tsx
 * Composant toggle theme optimisé et mémorisé
 */
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, memo } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = memo(function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className={cn(
        "bg-transparent text-foreground rounded-full inline-flex items-center justify-center p-2",
        "transition-all duration-200 hover:bg-primary/10 hover:text-primary border-0 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
    >
      {theme === "dark" ? 
        <Sun className="w-5 h-5" aria-hidden="true" /> : 
        <Moon className="w-5 h-5" aria-hidden="true" />
      }
    </button>
  );
});

export default ThemeToggle;