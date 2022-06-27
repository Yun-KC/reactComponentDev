import { memo, useCallback, useMemo, useRef } from "react";
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
  width: 33.33%;
  height: 33.33%;
  font-size: 16px;
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  transition: all 0.5s;
  /* z-index: ${({ isDragging }) => (isDragging ? 1 : 0)}; */
`;
// transition: all 2s;
// "#" + Math.round(Math.random() * 0xffffff).toString(16)

// const $container = document.querySelector(".container");
// const locationCalculator = (num, width, height) => {};

export const Card = memo(({ id, text, moveCard, findCard, color, container, originalIndex, area }) => {
  const position = useMemo(() => {
    //가로아이템 개수를 받기. 현재 가로 아이템 개수 3개 = 임시
    const width = container.clientWidth / 3;
    const height = container.clientHeight / 3;
    // 새로에서 몇층인가?
    const numOfCol = Math.floor(area / 3);
    // 가로에서 몇번째인가?
    const numOfRow = Math.floor(area % 3);
    return { left: width * numOfRow, top: height * numOfCol };
  }, [originalIndex, container, area]);

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
          moveCard(droppedId, droppedId);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  let timer = null;

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      //hover는 드래그 중인 아이템의 정보임
      hover({ id: draggedId }) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          if (draggedId !== id) {
            const {
              card: { id: targetId },
            } = findCard(id);
            moveCard(draggedId, targetId);
          }
        }, 100);
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0.5 : 1;

  return (
    <CardDiv
      color={color}
      opacity={opacity}
      ref={(node) => drag(drop(node))}
      left={position.left}
      top={position.top}
      isDragging={isDragging}
    >
      {text}
      <br />
      {originalIndex}
    </CardDiv>
  );
});
