import styled from 'styled-components';

export const Wrapper = styled.div`
  border-radius: 5px;
  margin: 0.5rem;
  .user-container {
    display: flex;
    justify-content: space-between;
  }
  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .follow-button {
    height: 40px;
  }
  .user-avatar {
    width: 100px;
    height: 100px;
  }
  .user-fullname {
    font-weight: 700;
  }
`;
