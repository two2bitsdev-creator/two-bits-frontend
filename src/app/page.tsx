import { BitDivider } from "@/components/sections/bit-divider";
import { Contact } from "@/components/sections/contact";
import { BitExplode } from "@/components/effects/bit-explode";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Stack } from "@/components/sections/stack";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BitExplode />
        <BitDivider />
        <Services />
        <Process />
        <Stack />
        <Marquee />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
