"use client"

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from 'react'

const useEvents = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return

    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setVideoTitle(`X-${file.name}`);
  };

  const handleTimeUpdate = () => {
    if (!videoRef?.current || !videoTitle) return
    localStorage.setItem(videoTitle, videoRef.current.currentTime.toString());

  };

  const handleKeyDown = (event: KeyboardEvent<HTMLVideoElement>) => {
    if (!videoRef.current) return

    if (event.key === ']') {
      videoRef.current.playbackRate += 0.1;
    } else if (event.key === '[') {
      videoRef.current.playbackRate -= 0.1;
    }

    console.log('Playback Speed', videoRef.current.playbackRate)
  };

  useEffect(() => {
    if (!videoTitle) return

    const savedTime = localStorage.getItem(videoTitle);
    if (!savedTime || !videoRef.current) return

    videoRef.current.currentTime = parseFloat(savedTime);
  }, [videoTitle])

  return { videoRef, videoSrc, handleFileChange, handleTimeUpdate, handleKeyDown }
}

export default useEvents