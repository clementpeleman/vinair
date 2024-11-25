import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";

import { subtitle } from "@/components/primitives";

export default function Features() {
  return (
    <section className="bg-[rgba(0,142,117,0.11)] min-h-[100vh] pb-32 z-10">
      <img
        alt="Arc Illustration"
        className="w-full h-auto object-top transform scale-y-[0.4] origin-top"
        src="/arc-cropped.svg"
      />
      <div className="flex justify-center flex-col md:flex-row items-center gap-8 mt-16 max-w-[850px] lg:max-w-[1050px] mx-auto">
        <Card className="flex items-center shadow-none mx-6 md:mx-0 max-w-[480px] md:max-w-full md:w-1/2 rounded-[30px] transition-all duration-400 ease-in-out hover:saturate-150 hover:cursor-pointer">
          <Button
            as={Link}
            className="mt-12 bg-deepPink bg-opacity-10 text-deepPink"
            radius="md"
            size="md"
            variant="flat"
            href="/menu-scanner"
          >
            1. SCANNING
          </Button>
          <div className="min-h-[270] lg:min-h-[300px]">
            <CardHeader>
              <h3 className="w-full leading-[48px] md:leading-none text-[42px] text-center font-milo mb-4 mt-4 md:mt-8">
                Scan Your Menu
              </h3>
            </CardHeader>
            <CardBody className="px-4 lg:px-0 lg:w-2/3 text-center mx-auto mb-8 lg:mb-16">
              <p className={subtitle()}>
                Effortlessly select wines that perfectly complement your
                existing menu or seasonal dishes with just a scan.
              </p>
            </CardBody>
          </div>
          <CardFooter className="w-full p-0">
            <div className="relative w-full min-h-[300px] md:min-h-[400px]">
              {" "}
              {/* Container voor de afbeelding */}
              <Image
                alt="Scan picture"
                className="rounded-[50%_50%_30px_30px]" // Optioneel: voeg afgeronde hoeken toe
                layout="fill" // Vul de container
                objectFit="cover" // Zorg ervoor dat de afbeelding de container bedekt
                src="/scan.jpg"
              />
            </div>
          </CardFooter>
        </Card>
        <Card className="flex items-center shadow-none mx-6 md:mx-0 max-w-[480px] md:max-w-full md:w-1/2 rounded-[30px] transition)-all duration-400 ease-in-out hover:saturate-150 hover:cursor-pointer">
          <Button
            className="mt-12 bg-deepBlue bg-opacity-10 text-deepBlue"
            radius="md"
            size="md"
            variant="flat"
          >
            2. SERVING
          </Button>
          <div className="min-h-[270] lg:min-h-[300px]">
            <CardHeader>
              <h3 className="w-full leading-[48px] md:leading-none text-[42px] text-center font-milo mt-4 md:mt-8">
                Serve Wine And Knowledge
              </h3>
            </CardHeader>
            <CardBody className="px-4 md:px-0 md:w-5/6 text-center mx-auto mb-8 lg:mb-16">
              <p className={subtitle()}>
                Offer your guests expertly paired wines that enhance their
                dining experience.
              </p>
            </CardBody>
          </div>
          <CardFooter className="w-full p-0">
            <div className="relative w-full min-h-[300px] md:min-h-[400px]">
              {" "}
              {/* Container voor de afbeelding */}
              <Image
                alt="Serve picture"
                className="rounded-[50%_50%_30px_30px]" // Optioneel: voeg afgeronde hoeken toe
                layout="fill" // Vul de container
                objectFit="cover" // Zorg ervoor dat de afbeelding de container bedekt
                src="/serve.jpg"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
