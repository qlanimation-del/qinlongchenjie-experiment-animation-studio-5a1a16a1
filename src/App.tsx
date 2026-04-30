import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";

const Work = lazy(() => import("./pages/Work"));
const Drawing = lazy(() => import("./pages/Drawing"));
const Photographs = lazy(() => import("./pages/Photographs"));
const Artists = lazy(() => import("./pages/Artists"));
const Contact = lazy(() => import("./pages/Contact"));
const Texts = lazy(() => import("./pages/Texts"));
const News = lazy(() => import("./pages/News"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Toaster />
      
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route path="/drawing" element={<Drawing />} />
            <Route path="/photographs" element={<Photographs />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/team" element={<Artists />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/texts" element={<Texts />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
