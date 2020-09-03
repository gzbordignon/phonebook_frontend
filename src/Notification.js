import React from "react";

const Notification = ({ notificationMessage }) => {
  const notificationStyle = {
    color: notificationMessage.color,
    fontStyle: "italic",
    fontSize: "16",
    border: `3px solid ${notificationMessage.color}`,
  };
  return (
    <div style={notificationStyle}>
      <p>{notificationMessage.message}</p>
    </div>
  );
};

export default Notification;
