import React from "react";

const VideoConference = () => {
  const jitsiContainerId = "jitsi-container-id";
  const [jitsi, setJitsi]: any = React.useState({});

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

  const initialiseJitsi = async () => {
    const windowObj: any = window;
    if (!windowObj.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const domain = "meet.jit.si";
    const _jitsi = new windowObj.JitsiMeetExternalAPI(domain, {
      width: "100%",
      height: "100%",
      parentNode: document.getElementById(jitsiContainerId),
    });

    _jitsi.executeCommand("subject", "New Room 2");

    setJitsi(_jitsi);
  };

  React.useEffect(() => {
    initialiseJitsi();
    return () => jitsi?.dispose?.();
  }, []);

  return <div id={jitsiContainerId} style={{ height: 720, width: "100%" }} />;
};

export default VideoConference;
