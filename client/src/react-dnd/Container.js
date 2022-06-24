import update from 'immutability-helper';
import { memo, useCallback, useState } from 'react';
import { ItemTypes } from './ItemType';
import { Card } from './Card';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

const ITEMS = [
  {
    id: 1,
    text: '자바스크립트',
    color: '#FEF9A7',
  },
  {
    id: 2,
    text: '노드JS',
    color: '#FAC213',
  },
  {
    id: 3,
    text: '운영체제',
    color: '#F77E21',
  },
  {
    id: 4,
    text: 'HTTP 완벽가이드',
    color: '#D61C4E',
  },
  {
    id: 5,
    text: 'SQL 레벨업',
    color: '#FFCC8F',
  },
  {
    id: 6,
    text: 'Nest JS',
    color: '#A760FF',
  },
  {
    id: 7,
    text: 'React',
    color: '#F6C6EA',
  },
  {
    id: 8,
    text: '영어 공부',
    color: '#1F4690',
  },
  {
    id: 9,
    text: 'CSS 설계 가이드',
    color: '#635666',
  },
];
const CardContainer = styled.div`
  width: 600px;
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
export const Container = memo(() => {
  const [cards, setCards] = useState(ITEMS);
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
      <CardContainer ref={drop}>
        {cards.map(({ text, color, id }) => {
          return <Card text={text} key={id} color={color} moveCard={moveCard} id={`${id}`} findCard={findCard}></Card>;
        })}
      </CardContainer>
    </>
  );
});
