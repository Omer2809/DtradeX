import styled from "styled-components";

export const Container = styled.div`
  margin: 20px auto 5px;
  max-width: 450px;
  padding: 20px;
  @media (max-width: 880px) {
    margin: 20px auto 35px;
  }
`;

export const FormWrap = styled.div`
  background: #fff;
  max-width: 400px;
  padding: 30px;
  color: #333;
  border-radius: 7px;
  border-bottom: 4px solid #663399;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  h1,
  p {
    text-align: center;
  }
`;
