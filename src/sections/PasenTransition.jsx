import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const PasenTransition = () => {
  const vidRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = vidRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      <video
        ref={vidRef}
        src="/videos/desktop.mp4"
        muted
        playsInline
        className="w-[100vw] h-[200vh]"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default PasenTransition;
