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

// Koordinat yang sudah ditentukan untuk path yang konsisten
const predefinedPoints = {
  desktop: [
    { x: 60, y: 150 },
    { x: 230, y: 80 },
    { x: 420, y: 220 },
    { x: 600, y: 130 },
    { x: 780, y: 200 },
    { x: 970, y: 90 },
    { x: 1140, y: 150 },
  ],
  mobile: [
    { x: 140, y: 50 },
    { x: 80, y: 200 },
    { x: 200, y: 350 },
    { x: 110, y: 500 },
    { x: 190, y: 650 },
    { x: 90, y: 800 },
    { x: 140, y: 950 },
  ],
};

const vWidth = 280; // lebar SVG vertikal
const vHeight = 1000; // tinggi SVG vertikal
const hWidth = 1200; // lebar SVG horizontal
const hHeight = 300; // tinggi SVG horizontal
const margin = 40;
const pointRadius = 12;
const iconSize = 60;

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
  const zigzagPoints = isDesktop
    ? predefinedPoints.desktop
    : predefinedPoints.mobile;

  // Polyline points string
  const polylinePoints = zigzagPoints.map((pt) => `${pt.x},${pt.y}`).join(" ");

  return (
    <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
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
                  y={y + (idx % 2 === 0 ? iconSize / 1.1 : -44)}
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
                  x={x > vWidth / 2 ? x - iconSize / 1.5 : x + iconSize / 1.5}
                  y={y + 5}
                  textAnchor={x > vWidth / 2 ? "end" : "start"}
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
