import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 90%;
  padding: 1rem;
  margin-right: 10rem;
  .text-color-red {
    color: red;
  }
  .email-password-paper {
    /* position: absolute; */
    /* top: 20%; */
    /* left: 20%; */
    width: 200px;
    min-height: 50px;
    padding: 5px;
    /* background: black; */
  }
`;

export const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: white;
  border: 1px solid #3b9ffc;
  border-radius: 5px;
  ::placeholder {
    color: #3b9ffc;
  }
`;
