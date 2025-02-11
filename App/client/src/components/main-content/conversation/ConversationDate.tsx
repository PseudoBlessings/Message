import React from "react";

export interface ConversationDateProps {
  datetime: string;
}

export const ConversationDate: React.FC<ConversationDateProps> = ({
  datetime,
}) => {
  const formatDate = (datetime: string): string => {
    const date = new Date(datetime);
    const now = new Date();

    // Check if the date is within the same day as today
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      // If same day, return only the time
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // Otherwise, format as month, date, and year
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }
  };

  return (
    <p className="conversation-date">
      <time dateTime={datetime}>{formatDate(datetime)}</time>
    </p>
  );
};
