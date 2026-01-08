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
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-purple-500/50 transition-all group"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Click to play ambient music" : "Click to mute"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
        )}
      </button>
    </>
  );
}
