"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Opacity transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);

  // Parallax subtle translations (moves slightly up)
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [0, -50]);

  return (
    <div className="pointer-events-none absolute top-0 left-0 w-full h-[500vh] z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">

        {/* Section 1 (0% scroll): Center */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center px-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
            Hi, I'm Tamoor Ali Khan
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-light drop-shadow">
            AI Digital Sales Executive.
          </p>
        </motion.div>

        {/* Section 2 (30% scroll): Left Aligned */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-start px-8 md:px-32 max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter text-white drop-shadow-lg leading-tight">
            People first. Results follow. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"></span>
          </h2>
        </motion.div>

        {/* Section 3 (60% scroll): Right Aligned */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-end px-8 md:px-32 max-w-7xl mx-auto text-right"
        >
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter text-white max-w-2xl drop-shadow-lg leading-tight">
            Turning Customer Relationships Into Business Growth. <span className="text-purple-400"></span> <br />
            <span className="text-pink-500"></span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
