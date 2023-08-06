import React, { useState } from 'react'
// import icon from '../../../../public/img/'
function VideoHandler(props) {
  console.log(props)
  const [audio, setAudio] = useState(true)
  const [video, setVideo] = useState(true)

  const {toggleAudio, toggleVideo} = props
  
  const AudioClickHandler = ()=>{
    toggleAudio()
    setAudio(!audio)
    console.log(audio)
  }
  
  const VideoClickHandler = ()=>{
    toggleVideo()
    setVideo(!video)
  }

  return (
    <div>
      <div style={{ margin:"1%",display:"flex",alignItems:"center",justifyContent:"center"}}>
       { video 
       
       ?
            <div
            onClick={VideoClickHandler}>
               <img src="../../../../public/img/VideoIcon.png" alt="VideoIcon" />
            </div>
       :
            <div
            onClick={VideoClickHandler}>
              <img src="../../../../public/img/VideoIconOff.png" alt="VideoIconOff" />
            </div> 
        }
      </div>

      <div style={{ margin:"1%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        { audio 
          
        ?
          <div
          onClick={AudioClickHandler}>
            <img src="../../../../public/img/MicIcon.png" alt="MicIcon" />
        </div>
        :
          <div
          onClick={AudioClickHandler}>
          <img src="../../../../public/img/MicIconOff.png" alt="MicIconOff" />
        </div> 
        }
      </div>
    
    </div>
  )
}

export default VideoHandler