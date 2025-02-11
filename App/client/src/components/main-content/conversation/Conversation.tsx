import React from "react";
import {
  ConversationHeader,
  ConversationHeaderProps as ConversationHeaderData,
} from "./ConversationHeader";

interface ConversationProps {
  conversationHeader: ConversationHeaderData;
}

const Conversation: React.FC<ConversationProps> = ({ conversationHeader }) => {
  return (
    <div className="conversation">
      {
        <ConversationHeader
          conversationInfo={conversationHeader.conversationInfo}
          conversationMenu={conversationHeader.conversationMenu}
        />
      }
    </div>
  );
};
