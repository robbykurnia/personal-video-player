"use client"

import Histories from '@/components/Histories';
import { useEvents } from './usecase'

const VideoPlayer: React.FC = () => {
  const { videoRef, videoSrc, handleFileChange, handleTimeUpdate, handleKeyDown } = useEvents();

  // TODO: 
  // 1. create directory thumbnail
  // 2. create recent watch thumbnail


  // const onChange = (e) => {
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     console.log(e.target.files[i]);
  //   }
  // }

  return (
    <div className='text-center space-y-4'>
      {/* <input type="file" webkitdirectory="" directory="" accept="video/*" onChange={onChange}></input> */}
      {!videoSrc && (
        <>
          <p>Personal Video Player with history time, and shortcut keyboard playback speed &quot;[&quot; and &quot;]&quot;</p>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <Histories />
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
