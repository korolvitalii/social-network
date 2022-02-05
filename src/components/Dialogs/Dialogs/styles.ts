import styled from 'styled-components';
import { size } from '../../../helpers/device';

export const Wrapper = styled.div`
  padding: 1rem;
  width: 90%;
  display: flex;

  .dialogs-items {
    border: 1px solid #e6f2f5;
    padding: 0.25rem;
    border-radius: 10px;
    width: 20%;
    overflow: auto;
    max-height: 500px;
    min-width: 150px;
  }
  .messages-block {
    width: 100%;
  }
  @media (max-width: ${size.tablet}) {
    flex-direction: column;
  }
`;
