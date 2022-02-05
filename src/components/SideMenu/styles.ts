import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 13%;
  padding: 10px;
  a {
    color: #015c8c;
    text-decoration: none;
    font-size: 26px;
    font-weight: 500;
  }
  .active {
    color: #002e47;
  }
`;
