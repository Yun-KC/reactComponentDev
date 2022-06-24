// import styled from 'styled-components';
import update from 'immutability-helper';
import { memo, useCallback, useState } from 'react';
import { ItemTypes } from './itemType';
import { Card } from './Card';
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
  const findCard = useCallback(() => {}, []);
  const moveCard = useCallback(() => {}, []);

  return (
    <CardContainer>
      {cards.map(({ text, color }) => {
        return <Card text={text} color={color}></Card>;
      })}
    </CardContainer>
  );
});
