import React, { useState, useEffect, useMemo } from "react";

// Dummy data untuk titik-titik event, asset contoh pakai logo.png
const points = [
  { label: "Keong Racun", asset: "/images/keora.png" },
  { label: "Cilukba", asset: "/images/cilukba.png" },
  { label: "Cosmevara", asset: "/images/cosmevara.png" },
  { label: "Chromagia", asset: "/images/chromagia.png" },
  { label: "Masasik", asset: "/images/masasik.png" },
  { label: "Resonara", asset: "/images/pocco_fiory.png" },
  { label: "Arkhevia", asset: "/images/arkhe.png" },
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
  medium: [
    { x: 40, y: 120 },
    { x: 180, y: 60 },
    { x: 340, y: 180 },
    { x: 500, y: 100 },
    { x: 660, y: 160 },
    { x: 820, y: 70 },
    { x: 960, y: 120 },
  ],
  mobile: [
    { x: 140, y: 80 },
    { x: 80, y: 320 },
    { x: 200, y: 560 },
    { x: 110, y: 800 },
    { x: 190, y: 1040 },
    { x: 90, y: 1280 },
    { x: 140, y: 1400 },
  ],
};

const vWidth = 280; // mobile
const vHeight = 1400;
const mWidth = 1000; // medium
const mHeight = 350;
const hWidth = 1200; // desktop
const hHeight = 400;
const margin = 40;
const pointRadius = 12;
const iconSize = 100;

// Hook untuk deteksi tipe layar: desktop, medium, mobile
function useScreenType() {
  const getType = () => {
    if (window.innerWidth > 1024) return "desktop";
    if (window.innerWidth > 640) return "medium";
    return "mobile";
  };
  const [type, setType] = useState(getType());
  useEffect(() => {
    const onResize = () => setType(getType());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return type;
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

// Fungsi untuk interpolasi titik-titik di sepanjang garis lurus dari start ke end
function getLinearPoints(start, end, n) {
  if (n < 2) return [start, end];
  const points = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    points.push({
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
    });
  }
  return points;
}

// Fungsi untuk membuat zigzag konsisten di sepanjang garis lurus
function getConsistentZigzagPoints(start, end, n, offset, isDesktop) {
  if (n < 2) return [start, end];
  const points = [];
  const dx = (end.x - start.x) / (n - 1);
  const dy = (end.y - start.y) / (n - 1);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    let x = start.x + dx * i;
    let y = start.y + dy * i;
    // Zigzag offset: desktop (y), mobile (x)
    if (i !== 0 && i !== n - 1) {
      if (isDesktop) {
        y += i % 2 === 0 ? offset : -offset;
      } else {
        x += i % 2 === 0 ? offset : -offset;
      }
    }
    points.push({ x, y });
  }
  return points;
}

// Fungsi untuk membuat zigzag random di sepanjang garis lurus
function getRandomZigzagPoints(start, end, n, maxOffset, isDesktop) {
  if (n < 2) return [start, end];
  const points = [];
  const dx = (end.x - start.x) / (n - 1);
  const dy = (end.y - start.y) / (n - 1);
  for (let i = 0; i < n; i++) {
    let x = start.x + dx * i;
    let y = start.y + dy * i;
    if (i !== 0 && i !== n - 1) {
      const offset = (Math.random() * 2 - 1) * maxOffset;
      if (isDesktop) {
        y += offset;
      } else {
        x += offset;
      }
    }
    points.push({ x, y });
  }
  return points;
}

const EventPathSection = () => {
  const screenType = useScreenType();
  let basePoints, svgWidth, svgHeight;
  if (screenType === "desktop") {
    basePoints = predefinedPoints.desktop;
    svgWidth = hWidth;
    svgHeight = hHeight;
  } else {
    basePoints = predefinedPoints.mobile;
    svgWidth = vWidth;
    svgHeight = vHeight;
  }
  // Zigzag random
  const isDesktop = screenType === "desktop";
  const zigzagOffset = isDesktop ? 40 : 70;
  const zigzagPoints = getRandomZigzagPoints(
    basePoints[0],
    basePoints[basePoints.length - 1],
    basePoints.length,
    zigzagOffset,
    isDesktop
  );
  const polylinePoints = zigzagPoints.map((pt) => `${pt.x},${pt.y}`).join(" ");

  return (
    <div className="min-h-screen flex justify-center px-4 sm:px-6 lg:px-8">
      <div
        className="w-full flex justify-center items-center py-8"
        style={{ minHeight: svgHeight }}
      >
        <svg width={svgWidth} height={svgHeight}>
          {/* Garis penghubung lurus */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#A259FF"
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
                  fill="#A259FF"
                  stroke="#fff"
                  strokeWidth={3}
                />
              )}
              <text
                x={x}
                y={y + iconSize / 2 + 24}
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
      </div>
    </div>
  );
};

export default EventPathSection;
