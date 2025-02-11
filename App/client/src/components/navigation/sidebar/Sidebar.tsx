import {
  SidebarItemProps as SidebarItemData,
  SidebarItem,
} from "./SidebarItem";
import React from "react";

function Sidebar(SidebarItems: SidebarItemData[]) {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SidebarItems.map((sidebarItem, index) => (
          <SidebarItem
            key={index}
            name={sidebarItem.name}
            description={sidebarItem.description}
            id={sidebarItem.id}
            image={sidebarItem.image}
            onSidebarItemClick={sidebarItem.onSidebarItemClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
