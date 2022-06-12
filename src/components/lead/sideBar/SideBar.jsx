import React from "react";

import classes from "./SideBar.module.css";

import * as Icon from 'react-bootstrap-icons';

const Sidebar = () => {
  // console.log(sideBarItem)
  return (
    <div className={classes.sidebar}>
      <ul className={classes.sidebarList}>
        <li className={classes.sidebarListItem}>
          <Icon.House className={classes.sidebarIcon}/>
          Home
        </li>
        <li  className={classes.sidebarListItem}>
          <Icon.ChatLeft className={classes.sidebarIcon}/>
          Chats
        </li>
        <li  className={classes.sidebarListItem}>
          <Icon.Calendar2Day className={classes.sidebarIcon}/>
          Schedules
        </li>
        <li  className={classes.sidebarListItem}>
          <Icon.People className={classes.sidebarIcon}/>
         Clients
        </li >
        <li  className={classes.sidebarListItem}>
          <Icon.Journals className={classes.sidebarIcon}/>
          Booking
        </li>
        <li  className={classes.sidebarListItem}>
          <Icon.Cash className={classes.sidebarIcon}/>
          Finance
        </li>
    
        <li  className={classes.sidebarListItem}>
          <Icon.Box className={classes.sidebarIcon}/>
          Packages
        </li>
        <li  className={classes.sidebarListItem}>
          <Icon.Gear className={classes.sidebarIcon}/>
          Setting
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
