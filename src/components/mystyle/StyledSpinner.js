import styled from "styled-components";

export const StyledSpinner = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #1a83ff; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
  margin: 20px auto;

  margin-top: ${({ primary }) => (primary ? 150 : 35)}px;
  margin-bottom: ${({ primary, save }) => (save ? 0 : primary ? 400 : 55)}px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StyledText = styled.p`
  font-size: 20px;
  font-weight: 250px;
  margin-top: 5px;
  color: ${({ secondary}) => (secondary? "#fff" : "#060b26")};
  margin-bottom: ${({ primary }) => (primary ? 400 : 140)}px;
  justify-self: center;
  text-align: center;
  width: 100%;
`;
