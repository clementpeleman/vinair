import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-start justify-center h-[65vh] gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-left justify-center">
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
          href="/login"
        >
          Get Started
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
