import { ReactNode, CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { usePerfMode } from "@/hooks/usePerfMode";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  variant?: "fade" | "reveal" | "flip3d";
}

const AnimatedSection = ({ children, className = "", threshold, variant = "fade" }: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(threshold);
  const degraded = usePerfMode();

  let animClass = "";
  let style: CSSProperties | undefined;

  // When perf is degraded, flip3d auto-falls back to a plain fade.
  const effectiveVariant = variant === "flip3d" && degraded ? "fade" : variant;

  if (effectiveVariant === "reveal") {
    animClass = cn("clip-reveal", isVisible && "clip-reveal--visible");
  } else if (effectiveVariant === "flip3d") {
    animClass = "will-change-transform";
    style = {
      transformStyle: "preserve-3d",
      transformOrigin: "center top",
      transition:
        "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)"
        : "perspective(900px) rotateX(24deg) rotateY(-6deg) translate3d(0,56px,-140px)",
    };
  } else {
    // Default fade now carries a subtle 3D tilt so every page (incl. mobile) feels layered.
    // Degrades to flat fade when perf monitor reports drops.
    if (degraded) {
      animClass = cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      );
    } else {
      animClass = "will-change-transform";
      style = {
        transformStyle: "preserve-3d",
        transformOrigin: "center top",
        transition:
          "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "perspective(1000px) rotateX(0deg) translate3d(0,0,0)"
          : "perspective(1000px) rotateX(10deg) translate3d(0,32px,-60px)",
      };
    }
  }

  return (
    <div ref={ref} className={cn(animClass, className)} style={style}>
      {children}
    </div>
  );
};

export default AnimatedSection;
