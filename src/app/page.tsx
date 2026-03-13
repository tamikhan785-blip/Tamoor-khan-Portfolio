import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative w-full bg-[#121212] min-h-screen">
      <ScrollyCanvas />
      <Overlay />
      <Projects />
    </main>
  );
}
