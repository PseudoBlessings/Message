import React, { useState, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface ConversationInputBarProps {
  onSendMessage: (message: string) => void;
  onAddEmoji: (emoji: string) => void;
  onSendMedia: (media: File[]) => void;
  onSendAudio: (audioBlob: Blob) => void;
  onStartRecording: () => void;
}

const ConversationInputBar: React.FC<ConversationInputBarProps> = ({
  onSendMessage,
}) => {
  const [messageText, setMessageText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <div className="conversation-input">
      <button className="add-media-button">
        <img src={} alt="Add Media Button" />
      </button>
      <Picker data={data} onEmojiSelect={console.log} />
      <textarea
        placeholder="Say what you wanna say..."
        value={messageText}
        onChange={handleInputChange}
      />
      <button className="voice-message-button">
        <img
          src="https://img.icons8.com/?size=100&id=xj9uezNKnk0h&format=png&color=ffffff"
          alt="Voice Message"
        />
      </button>
      <button className="send-button" onClick={handleSendMessage}>
        <img
          src="https://img.icons8.com/?size=100&id=100004&format=png&color=ffffff"
          alt="Send"
        />
      </button>
    </div>
  );
};

export default ConversationInputBar;
