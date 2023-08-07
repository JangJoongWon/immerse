import React, { useState } from 'react'
import { camOn, camOff, micOff, micOn } from '/src/assets/icons'

function VideoHandler(props) {
  console.log(props)
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  const {toggleAudio, toggleVideo} = props
  
  const AudioClickHandler = () => {
    toggleAudio();
    setAudio(!audio);
  }
  
  const VideoClickHandler = () => {
    toggleVideo();
    setVideo(!video);
  }

  return (
    <div>
      <div style={{ margin:"1%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div onClick={VideoClickHandler}>
          <img src={video ? camOn : camOff} alt="VideoIcon" />
        </div>
      </div>

      <div style={{ margin:"1%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div onClick={AudioClickHandler}>
          <img src={audio ? micOn : micOff} alt="AudioIcon" />
        </div>
      </div>
    </div>
  )
}

export default VideoHandler