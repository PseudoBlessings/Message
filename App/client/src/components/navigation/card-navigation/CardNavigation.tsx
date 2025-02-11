import React from "react";
import { Card, CardProps as CardData } from "./Card";
import { CardMenu, CardMenuProps as CardMenuData } from "./CardMenu";

function CardNavigation(cardMenus: CardMenuData, cards: CardData[]) {
  return (
    <div className="card-navigation">
      <CardMenu
        leftCardMenu={cardMenus.leftCardMenu}
        rightCardMenu={cardMenus.rightCardMenu}
      />
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          icons={card.icons}
          rightHeader={card.rightHeader}
          leftHeader={card.leftHeader}
          text={card.text}
          onClickImage={card.onClickImage}
          onClickCard={card.onClickCard}
        />
      ))}
    </div>
  );
}

export default CardNavigation;
