import React, { useState, useEffect, useMemo } from "react";

// Dummy data untuk titik-titik event, asset contoh pakai logo.png
const points = [
  { label: "Keong Racun", asset: "/logo.png" },
  { label: "Cilukba", asset: "/logo.png" },
  { label: "Cosmevara", asset: "/logo.png" },
  { label: "Chromagia", asset: "/logo.png" },
  { label: "Masasik", asset: "/logo.png" },
  { label: "Resonara", asset: "/logo.png" },
  { label: "Arkhevia", asset: "/logo.png" },
];

const vWidth = 280; // lebar SVG vertikal
const vHeight = 1000; // tinggi SVG vertikal
const hWidth = 1200; // lebar SVG horizontal
const hHeight = 300; // tinggi SVG horizontal
const margin = 40;
const pointRadius = 12;
const iconSize = 40;

// Hook untuk deteksi desktop/mobile
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isDesktop;
}

// Fungsi untuk generate posisi random zigzag
function useRandomZigzagPoints(isDesktop, n) {
  return useMemo(() => {
    if (isDesktop) {
      // Horizontal: x merata, y random
      const stepX = (hWidth - 2 * margin) / (n - 1);
      return Array.from({ length: n }, (_, idx) => {
        const x = margin + idx * stepX;
        const y = Math.random() * (hHeight - 2 * margin - 40) + margin + 20; // biar tidak terlalu pinggir
        return { x, y };
      });
    } else {
      // Vertikal: y merata, x random
      const stepY = (vHeight - 2 * margin) / (n - 1);
      return Array.from({ length: n }, (_, idx) => {
        const y = margin + idx * stepY;
        const x = Math.random() * (vWidth - 2 * margin - 40) + margin + 20;
        return { x, y };
      });
    }
  }, [isDesktop, n]);
}

const EventPathSection = () => {
  const isDesktop = useIsDesktop();
  const zigzagPoints = useRandomZigzagPoints(isDesktop, points.length);

  // Polyline points string
  const polylinePoints = zigzagPoints.map((pt) => `${pt.x},${pt.y}`).join(" ");

  return (
    <div className="min-h-screen flex justify-center">
      <div
        className="w-full flex justify-center items-center py-8"
        style={{ minHeight: isDesktop ? hHeight : vHeight }}
      >
        {isDesktop ? (
          <svg width={hWidth} height={hHeight}>
            {/* Garis penghubung zigzag */}
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="#FFA500"
              strokeWidth={4}
            />
            {/* Titik-titik event */}
            {zigzagPoints.map(({ x, y }, idx) => (
              <g key={idx}>
                {points[idx].asset ? (
                  <image
                    href={points[idx].asset}
                    x={x - iconSize / 2}
                    y={y - iconSize / 2}
                    width={iconSize}
                    height={iconSize}
                    style={{ pointerEvents: "none" }}
                  />
                ) : (
                  <circle
                    cx={x}
                    cy={y}
                    r={pointRadius}
                    fill="#FFA500"
                    stroke="#fff"
                    strokeWidth={3}
                  />
                )}
                <text
                  x={x}
                  y={y + (idx % 2 === 0 ? iconSize / 1.2 : -18)}
                  textAnchor="middle"
                  fontSize={15}
                  fill="#000"
                  fontWeight="bold"
                  style={{ userSelect: "none" }}
                >
                  {points[idx].label}
                </text>
              </g>
            ))}
          </svg>
        ) : (
          <svg width={vWidth} height={vHeight}>
            {/* Garis penghubung zigzag */}
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="#FFA500"
              strokeWidth={4}
            />
            {/* Titik-titik event */}
            {zigzagPoints.map(({ x, y }, idx) => (
              <g key={idx}>
                {points[idx].asset ? (
                  <image
                    href={points[idx].asset}
                    x={x - iconSize / 2}
                    y={y - iconSize / 2}
                    width={iconSize}
                    height={iconSize}
                    style={{ pointerEvents: "none" }}
                  />
                ) : (
                  <circle
                    cx={x}
                    cy={y}
                    r={pointRadius}
                    fill="#FFA500"
                    stroke="#fff"
                    strokeWidth={3}
                  />
                )}
                <text
                  x={x + (idx % 2 === 0 ? iconSize / 1.2 : -iconSize / 1.2)}
                  y={y + 5}
                  textAnchor={idx % 2 === 0 ? "start" : "end"}
                  fontSize={15}
                  fill="#000"
                  fontWeight="bold"
                  style={{ userSelect: "none" }}
                >
                  {points[idx].label}
                </text>
              </g>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
};

export default EventPathSection;
