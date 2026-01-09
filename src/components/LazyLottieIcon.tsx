"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LazyLottieIconProps {
  src: string;
  size?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LazyLottieIcon({
  src,
  size = 24,
  className = "",
  loop = true,
  autoplay = true,
}: LazyLottieIconProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Failed to load animation:", err));
  }, [src]);

  if (!animationData) {
    return <div className={className} style={{ width: size, height: size }} />;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
