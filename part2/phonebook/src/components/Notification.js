import React from "react";

function Notification({ message, errorMsg }) {
  return (
    <>
      <>{message ? <p className="notification">{message}</p> : null}</>
      <>{errorMsg ? <p className="error">{errorMsg}</p> : null}</>
    </>
  );
}

export default Notification;
