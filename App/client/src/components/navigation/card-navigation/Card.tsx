import React from "react";
import { CardIcon, CardIconProps as CardIconData } from "./CardIcon";

export interface CardProps {
  image: string;
  icons: CardIconData[];
  rightHeader: string;
  leftHeader: string;
  text: string;
  onClickImage?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onClickCard?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card: React.FC<CardProps> = ({
  image,
  icons,
  rightHeader,
  leftHeader,
  text,
  onClickImage,
  onClickCard,
}) => {
  return (
    <div className="card" onClick={onClickCard}>
      <div className="card-image-container">
        <img src={image} alt="Profile Picture" onClick={onClickImage}></img>
        <div className="icon-container">
          {icons.map((icon, index) => (
            <CardIcon
              key={index}
              image={icon.image}
              position={icon.position}
              description={icon.description}
            />
          ))}
        </div>
      </div>
      <h2 className="card-header">
        {" "}
        <span className="card-left-header">{leftHeader}</span>{" "}
        <span className="card-right-header">{rightHeader}</span>
      </h2>
      <p className="card-text">{text}</p>
    </div>
  );
};
