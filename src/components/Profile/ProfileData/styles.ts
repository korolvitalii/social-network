import styled from 'styled-components';
import { device, size } from '../../../helpers/device';

export const Wrapper = styled.div`
  padding: 0.5rem;
  @media ${device.mobileS} {
    max-width: ${size.mobileS};
  }
  @media ${device.mobileM} {
    max-width: ${size.mobileM};
  }
  @media ${device.mobileL} {
    max-width: ${size.mobileL};
  }
  @media ${device.tablet} {
    max-width: ${size.tablet};
  }

  @media ${device.laptop} {
    max-width: ${size.laptop};
  }

  @media ${device.laptopL} {
    max-width: ${size.laptopL};
  }

  @media ${device.desktop} {
    max-width: ${size.desktop};
  }
  .info-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0.5rem;
  }

  .info-item-type {
    width: 20%;
  }
  .info-item-description {
    width: 80%;
  }
  .check-circle-icon {
    font-size: 22px;
    margin-left: 15px;
    color: #00b3d6;
  }
  .dont-disturb-icon {
    font-size: 22px;
    margin-left: 10px;
    color: #00b3d6;
  }
  .fullname-status-block {
    margin-left: 0.5rem;
  }
`;
