import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

export default class SideBar extends Component {
  render() {
    return (
      <Menu noOverlay right>
        <div className="menu-item" >
          Add New Layer
        </div>

        <div className="menu-item" >
          Reduce Nodes
        </div>
      </Menu>
    );
  };
};
