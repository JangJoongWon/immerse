import OpenViduVideoComponent from "./OvVideo";
import UserVideoComponent from "./UserVideoComponent";

const VideoMap = (props) => {
    return (
        <div id="session">
            <div id="session-header">
                <h1 id="session-title">{props.id}</h1>
                <input
                    className="btn btn-large btn-danger"
                    type="button"
                    id="buttonLeaveSession"
                    onClick={props.leaveSession}
                    value="Leave session"
                />
                <input
                    className="btn btn-large btn-success"
                    type="button"
                    id="buttonSwitchCamera"
                    onClick={props.switchCamera}
                    value="Switch Camera"
                />
            </div>

            {props.mainStreamManager !== undefined ? (
                <div id="main-video" className="col-md-6">
                    <UserVideoComponent streamManager={props.mainStreamManager} />

                </div>
            ) : null}
            <div id="video-container" className="col-md-6">
                {props.publisher !== undefined ? (
                    <div className="stream-container col-md-6 col-xs-6" onClick={() => props.handleMainVideoStream(props.publisher)}>
                        <UserVideoComponent
                            streamManager={props.publisher} />
                    </div>
                ) : null}
                {props.subscribers.map((sub, i) => (
                    <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => props.handleMainVideoStream(sub)}>
                        <span>{i}:{sub.id}</span>
                        <UserVideoComponent streamManager={sub} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VideoMap;