import React from "react";

export interface SidebarItemProps {
  name: string;
  description: string;
  id: string;
  image: string;
  onSidebarItemClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  description,
  id,
  image,
  onSidebarItemClick,
}) => {
  return (
    <li
      className="sidebar-item"
      id={id}
      data-name={name}
      data-description={description}
    >
      <button className="sidebar-button" onClick={onSidebarItemClick}>
        <img src={image} className="sidebar-img"></img>
      </button>
    </li>
  );
};
