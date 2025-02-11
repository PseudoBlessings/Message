import React from "react";

export interface ConversationInfoProps{
    conversationProfile: string;
    conversationIcon: string;
    conversationName: string;
}

export const ConversationInfo: React.FC<ConversationInfoProps> = ({
    conversationProfile,
    conversationIcon,
    conversationName
}) => {
    return(
    <div className="conversation-info">
      <div className="conversation-image">
        <img className="conversation-profile" src={conversationProfile}></img>
        <img className="conversation-icon" src={conversationIcon}></img>
      </div>
      <h2 className="conversation-name">{conversationName}</h2>
    </div>
    );
};