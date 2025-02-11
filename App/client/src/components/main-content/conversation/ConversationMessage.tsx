import React from "react";
import {
  ConversationMessageDate,
  ConversationMessageDateProps as ConversationMessageDateData,
} from "./ConversationMessageDate";

export interface MessageProps {
  messageMedia?: { type: string; src: string }[]; // An array of both videos, images, and other files.
  messageVideos?: string[]; // An array of videos
  messageImages?: string[]; // An array of images
  messageFile?: string[]; // An array of any type of file
  messagesText: string | null; // The text of the message and null if there is no text
  messageAudio?: string; // the audio of the message
}

export interface MessageUserProps {
  fromUser: boolean; // A boolean to dictacte if the message is from the user of the program
  displayName: string; // A string of the display name of the user
  userID: string; // A string of the user id to identify them from other users
  userProfile?: string; // A string of the user's profile picture
}

export interface MessageReactionProps {
  emoji: string;
  count: number;
  users: string[];
}

export interface ConversationMessageProps {
  messageID: string; // a string to identify the message
  user: MessageUserProps; //an object of the user's display name, userID, and profile, boolean if sent by user.
  message: MessageProps; // the message
  replyTo?: {
    user: MessageUserProps;
    message: MessageProps;
    messageID: string;
  }; // the message being replied to and the user of the orginal message
  reactions?: MessageReactionProps[]; // Emoji and count and the users
  seenBy?: { users: string[] | boolean }; // the message has been seen or the users its seen by
  sent: boolean;
  conversationMessageDateData: ConversationMessageDateData;
}

export const MessageType: React.FC<MessageProps> = ({
  messageMedia,
  messageVideos,
  messageImages,
  messageFile,
  messagesText,
  messageAudio,
}) => {
  const elements = []; // Use an array to store elements

  if (messageMedia) {
    messageMedia.forEach((media, index) => {
      if (media.type === "image" || media.type === "photo") {
        elements.push(
          <img
            className="message-image"
            key={index}
            src={media.src}
            loading="lazy"
            alt={`Image ${index + 1}`}
          />
        );
      } else if (media.type === "video") {
        elements.push(
          <video
            className="message-video"
            key={index}
            src={media.src}
            controls
          />
        );
      } else {
        elements.push(
          <a className="message-video" key={index} href={media.src} download />
        );
      }
    });
  }

  if (messageImages) {
    messageImages.forEach((image, index) => {
      elements.push(
        <img
          className="message-image"
          key={index}
          src={image}
          loading="lazy"
          alt={`Image ${index + 1}`}
        />
      );
    });
  }

  if (messageVideos) {
    messageVideos.forEach((video, index) => {
      elements.push(
        <video className="message-video" key={index} src={video} controls />
      );
    });
  }

  if (messageFile) {
    messageFile.forEach((file, index) => {
      elements.push(
        <a key={index} href={file} download>
          File
        </a>
      );
    });
  }

  if (messageAudio) {
    elements.push(
      <audio
        key="audio"
        className="message-audio"
        src={messageAudio}
        controls
      />
    );
  }

  if (messagesText) {
    elements.push(
      <p key="text" className="message-text">
        {messagesText}
      </p>
    );
  }

  return <>{elements}</>; // Use a Fragment to return multiple elements
};

const MessageFrom: React.FC<MessageUserProps> = ({
  displayName,
  userID,
  userProfile,
}) => {
  return (
    <div className="message-from">
      {userProfile && <img src={userProfile} className="message-profile"></img>}
      <p id={userID} className="message-user">
        {displayName}
      </p>
    </div>
  );
};

const MessageReaction: React.FC<MessageReactionProps> = ({
  emoji,
  count,
  users,
}) => {
  return (
    <div className="message-reaction">
      <p>
        `{emoji}: {count}`
      </p>
      <ul className="message-reaction-users">
        {users.map((user, index) => (
          <li key={index} className="message-reaction-user">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ConversationMessage: React.FC<ConversationMessageProps> = ({
  messageID,
  user,
  message,
  replyTo,
  reactions,
  conversationMessageDateData,
}) => {
  return (
    <div
      className={`conversation-message + ${
        user.fromUser ? " sender" : " reciever"
      }`}
      id={messageID}
    >
      {replyTo && (
        <div className="message-reply-to" id={replyTo.messageID}>
          <MessageFrom
            displayName={replyTo.user.displayName}
            userProfile={replyTo.user.userProfile}
            userID={replyTo.user.userID}
            fromUser={replyTo.user.fromUser}
          />
          <MessageType
            messageAudio={replyTo.message.messageAudio}
            messagesText={replyTo.message.messagesText}
            messageVideos={replyTo.message.messageVideos}
            messageImages={replyTo.message.messageImages}
            messageFile={replyTo.message.messageFile}
            messageMedia={replyTo.message.messageMedia}
          />
          <ConversationMessageDate
            datetime={conversationMessageDateData.datetime}
          />
        </div>
      )}
      <MessageFrom
        displayName={user.displayName}
        userProfile={user.userProfile}
        userID={user.userID}
        fromUser={user.fromUser}
      />
      <MessageType
        messageAudio={message.messageAudio}
        messagesText={message.messagesText}
        messageVideos={message.messageVideos}
        messageImages={message.messageImages}
        messageFile={message.messageFile}
        messageMedia={message.messageMedia}
      />

      <div className="message-reactions">
        {reactions?.map((reaction, index) => (
          <MessageReaction
            emoji={reaction.emoji}
            count={reaction.count}
            users={reaction.users}
          />
        ))}
      </div>

      <ConversationMessageDate
        datetime={conversationMessageDateData.datetime}
      />
    </div>
  );
};
