
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import CustomHeaderCode from "./components/CustomHeaderCode";
import Homepage from "./pages/Homepage";
import ArticlePage from "./pages/ArticlePage";
import BlogPost from "./pages/BlogPost";
import BlogListing from "./pages/BlogListing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DMCAPolicy from "./pages/DMCAPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <CustomHeaderCode />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/en" element={<Homepage />} />
              <Route path="/artikel" element={<ArticlePage />} />
              <Route path="/en/article" element={<ArticlePage />} />
              <Route path="/blog" element={<BlogListing />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/dmca" element={<DMCAPolicy />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
