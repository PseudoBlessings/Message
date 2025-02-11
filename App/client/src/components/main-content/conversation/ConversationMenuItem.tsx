import React from "react";

export interface ConversationMenuItemProps {
  name: string;
  description: string;
  image: string;
}

export const ConversationMenuItem: React.FC<ConversationMenuItemProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <li className="conversation-menu-item">
      <button className="conversation-menu-button">
        <img className="conversation-menu-image" src={image}></img>
      </button>
    </li>
  );
};
