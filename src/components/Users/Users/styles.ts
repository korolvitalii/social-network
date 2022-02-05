import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1000px;
  .userPhoto {
    width: 80px;
    height: 80px;
  }

  .userInfo {
    flex-direction: column;
  }

  .spanActive {
    font-weight: bold;
  }

  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    cursor: pointer;
    color: #00b3d6;
    width: 90%;
    margin-bottom: 1rem;
  }

  .pagination a {
    margin-left: 0.1rem;
  }
  .active {
    font-weight: bold;
  }

  .pageLink {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #00b3d6;
    color: #00b3d6;
  }
`;
