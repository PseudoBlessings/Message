import React from "react";
import {
  CardMenuItem,
  CardMenuItemProps as CardMenuItemData,
} from "./CardMenuItem";

export interface CardMenuProps {
  leftCardMenu: CardMenuItemData[];
  rightCardMenu: CardMenuItemData[];
}

export const CardMenu: React.FC<CardMenuProps> = ({
  leftCardMenu,
  rightCardMenu,
}) => {
  return (
    <div className="card-navigation-menu">
      <ul className="card-navigation-menu-list-left">
        {leftCardMenu.map((cardMenuItem, index) => (
          <CardMenuItem
            key={index}
            image={cardMenuItem.image}
            onClickCardMenuItem={cardMenuItem.onClickCardMenuItem}
          />
        ))}
      </ul>
      <ul className="card-navigation-menu-list-right">
        {rightCardMenu.map((cardMenuItem, index) => (
          <CardMenuItem
            key={index}
            image={cardMenuItem.image}
            onClickCardMenuItem={cardMenuItem.onClickCardMenuItem}
          />
        ))}
      </ul>
    </div>
  );
};
