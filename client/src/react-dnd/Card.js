import { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemType";
import styled from "styled-components";
const CardDiv = styled.div`
  background-color: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
  text-align: center;
  line-height: 100px;
  overflow: hidden;
  display: inline-block;
  width: 300px;
  height: 300px;
`;
// transition: all 2s;
// "#" + Math.round(Math.random() * 0xffffff).toString(16)

const locationCalculator = (num, parentWidth, parentHeight) => {};
const $container = document.querySelector(".container");

export const Card = memo(({ id, text, moveCard, findCard, color }) => {
  const originalIndex = findCard(id).index;

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
        console.log(didDrop);
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      //hover는 드래그 중인 아이템의 정보임
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0.5 : 1;

  return (
    <CardDiv color={color} opacity={opacity} ref={(node) => drag(drop(node))}>
      {text}
      <br />
      {originalIndex}
    </CardDiv>
  );
});
