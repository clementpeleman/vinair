import { Link } from "@nextui-org/react";
import Image from "next/image";
import { button as buttonStyles } from "@nextui-org/theme";
import { useEffect, useState } from "react";

import { title } from "@/components/primitives";
import { subtitle } from "@/components/primitives";
import { supabase } from "@/lib/supabase";

export default function Hero() {
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
    <section className="container mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center justify-between h-[85vh] gap-4 mb-24">
      <div className="flex-grow-2">
        <div className="inline-block max-w-xl text-left justify-center lg:mt-[-12vh] mt-[4vh]">
          <span className={title({ size: "lg", class:"font-milo" })}>We bring&nbsp;</span>
          <span className={title({ color: "primary", size: "lg", class:"font-milo" })}>wine</span>
          <span className={title({ size: "lg", class:"font-milo" })}>
            -food pairings to the ordinary table
          </span>
          <div className={subtitle({ class: "mt-2" })}>
            Order specifically selected wine to complement
            <br />
            your dishes or suggestions
          </div>
        </div>

        <div className="flex gap-3 text-white mt-8">
          <Link
            className={buttonStyles({
              size: "lg",
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={isLoggedIn ? "/scanner" : "/register"} // Wijzig hier de link
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
      </div>
      <div className="relative w-full max-w-[700px] lg:w-2/3 h-[60vh] mt-[-2vh] lg:mt-[-14vh]">
        {" "}
        {/* Container voor de afbeelding */}
        <Image
          alt="Hero picture"
          className="" // Optioneel: voeg afgeronde hoeken toe
          layout="fill" // Vul de container
          objectFit="cover" // Zorg ervoor dat de afbeelding de container bedekt
          src="/pizza_wine.png"
        />
      </div>
    </section>
  );
}
