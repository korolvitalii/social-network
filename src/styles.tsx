import styled from 'styled-components';
import { device } from './helpers/device';

export const Wrapper = styled.div`
  @media ${device.mobileS} {
    max-width: ${device.mobileS};
  }
  @media ${device.mobileM} {
    max-width: ${device.mobileM};
  }
  @media ${device.mobileL} {
    max-width: ${device.mobileL};
  }
  @media ${device.tablet} {
    max-width: ${device.tablet};
  }

  @media ${device.laptop} {
    max-width: ${device.laptop};
  }

  @media ${device.laptopL} {
    max-width: ${device.laptopL};
  }

  @media ${device.desktop} {
    max-width: ${device.desktop};
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;
