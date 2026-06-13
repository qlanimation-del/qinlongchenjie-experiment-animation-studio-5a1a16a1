import { ReactNode, CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { usePerfMode } from "@/hooks/usePerfMode";
import { useDeviceTilt } from "@/hooks/useDeviceTilt";
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
  const tilt = useDeviceTilt(30);

  let animClass = "";
  let style: CSSProperties | undefined;

  const effectiveVariant = variant === "flip3d" && degraded ? "fade" : variant;

  // Live tilt rotation once the section is visible (mobile only — desktop tilt is 0).
  // Gives a subtle gyroscope-driven float so every block reacts to phone motion.
  const tiltRotX = isVisible ? (-tilt.y * 6).toFixed(2) : "0";
  const tiltRotY = isVisible ? (tilt.x * 8).toFixed(2) : "0";
  const tiltTransZ = isVisible ? (Math.abs(tilt.x) * 10 + Math.abs(tilt.y) * 6).toFixed(2) : "0";

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
        ? `perspective(900px) rotateX(${tiltRotX}deg) rotateY(${tiltRotY}deg) translate3d(0,0,${tiltTransZ}px)`
        : "perspective(900px) rotateX(24deg) rotateY(-6deg) translate3d(0,56px,-140px)",
    };
  } else {
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
          "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `perspective(800px) rotateX(${tiltRotX}deg) rotateY(${tiltRotY}deg) translate3d(0,0,${tiltTransZ}px)`
          : "perspective(800px) rotateX(28deg) rotateY(-5deg) translate3d(0,70px,-160px)",
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
