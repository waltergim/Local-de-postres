import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Catalog } from "@/components/Catalog";
import { About } from "@/components/About";
import { Info } from "@/components/Info";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getCatalog } from "@/lib/api";

export default async function Home() {
  const { products, site } = await getCatalog();

  return (
    <>
      <Navbar site={site} />
      <main className="flex-1">
        <Hero site={site} />
        <Catalog products={products} site={site} />
        <About site={site} />
        <Info site={site} />
      </main>
      <Footer site={site} />
      <WhatsAppFloat site={site} />
    </>
  );
}
