"use client";

import Image from "next/image";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";

import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/react";
import { RightArrowWithLine } from "@/components/Icons";
import { supabase } from "@/lib/supabase";

const AboutPage = () => {
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
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pb-12 md:pb-24 mx-auto text-center lg:pb-32 xl:pb-48 bg-background">
        <p className={subtitle({ size: "md", class: "tracking-wider" })}>
          ABOUT
        </p>
      </section>

      {/* Mission and Values Section */}
      <section className="w-full rounded-lg py-12 md:py-24 lg:py-24 bg-muted">
        <div className="container px-4 md:px-6 ">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
            <div className="flex flex-col  space-y-4">
              <h2
                className={title({
                  size: "md",
                })}
              >
                Mission
              </h2>
              <p className="text-muted-foreground">
                At VinAir, we&apos;re on a mission to revolutionize the dining
                experience by making expert wine pairing accessible to everyone.
                We believe that the right wine can elevate any meal from
                ordinary to extraordinary.
              </p>
            </div>
            <div className="flex flex-col ml-12 justify-start space-y-4">
              <h2
                className={title({
                  size: "md",
                })}
              >
                <span className="text-primary">Values</span>
              </h2>
              <ul className="list-decimal list-inside text-muted-foreground">
                <li>Innovation in gastronomy</li>
                <li>Accessibility of expert knowledge</li>
                <li>Enhancing culinary experiences</li>
                <li>Promoting wine education</li>
              </ul>
            </div>
            <div className="flex flex-col justify-start space-y-4">
              <h2
                className={title({
                  size: "md",
                })}
              >
                {" "}
                Vision
              </h2>
              <p className="text-muted-foreground">
                We envision a world where every dining table becomes a stage for
                culinary excellence, where the perfect harmony between food and
                wine is achieved with just a simple scan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full rounded-lg py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className={title({ size: "md", class: "text-center" })}>
            Meet Our Team
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-36 mb-12">
            {[
              {
                name: "Mona Sommelier",
                role: "Chief Wine Officer",
                image: "/monasommelier.svg",
              },
              {
                name: "Clément Tech",
                role: "Lead Developer",
                image: "/clementtech.svg",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center space-y-4"
              >
                <Image
                  alt={member.name}
                  className="rounded-full"
                  height={200}
                  src={member.image}
                  width={200}
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="w-full rounded-t-lg pt-8 pb-12 md:pb-24 lg:pb-32 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className={title({ size: "md", class: "text-center mb-12" })}>
            Our Journey
          </h2>
          <div className="flex flex-col items-center space-y-8">
            {[
              {
                year: "Jul 2022",
                event: "Idea generation phase",
              },
              {
                year: "Oct 2022",
                event: "Idea validation with real-world use case testing",
              },
              {
                year: "Mar 2023",
                event: "Launching website and defining user workflow",
              },
              {
                year: "2024",
                event:
                  "Developing workflow with a combination of in-house and outsourced development",
              },
            ].map((item, index) => (
              <div key={index} className="flex min-w-[550px] max-w-[560px]">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center text-white w-8 h-8 rounded-full bg-primary">
                    {index + 1}
                  </div>
                  {index !== 4 && <div className="w-px h-full bg-border" />}
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold">{item.year}</p>
                  <p className="text-muted-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="w-full rounded-b-lg py-12 md:py-24 lg:py-32 mb-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2
                className={title({
                  size: "lg",
                  class: "text-primary-foreground",
                })}
              >
                Ready to elevate your dining experience?
              </h2>
              <p
                className={subtitle({
                  class: "max-w-[700px] mx-auto text-white",
                })}
              >
                Join VinAir today and discover the perfect wine pairing for
                every meal.
              </p>
            </div>
            <div>
              <Button
                as={Link}
                className="mt-12 bg-white bg-opacity-10 text-white"
                endContent={
                  <RightArrowWithLine
                    height={undefined}
                    size={48}
                    width={undefined}
                  />
                }
                href={isLoggedIn ? "/scanner" : "/register"}
                radius="lg"
                size="lg"
                variant="flat"
              >
                {isLoggedIn ? "GET PAIRINGS" : "REGISTER NOW"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
