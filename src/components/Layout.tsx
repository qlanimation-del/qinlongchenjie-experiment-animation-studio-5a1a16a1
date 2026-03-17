import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { NavVariant } from "./Navbar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  fullBleed?: boolean;
  navVariant?: NavVariant;
  className?: string;
}

const Layout = ({ children, fullBleed = false, navVariant = "dark", className }: LayoutProps) => {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <Navbar variant={navVariant} />
      <main className={`flex-1 ${fullBleed ? "" : "pt-[72px]"}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
