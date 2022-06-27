import update from "immutability-helper";
import { memo, useCallback, useEffect, useState } from "react";
import { ItemTypes } from "./ItemType";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import styled from "styled-components";

const ITEMS = [
  {
    id: "javascript",
    text: "자바스크립트",
    color: "#FEF9A7",
    area: 0,
  },
  {
    id: "node",
    text: "노드JS",
    color: "#FAC213",
    area: 1,
  },
  {
    id: "운영체제",
    text: "운영체제",
    color: "#F77E21",
    area: 2,
  },
  {
    id: "http",
    text: "HTTP 완벽가이드",
    color: "#D61C4E",
    area: 3,
  },
  {
    id: "sql",
    text: "SQL 레벨업",
    color: "#FFCC8F",
    area: 4,
  },
  {
    id: "nestjs",
    text: "Nest JS",
    color: "#A760FF",
    area: 5,
  },
  {
    id: "react",
    text: "React",
    color: "#F6C6EA",
    area: 6,
  },
  {
    id: "english",
    text: "영어 공부",
    color: "#1F4690",
    area: 7,
  },
  {
    id: "css",
    text: "CSS 설계 가이드",
    color: "#635666",
    area: 8,
  },
];
const CardContainer = styled.div`
  width: 900px;
  height: 900px;
  overflow: hidden;
  position: relative;
  font-size: 0px;
  transition: all 0.5s;
`;
// grid-auto-rows: 1fr
// grid-auto-columnn: 1fr
export const Container = memo(() => {
  const [cards, setCards] = useState(ITEMS);
  const [isLodding, setisLodding] = useState(false);
  const [container, setContainer] = useState(null);
  useEffect(() => {
    setContainer(document.querySelector(".container"));
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
    (draggedId, targetId) => {
      const {
        card: { area: draggedArea },
        index: draggedCardIdx,
      } = findCard(draggedId);
      const {
        card: { area: targetArea },
        index: targetCardIdx,
      } = findCard(targetId);
      setCards(
        update(cards, {
          [draggedCardIdx]: { area: { $set: targetArea } },
          [targetCardIdx]: { area: { $set: draggedArea } },
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
          ? cards.map(({ text, color, id, area }, idx) => {
              return (
                <Card
                  text={text}
                  key={id}
                  color={color}
                  originalIndex={idx}
                  moveCard={moveCard}
                  id={`${id}`}
                  findCard={findCard}
                  container={container}
                  area={area}
                ></Card>
              );
            })
          : null}
      </CardContainer>
    </>
  );
});

// 특이한 점을 발견했다.
// Card의 key 값으로 Math.round(Math.random() * 0xffffff).toString(16) 랜덤 문자열을 줄 시
// transition이 작동하지 않았다.

// 그렇다면 특정 방향에서 transition이 발동하지 않았던 이유는 key값이 일정하지 않아서 일까
