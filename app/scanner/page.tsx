"use client";

import React from "react";

import { MenuScanner } from "@/components/wine/MenuScanner";
import { ProtectedRoute } from "@/utils/authcontext";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto py-24">
          <header className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-milo tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Menu Scanner
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your menu into expertly curated wine recommendations
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            <MenuScanner />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
