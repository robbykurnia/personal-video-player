"use client"

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from 'react'

const useEvents = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [videoTime, setVideoTime] = useState(0)
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
    setVideoTime(videoRef.current.currentTime)

    localStorage.setItem(videoTitle, videoRef.current.currentTime.toString());

  };

  const handleKeyDown = (event: KeyboardEvent<HTMLVideoElement>) => {

    if (!videoRef.current) return

    const { key } = event
    const skipDuration = 5

    switch (key) {
      case ']':
        videoRef.current.playbackRate += 0.1;
        break;
      case '[':
        videoRef.current.playbackRate -= 0.1;
        break;
      case 'ArrowLeft':
        videoRef.current.currentTime = Math.max(videoTime - skipDuration, 0);
        break;
      case 'ArrowRight':
        videoRef.current.currentTime = Math.min(videoTime + skipDuration, videoRef.current.duration);
        break;
      default:
        break;
    }
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