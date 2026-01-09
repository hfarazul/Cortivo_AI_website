"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LottieIconProps {
  animationData: object;
  size?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieIcon({
  animationData,
  size = 24,
  className = "",
  loop = true,
  autoplay = true,
}: LottieIconProps) {
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
