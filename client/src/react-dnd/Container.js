import update from "immutability-helper";
import { memo, useCallback, useEffect, useState } from "react";
import { ItemTypes } from "./ItemType";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import styled from "styled-components";

const ITEMS = [
  {
    id: 1,
    text: "자바스크립트",
    color: "#FEF9A7",
    area: "one",
  },
  {
    id: 2,
    text: "노드JS",
    color: "#FAC213",
    area: "two",
  },
  {
    id: 3,
    text: "운영체제",
    color: "#F77E21",
    area: "three",
  },
  {
    id: 4,
    text: "HTTP 완벽가이드",
    color: "#D61C4E",
    area: "four",
  },
  {
    id: 5,
    text: "SQL 레벨업",
    color: "#FFCC8F",
    area: "five",
  },
  {
    id: 6,
    text: "Nest JS",
    color: "#A760FF",
    area: "six",
  },
  {
    id: 7,
    text: "React",
    color: "#F6C6EA",
    area: "seven",
  },
  {
    id: 8,
    text: "영어 공부",
    color: "#1F4690",
    area: "eight",
  },
  {
    id: 9,
    text: "CSS 설계 가이드",
    color: "#635666",
    area: "nine",
  },
];
const CardContainer = styled.div`
  width: 50%;
  height: 50%;
  overflow: hidden;
  position: relative;
  font-size: 0px;
`;
// grid-auto-rows: 1fr
// grid-auto-columnn: 1fr
export const Container = memo(() => {
  const [cards, setCards] = useState(ITEMS);
  const [isLodding, setisLodding] = useState(false);
  useEffect(() => {
    setisLodding(true);
  }, []);

  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );
  const moveCard = useCallback(
    //sourceId, targetId
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
  }));

  return (
    <>
      <CardContainer ref={drop} className="container">
        {isLodding
          ? cards.map(({ text, color, id }) => {
              return <Card text={text} key={id} color={color} moveCard={moveCard} id={`${id}`} findCard={findCard}></Card>;
            })
          : null}
      </CardContainer>
    </>
  );
});

// TODO: 카드가 이동할 때 트랜지션 속성으로 천천히 이동하는 에니매이션구현

// {cards.map(({ text, color, id }) => {
//   return <Card text={text} key={id} color={color} moveCard={moveCard} id={`${id}`} findCard={findCard}></Card>;
// })}
