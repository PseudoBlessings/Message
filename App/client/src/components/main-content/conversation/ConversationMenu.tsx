import React from "react";
import {
  ConversationMenuItem,
  ConversationMenuItemProps as ConversationMenuItemData,
} from "./ConversationMenuItem";

export interface ConversationMenuProps {
  ConversationMenuItems: ConversationMenuItemData[];
}

export const ConversationMenu: React.FC<ConversationMenuProps> = ({
  ConversationMenuItems,
}) => {
  return (
    <div className="conversation-menu">
      <ul className="conversation-menu-list">
        {ConversationMenuItems.map((conversationMenuItem, index) => (
          <ConversationMenuItem
            key={index}
            name={conversationMenuItem.name}
            description={conversationMenuItem.description}
            image={conversationMenuItem.image}
          />
        ))}
      </ul>
    </div>
  );
};
