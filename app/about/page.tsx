import { subtitle } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="mt-[-4vh] mb-[-80px] md:mt-0 md:mb-0">
      <p className={subtitle({ size: "md", class: "tracking-wider" })}>
        ABOUT US
      </p>
    </div>
  );
}
