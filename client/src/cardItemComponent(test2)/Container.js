import update from "immutability-helper";
import { memo, useCallback, useEffect, useState } from "react";
import { ItemTypes } from "./ItemType";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import styled from "styled-components";

const ITEMS = [
  {
    id: "자바스크립트",
    text: "자바스크립트",
    color: "#FEF9A7",
  },
  {
    id: "노드JS",
    text: "노드JS",
    color: "#FAC213",
  },
  {
    id: "운영체제",
    text: "운영체제",
    color: "#F77E21",
  },
  {
    id: "HTTP 완벽가이드",
    text: "HTTP 완벽가이드",
    color: "#D61C4E",
  },
  {
    id: "SQL 레벨업",
    text: "SQL 레벨업",
    color: "#FFCC8F",
  },
  {
    id: "Nest JS",
    text: "Nest JS",
    color: "#A760FF",
  },
  {
    id: "React",
    text: "React",
    color: "#F6C6EA",
  },
  {
    id: "영어 공부",
    text: "영어 공부",
    color: "#1F4690",
  },
  {
    id: "CSS 설계 가이드",
    text: "CSS 설계 가이드",
    color: "#635666",
  },
];

// arr의 인덱스 = 순서, 값 = item ID
const arr = ITEMS.map((el, idx) => idx);

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
  const [sequence, setSequence] = useState(arr);
  const [isLodding, setisLodding] = useState(false);
  const [container, setContainer] = useState(null);
  useEffect(() => {
    setContainer(document.querySelector(".container"));
    setisLodding(true);
  }, []);

  const findCard = useCallback(
    (id) => {
      const cardIdx = cards.findIndex((c) => c.id === id);
      const sequenceIdx = sequence.findIndex((el) => el === cardIdx);
      return sequenceIdx;
    },
    [cards, sequence]
  );
  const moveCard = useCallback(
    //sourceId, targetId
    (draggedId, targetId) => {
      const draggedSequenceIdx = findCard(draggedId);
      const targetSequenceIdx = findCard(targetId);
      if (draggedSequenceIdx > -1 && targetSequenceIdx > -1) {
        setSequence((prevSequence) => {
          const newSequence = [...prevSequence];
          [newSequence[draggedSequenceIdx], newSequence[targetSequenceIdx]] = [
            newSequence[targetSequenceIdx],
            newSequence[draggedSequenceIdx],
          ];
          return newSequence;
        });
      }
    },
    [findCard]
  );
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
  }));

  return (
    <>
      <CardContainer ref={drop} className="container">
        {isLodding
          ? sequence
              .map((el, idx) => ({ ...cards[el], idx }))
              .map(({ text, color, id, idx }) => {
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
                  ></Card>
                );
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
