"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        // frame_000_delay-0.066s.png format
        const indexStr = i.toString().padStart(3, "0");
        img.src = `/sequence/frame_${indexStr}_delay-0.066s.png`;
        
        img.onload = () => {
            loadedCount++;
            if (loadedCount === FRAME_COUNT) {
                // Ensure array matches exact order even if they load out of order
                setImages(loadedImages);
                renderFrame(0);
            }
        };
        
        // Push object initially so indices match logic above
        loadedImages.push(img);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFrame = (index: number) => {
    if (!canvasRef.current || images.length !== FRAME_COUNT) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img || !img.complete) return;

    // Set canvas dimensions to match window inner width/height for sharp rendering
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // object-fit: cover logic
    const imgAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgAspect;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Add a black/dark background to match before drawing image
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    // Subscriber to update canvas on scroll
    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(Math.floor(latest));
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, frameIndex]);

  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.floor(frameIndex.get()));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
