"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

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
    <>
      <section className="container mx-auto max-w-7xl px-6 flex flex-col items-start justify-center h-[85vh] gap-4">
        <div className="inline-block font-milo max-w-xl text-left justify-center mt-[-12vh]">
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
      <section className="bg-[rgba(0,142,117,0.11)] min-h-[100vh]">
        <img
          alt="Arc Illustration"
          className="w-full h-auto object-top transform scale-y-[0.4] origin-top"
          src="/arc-cropped.svg"
        />
        <div className="flex justify-center gap-4 mt-16">
          <Card radius="lg" className="flex items-center shadow-none w-1/3">
            <CardHeader>
              <h3 className="w-full text-[42px] text-center font-milo  ">Scan To Get Started</h3>
            </CardHeader>
            <CardBody className="w-2/3 text-center">
              <p className={subtitle()}>Effortlessly select wines that perfectly complement your existing menu or seasonal dishes with just a scan.</p>
            </CardBody>
            <CardFooter className="w-full">
              <Link href="/link1" className="mx-auto text-primary">More Information</Link>
            </CardFooter>
          </Card>
          <Card radius="lg" className="flex items-center shadow-none w-1/3">
            <CardHeader>
              <h3 className="w-full text-[42px] text-center font-milo  ">Serve Wine And Knowledge</h3>
            </CardHeader>
            <CardBody className="w-2/3 text-center">
              <p className={subtitle()}>Offer your guests expertly paired wines that enhance their dining experience.</p>
            </CardBody>
            <CardFooter className="w-full">
              <Link href="/link1" className="mx-auto text-primary">More Information</Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
