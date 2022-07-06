import { memo, useCallback, useMemo, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemType";
import styled from "styled-components";
const CardDiv = styled.div`
  background-color: ${({ color }) => color};
  /* opacity: ${({ opacity }) => opacity}; */
  text-align: center;
  line-height: 100px;
  overflow: hidden;
  display: inline-block;
  width: 80%;
  height: 10%;
  font-size: 16px;
  transition: all 0.5s;
  transform: scale(${({ isHover }) => (isHover ? 1.5 : 1)});
  /* z-index: ${({ isDragging }) => (isDragging ? 1 : 0)}; */
`;
// transition: all 2s;
// "#" + Math.round(Math.random() * 0xffffff).toString(16)

// const $container = document.querySelector(".container");
// const locationCalculator = (num, width, height) => {};

export const Card = memo(({ id, text, moveCard, findCard, color, container, originalIndex }) => {
  const test = useCallback(() => {
    /* 아이템 드래그 중에  */
  });
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex, text },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      end: (item, monitor) => {
        const { id: droppedId } = item;
        // 타겟에 드랍되면 true
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );
  const [{ isHover }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      //hover는 드래그 중인 아이템의 정보임
      drop({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
      collect: (monitor) => {
        return { isHover: monitor.isOver() && monitor.getItem().id !== id };
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0.5 : 1;
  return (
    <CardDiv color={color} opacity={opacity} ref={(node) => drag(drop(node))} isHover={isHover} isDragging={isDragging}>
      {text}
      <br />
      {originalIndex}
    </CardDiv>
  );
});
