import React from "react";

export interface CardMenuItemProps {
  image: string;
  onClickCardMenuItem: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CardMenuItem: React.FC<CardMenuItemProps> = ({
  image,
  onClickCardMenuItem,
}) => {
  return (
    <li className="card-navigation-menu-item">
      <button
        className="card-navigation-menu-button"
        onClick={onClickCardMenuItem}
      >
        <img className="card-navigation-menu-img" src={image}></img>
      </button>
    </li>
  );
};
