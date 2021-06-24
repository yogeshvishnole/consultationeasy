import React, { useState } from "react";
import Button from "../components/ui/Button/Button";
const VideoCustomizeConference = () => {
  const jitsiContainerId = "jitsi-container-id";
  const [jitsi, setJitsi]: any = React.useState(null);
  const [isShowToolBox, setIsShowToolBox] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [videoMuteStatus, setVideoMuteStatus] = useState(false);
  const [screenSharingStatus, setScreenSharingStatus] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [meetingId, setMeetingId] = useState("strat-o-matic");
  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise: any = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => resolveLoadJitsiScriptPromise(true);
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initialiseJitsi = async (displayUserName: any, meetingId: any) => {
    const windowObj: any = window;
    if (!windowObj.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const domain = "meet.jit.si";
    const roomName = meetingId ? meetingId : "newRoome_" + new Date().getTime();
    const displayName = displayUserName ? displayUserName : "Test";
    const options = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      parentNode: document.getElementById(jitsiContainerId),
      userInfo: {
        displayName: displayName,
      },
      configOverwrite: {
        doNotStoreRoom: true,
        startVideoMuted: 0,
        startWithVideoMuted: true,
        startWithAudioMuted: true,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableRemoteMute: true,
        remoteVideoMenu: {
          disableKick: true,
        },
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_REMOTE_DISPLAY_NAME: "New User",
        TOOLBAR_BUTTONS: ["chat"],
        JITSI_WATERMARK_LINK: null,
      },
      onload: function () {
        setIsShowToolBox(true);
      },
    };
    const _jitsi = new windowObj.JitsiMeetExternalAPI(domain, options);
    //  const _jitsi = new windowObj.JitsiMeetExternalAPI(domain, {
    //     width: '100%',
    //     height: '100%',
    //     parentNode:  document.getElementById(jitsiContainerId),
    //  });

    _jitsi.addEventListeners({
      incomingMessage: function (data: any) {
        console.log("call incoming message = ", data);
      },

      outgoingMessage: function (data: any) {
        console.log("call outgoingMessage message = ", data);
      },

      sendEndpointTextMessage: function (data: any) {
        console.log("call sendEndpointTextMessage message = ", data);
      },

      endpointTextMessageReceived: function (data: any) {
        console.log("call endpointTextMessageReceived message = ", data);
      },

      readyToClose: function () {
        console.log("going to close");
        setIsShowToolBox(false);
      },
      audioMuteStatusChanged: function (data: any) {
        console.log("audioMuteStatusChanged = ", data);
        if (data.muted) setIsMute(true);
        else setIsMute(false);
      },
      videoMuteStatusChanged: function (data: any) {
        console.log("videoMuteStatusChanged = ", data);
        if (data.muted) setVideoMuteStatus(true);
        else setVideoMuteStatus(false);
      },
      tileViewChanged: function (data: any) {
        console.log("tileViewChanged = ", data);
      },
      screenSharingStatusChanged: function (data: any) {
        console.log("screenSharingStatusChanged = ", data);
        if (data.on) setScreenSharingStatus(true);
        else setScreenSharingStatus(false);
      },
      participantJoined: function (data: any) {
        console.log("participantJoined = ", data);
        _jitsi.executeCommand("sendEndpointTextMessage", "", "Hiiiii");
      },
      participantLeft: function (data: any) {
        console.log("participantLeft", data);
      },
    });

    _jitsi.executeCommand("subject", "New Room 2");

    setJitsi(_jitsi);
  };

  React.useEffect(() => {
    return () => jitsi?.dispose?.();
  }, []);

  return (
    <div>
      {!isShowToolBox && (
        <div
          style={{ display: "flex", minHeight: "100px", alignItems: "center" }}
        >
          <span style={{ color: "fff" }}>Display User Name: </span>
          <Input
            type="text"
            placeholder="Display User Name"
            value={displayName}
            onChange={setDisplayName}
          />
          <Button
            onClick={() => {
              initialiseJitsi(displayName, meetingId);
            }}
          >
            Start
          </Button>
          <span style={{ color: "fff" }}>Meeting id:</span>
          <Input
            type="text"
            placeholder="Meeting id"
            value={meetingId}
            onChange={setMeetingId}
          />
        </div>
      )}
      <div className="container">
        {isShowToolBox && (
          <div
            id="toolbox"
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            className="toolbox"
          >
            <Button
              onClick={() => {
                jitsi && jitsi.executeCommand("hangup");
              }}
            >
              {"End Call"}
            </Button>
            <Button
              onClick={() => {
                jitsi && jitsi.executeCommand("toggleAudio");
              }}
            >
              {isMute ? "UnMute" : "Mute"}
            </Button>
            <Button
              onClick={() => {
                jitsi && jitsi.executeCommand("toggleVideo");
              }}
            >
              {videoMuteStatus ? "Start camera" : "Stop Camera"}
            </Button>
            <Button
              onClick={() => {
                jitsi && jitsi.executeCommand("toggleTileView");
              }}
            >
              Toggle Tileview
            </Button>
            <Button
              onClick={() => {
                jitsi && jitsi.executeCommand("toggleShareScreen");
              }}
            >
              {screenSharingStatus
                ? "Stop screen sharing"
                : "Start stop sharing"}
            </Button>
          </div>
        )}
        <div
          id={jitsiContainerId}
          style={{ height: "calc(100vh - 60px)", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default VideoCustomizeConference;
