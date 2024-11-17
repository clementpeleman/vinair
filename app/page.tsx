"use client"

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { useState } from "react";
import { useEffect } from "react";

import { title, subtitle } from "@/components/primitives";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching session:", error.message);

        return;
      }

      setIsLoggedIn(!!session?.session?.user);
    };

    fetchSession();
  }, []);

  return (
    <section className="flex flex-col items-start justify-center h-[65vh] gap-4 py-8 md:py-10">
      <div className="inline-block font-milo max-w-xl text-left justify-center">
        <span className={title({ size: "lg" })}>We bring&nbsp;</span>
        <span className={title({ color: "primary", size: "lg" })}>wine</span>
        <span className={title({ size: "lg" })}>
          -food pairings to the ordinary table
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Order specifically selected wine to complement
          <br />
          your dishes or suggestions
        </div>
      </div>

      <div className="flex gap-3 text-white">
        <Link
          className={buttonStyles({
            size: "lg",
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={isLoggedIn ? "https://try.vinair.tech" : "/login"} // Wijzig hier de link
        >
          {isLoggedIn ? "Try Now" : "Get Started"}
        </Link>
        <Link
          className={buttonStyles({
            size: "lg",
            variant: "bordered",
            radius: "full",
          })}
          href="/about"
        >
          Discover More
        </Link>
      </div>
    </section>
  );
}
