"use client"

import { useEvents } from './usecase'

const VideoPlayer: React.FC = () => {
  const { videoRef, videoSrc, handleFileChange, handleTimeUpdate, handleKeyDown } = useEvents();

  return (
    <div className='text-center'>

      {!videoSrc && (
        <>
          <p>Personal Video Player with history time, and shortcut keyboard playback speed &quot;[&quot; and &quot;]&quot;</p>
          <input type="file" accept="video/*" onChange={handleFileChange} />

        </>
      )}

      {videoSrc && (
        <>
          <video ref={videoRef} className='max-w-full h-screen m-auto' autoPlay controls onKeyDown={handleKeyDown} onTimeUpdate={handleTimeUpdate}>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      )}

    </div>
  );
};

export default VideoPlayer;
