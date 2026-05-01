"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const showcaseSites = [
  { image: "/showcase/p1.png", orientation: "portrait" },
  { image: "/showcase/p2.png", orientation: "portrait" },
  { image: "/showcase/p3.png", orientation: "portrait" },
  { image: "/showcase/p4.png", orientation: "portrait" },
  { image: "/showcase/p5.png", orientation: "portrait" },
  { image: "/showcase/p8.png", orientation: "portrait" },
  { image: "/showcase/p10.png", orientation: "portrait" },
] as const;

const CARD_STEP = 360 / showcaseSites.length;
const ROTATION_SPEED = 0.012;
const MOBILE_CAROUSEL = [...showcaseSites, ...showcaseSites];

export function SiteShowcaseCarousel() {
  const [rotation, setRotation] = useState(0);
  const [mobileTrackWidth, setMobileTrackWidth] = useState(0);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tick = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const delta = time - lastTime;
      lastTimeRef.current = time;

      setRotation((current) => (current + delta * ROTATION_SPEED) % 360);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const measure = () => {
      const track = mobileTrackRef.current;
      if (!track) {
        return;
      }
      setMobileTrackWidth(track.scrollWidth / 2);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section aria-label="Carrousel de sites" className="relative mx-auto w-full max-w-[104rem]">
      <div className="hidden min-h-[48rem] items-center justify-center overflow-hidden lg:flex [perspective:3200px]">
        <div className="relative h-[40rem] w-full [transform-style:preserve-3d]">
          {showcaseSites.map((site, index) => {
            const angle = (rotation + index * CARD_STEP) % 360;
            const radians = (angle * Math.PI) / 180;
            const x = Math.sin(radians) * 420;
            const z = Math.cos(radians) * 320;
            const y = Math.abs(Math.sin(radians)) * 18;
            const scale = 0.82 + ((z + 320) / 640) * 0.2;
            const opacity = 0.52 + ((z + 320) / 640) * 0.48;

            return (
              <motion.article
                key={site.image}
                initial={false}
                animate={{
                  x,
                  y,
                  z,
                  rotateY: angle,
                  rotateZ: Math.sin(radians) * -1.2,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.52,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute left-1/2 top-1/2 overflow-hidden rounded-[2.2rem] border border-[rgba(255,255,255,0.86)] bg-[linear-gradient(180deg,#fffdf9,#f2ede6)] p-3 shadow-[0_40px_100px_rgba(15,23,42,0.22)] ${
                  site.orientation === "portrait" ? "h-[35rem] w-[22rem]" : "h-[29rem] w-[25rem]"
                }`}
                style={{
                  zIndex: Math.round(z + 500),
                  marginLeft: site.orientation === "portrait" ? "-11rem" : "-12.5rem",
                  marginTop: site.orientation === "portrait" ? "-17.5rem" : "-14.5rem",
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                <ShowcaseCard image={site.image} orientation={site.orientation} desktop />
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="relative lg:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-[linear-gradient(90deg,#f8f5ef,rgba(248,245,239,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#f8f5ef,rgba(248,245,239,0))]" />

        <div className="overflow-hidden px-1 pb-4 pt-2">
          <motion.div
            ref={mobileTrackRef}
            className="flex w-max gap-4 will-change-transform"
            animate={mobileTrackWidth > 0 ? { x: [0, -mobileTrackWidth] } : undefined}
            transition={{
              duration: 24,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {MOBILE_CAROUSEL.map((site, index) => (
              <article
                key={`${site.image}-${index}`}
                className={`relative min-w-[15rem] overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,#fffdf9,#f2ede6)] p-3 shadow-[0_26px_60px_rgba(15,23,42,0.12)] sm:min-w-[16.5rem] ${
                  site.orientation === "portrait" ? "h-[25.5rem] w-[15rem] sm:h-[28rem] sm:w-[16.5rem]" : "h-[22rem] w-[17rem]"
                }`}
              >
                <ShowcaseCard image={site.image} orientation={site.orientation} />
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({
  image,
  orientation,
  desktop = false,
}: {
  image: string;
  orientation: "portrait" | "landscape";
  desktop?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-[#f7f4ee]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(17,24,39,0.14)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(17,24,39,0.09)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(17,24,39,0.06)]" />
      </div>

      <div className={`absolute inset-0 ${desktop ? "p-4 pt-12" : "p-3 pt-11 sm:p-4 sm:pt-12"}`}>
        <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <Image
            src={image}
            alt="Capture de site client"
            fill
            sizes={desktop ? (orientation === "portrait" ? "352px" : "400px") : "280px"}
            className={
              orientation === "portrait"
                ? "object-contain object-top"
                : "object-contain object-center"
            }
          />
        </div>
      </div>
    </div>
  );
}
