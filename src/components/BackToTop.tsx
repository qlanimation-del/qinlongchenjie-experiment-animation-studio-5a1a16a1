import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 400);
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
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-8 z-[9999] bg-muted/50 hover:bg-muted backdrop-blur-md p-3 rounded-full text-foreground transition-all duration-300
        ${visible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      aria-label="Back to top"
    >
      <ChevronUp size={22} />
    </button>
  );
};

export default BackToTop;
