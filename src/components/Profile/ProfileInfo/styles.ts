import styled from 'styled-components';
import { device } from '../../../helpers/device';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  height: 100%;
  width: 90%;
  @media ${device.tablet} {
    flex-direction: row;
  }
  .desctiption-section {
    display: flex;
    justify-content: column;
  }
  .edit-profile-data {
    width: 100%;
    margin-top: 1rem;
    :hover {
      background-color: lightblue;
    }
  }
  .profile-photo {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
`;
