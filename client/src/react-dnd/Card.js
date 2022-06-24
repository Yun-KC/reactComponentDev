import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemType';
import styled from 'styled-components';
const CardDiv = styled.div`
  background-color: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
  text-align: center;
  line-height: 100px;
  overflow: hidden;
`;

export const Card = memo(({ id, text, moveCard, findCard, color }) => {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
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
