"use client"

import { HISTORIES_KEY, HistoryData } from "@/constants";
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
    setVideoTitle(file.name);
  };

  const handleTimeUpdate = () => {
    if (!videoRef?.current || !videoTitle) return
    const currentTime = videoRef.current.currentTime

    const hasHistoriesKey = localStorage.getItem(HISTORIES_KEY)
    if (!hasHistoriesKey) {
      const payload = [{ title: videoTitle, lastTime: currentTime, dateModified: new Date() }]
      localStorage.setItem(HISTORIES_KEY, JSON.stringify(payload))

      return
    }

    const videoHistories = JSON.parse(hasHistoriesKey) as HistoryData[]
    const indexVideoHistory = videoHistories.findIndex(history => history.title === videoTitle)

    if (indexVideoHistory === -1) {
      const payload = [...videoHistories, { title: videoTitle, lastTime: currentTime, dateModified: new Date() }]
      localStorage.setItem(HISTORIES_KEY, JSON.stringify(payload))

      return
    }

    videoHistories[indexVideoHistory].lastTime = currentTime
    videoHistories[indexVideoHistory].dateModified = new Date()

    const payload = JSON.stringify(videoHistories)
    localStorage.setItem(HISTORIES_KEY, payload)

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

    const hasHistoriesKey = localStorage.getItem(HISTORIES_KEY)
    if (!hasHistoriesKey) return

    const videoHistories = JSON.parse(hasHistoriesKey) as HistoryData[]
    const indexVideoHistory = videoHistories.findIndex(history => history.title === videoTitle)

    if (indexVideoHistory === -1) return

    const savedTime = videoHistories[indexVideoHistory].lastTime

    if (!savedTime || !videoRef.current) return

    videoRef.current.currentTime = savedTime;
  }, [videoTitle])

  return { videoRef, videoSrc, handleFileChange, handleTimeUpdate, handleKeyDown }
}

export default useEvents