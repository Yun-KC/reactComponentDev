import styled from 'styled-components';
const CardDiv = styled.div`
  background-color: ${({ color }) => color};
  text-align: center;
  line-height: 100px;
  overflow: hidden;
`;

export const Card = ({ text, color }) => {
  return <CardDiv color={color}>{text}</CardDiv>;
};
