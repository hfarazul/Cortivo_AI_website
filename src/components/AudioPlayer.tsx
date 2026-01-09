"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted
  const [isLoaded, setIsLoaded] = useState(false);

  // Check localStorage for saved preference on mount
  useEffect(() => {
    const savedPref = localStorage.getItem("audioMuted");
    // Only mute if user explicitly muted before
    if (savedPref === "true") {
      setIsMuted(true);
    }
    setIsLoaded(true);
  }, []);

  // Play/pause based on mute state
  useEffect(() => {
    if (audioRef.current && isLoaded) {
      audioRef.current.volume = 0.15;
      if (!isMuted) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to interact
          setIsMuted(true);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, isLoaded]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("audioMuted", String(newMuted));
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop preload="auto" />
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 border border-[#2E2E2E] hover:border-[#FF4D00] bg-black transition-colors group"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Click to play ambient music" : "Click to mute"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#757575] group-hover:text-[#E6E6E6] transition-colors" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#FF4D00] group-hover:text-[#FF4D00] transition-colors" />
        )}
      </button>
    </>
  );
}
