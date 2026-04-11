import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  variant?: "fade" | "reveal";
}

const AnimatedSection = ({ children, className = "", threshold, variant = "fade" }: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(threshold);

  const animClass = variant === "reveal"
    ? cn("clip-reveal", isVisible && "clip-reveal--visible")
    : cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      );

  return (
    <div ref={ref} className={cn(animClass, className)}>
      {children}
    </div>
  );
};

export default AnimatedSection;
