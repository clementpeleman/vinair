"use client";

import { subtitle } from "@/components/primitives";
import Features from "@/sections/mainFeatures";
import SecFeatures from "@/sections/secondaryFeatures";

export default function FeaturesPage() {
  return (
    <div className="mt-[-4vh] mb-[-80px] md:mt-0 md:mb-0">
      <p className={subtitle({ size: "md", class: "tracking-wider" })}>
        FEATURES
      </p>
      <Features />
      <SecFeatures />
    </div>
  );
}
