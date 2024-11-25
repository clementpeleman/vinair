import Image from "next/image";
import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";

import { subtitle, title } from "@/components/primitives";
import { RightArrowWithLine } from "@/components/Icons";
import { supabase } from "@/lib/supabase";

export default function SecFeatures() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);

        return;
      }
      setIsLoggedIn(!!session?.session?.user);
    };

    fetchSession();
  }, []);

  return (
    <section className="min-h-[100vh] w-full">
      <div className="relative mx-auto w-full z-0 lg:max-w-[600px] max-w-[400px] h-[300px] lg:h-[500px]">
        <Image
          unoptimized
          alt="Hero picture"
          className="" // Optioneel: voeg afgeronde hoeken toe
          layout="fill" // Vul de container
          objectFit="cover" // Zorg ervoor dat de afbeelding de container bedekt
          src="/dancing.gif"
        />
      </div>
      <p
        className={subtitle({
          class: "text-center mt-[-10px] z-10 relative tracking-wider",
          size: "mini",
        })}
      >
        FEATURES
      </p>
      <p
        className={title({
          class: "max-w-[570px] px-6 mx-auto font-milo",
          fullWidth: true,
        })}
      >
        Gain Customers By <span className="">Elevating</span> Experiences.
      </p>
      <div className="container mt-16 md:mt-32 mx-auto xl:px-16 py-8 mb-16 md:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-0 xl:gap-4">
          <div className="flex flex-col items-center text-center px-4 xl:px-16 bg-white rounded-lg mb-0 md:mb-16 lg:mb-0">
            <div className="bg-pink-100 p-5 rounded-3xl mb-2">
              <Image
                alt="Increase customer experiences"
                height={28} // Pas de hoogte aan
                src="./thumbsup.svg" // Vervang dit door het pad naar je SVG-bestand
                width={28} // Pas de breedte aan
              />
            </div>
            <h3
              className={subtitle({
                class: "text-blacktext-2xl",
                size: "md",
              })}
            >
              Increase satisfaction
            </h3>
            <p className=" text-gray-500">Enhance experiences</p>
          </div>

          <div className="flex flex-col items-center text-center px-20 md:px-4 xl:px-16 bg-white rounded-lg ">
            <div className="bg-blue-100 p-5 rounded-3xl mb-2">
              <Image
                alt=""
                height={28} // Pas de hoogte aan
                src="/paper.svg" // Vervang dit door het pad naar je SVG-bestand
                width={28} // Pas de breedte aan
              />
            </div>
            <h3
              className={subtitle({
                class: "text-black text-2xl",
                size: "md",
              })}
            >
              Easy to use
            </h3>
            <p className=" text-gray-500">Get started using our menu scanner</p>
          </div>

          <div className="flex flex-col items-center text-center px-20 xl:px-12 bg-white rounded-lg ">
            <div className="bg-green-100 p-5 rounded-3xl mb-2">
              <Image
                alt=""
                height={28} // Pas de hoogte aan
                src="./stack.svg" // Vervang dit door het pad naar je SVG-bestand
                width={28} // Pas de breedte aan
              />
            </div>
            <h3
              className={subtitle({
                class: "text-black text-2xl",
                size: "md",
              })}
            >
              Flexible
            </h3>
            <p className=" text-gray-500">Select your personal preferences</p>
          </div>

          <div className="flex flex-col items-center text-center px-12 bg-white rounded-lg ">
            <div className="bg-yellow-100 p-5 rounded-3xl mb-2">
              <Image
                alt=""
                height={28} // Pas de hoogte aan
                src="./cog.svg" // Vervang dit door het pad naar je SVG-bestand
                width={28} // Pas de breedte aan
              />
            </div>
            <h3
              className={subtitle({
                class: "text-black text-2xl",
                size: "md",
              })}
            >
              Seamless integration
            </h3>
            <p className=" text-gray-500">
              Place your order directly after receiving your pairings
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16 bg-gray-50 rounded-xl mb-32 mx-auto w-[90vw] md:w-auto lg:max-w-[1200px]">
        <div className="text-center">
          <p
            className={subtitle({
              class: "tracking-wider mb-[-4px]",
              size: "mini",
            })}
          >
            MENU SCANNER
          </p>
          <p className={title({ class: "font-milo", fullWidth: true })}>
            Try now!
          </p>
          <Button
            as={Link}
            className="mt-12 bg-deepBlue bg-opacity-10 text-deepBlue"
            endContent={
              <RightArrowWithLine
                height={undefined}
                size={48}
                width={undefined}
              />
            }
            radius="lg"
            size="lg"
            variant="flat"
            href={isLoggedIn ? "/menu-scanner" : "/register"}
          >
            {isLoggedIn ? "GET PAIRINGS" : "REGISTER NOW"}
          </Button>
        </div>
      </div>
    </section>
  );
}
