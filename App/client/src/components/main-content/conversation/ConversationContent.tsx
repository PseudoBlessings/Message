import React from "react";
import {
  ConversationDate,
  ConversationDateProps as ConversationDateData,
} from "./ConversationDate";

export interface ConversationContentProps {
  conversationDateData: ConversationDateData;
}

export const ConversationContentProps: React.FC<ConversationContentProps> = ({
  conversationDateData,
}) => {
  return (
    <div className="conversation-content">
      {<ConversationDate datetime={conversationDateData.datetime} />}
    </div>
  );
};
