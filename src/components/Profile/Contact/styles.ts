import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0.1rem;
  .info-item-type {
    width: 20%;
    margin-right: 0.6rem;
  }
  .info-item-description {
    width: 80%;
    word-wrap: break-word;
  }
`;
