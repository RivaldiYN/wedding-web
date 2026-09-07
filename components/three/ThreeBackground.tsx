"use client";

import dynamic from "next/dynamic";

// Three.js background — must be in a Client Component to use ssr: false
const UlosBackground = dynamic(
  () => import("@/components/three/UlosBackground"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function ThreeBackground() {
  return <UlosBackground />;
}
