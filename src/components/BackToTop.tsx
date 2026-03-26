import { useEffect, useCallback, useRef } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const wasVisible = useRef(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 400;
        // Only touch DOM when crossing the threshold
        if (shouldShow !== wasVisible.current) {
          wasVisible.current = shouldShow;
          if (btnRef.current) {
            if (shouldShow) {
              btnRef.current.style.opacity = "1";
              btnRef.current.style.visibility = "visible";
              btnRef.current.style.pointerEvents = "auto";
            } else {
              btnRef.current.style.opacity = "0";
              btnRef.current.style.visibility = "hidden";
              btnRef.current.style.pointerEvents = "none";
            }
          }
        }
        ticking.current = false;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-5 bottom-8 z-[9999] bg-muted/50 hover:bg-muted backdrop-blur-md p-3 rounded-full text-foreground transition-all duration-300"
      style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
      aria-label="Back to top"
    >
      <ChevronUp size={22} />
    </button>
  );
};

export default BackToTop;
