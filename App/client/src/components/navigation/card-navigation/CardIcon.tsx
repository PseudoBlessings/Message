import React from "react";

export interface CardIconProps {
  image: string;
  position: number;
  description: string;
}

export const CardIcon: React.FC<CardIconProps> = ({
  image,
  position,
  description,
}) => {
  return (
    <img
      className={`icon${position.toString()}`}
      src={image}
      alt={description}
    ></img>
  );
};
