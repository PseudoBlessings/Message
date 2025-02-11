import React from "react";
import {
  ConversationMenu,
  ConversationMenuProps as ConversationMenuData,
} from "./ConversationMenu";
import {
  ConversationInfo,
  ConversationInfoProps as ConversationInfoData,
} from "./ConversationInfo";

export interface ConversationHeaderProps {
  conversationMenu: ConversationMenuData;
  conversationInfo: ConversationInfoData;
}

export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversationMenu,
  conversationInfo,
}) => {
  return (
    <div className="conversation-header">
      {
        <ConversationInfo
          conversationProfile={conversationInfo.conversationProfile}
          conversationIcon={conversationInfo.conversationIcon}
          conversationName={conversationInfo.conversationName}
        />
      }
      {
        <ConversationMenu
          ConversationMenuItems={conversationMenu.ConversationMenuItems}
        />
      }
    </div>
  );
};
