import React from "react";
import Sidebar from "../../components/lead/sideBar/SideBar";

import ClientUI from "../../components/lead/leadUI/ClientUI";

const Lead = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />
      <ClientUI />
    </div>
  );
};

export default Lead;
