import styled from "styled-components";

export const StyledSearchBar = styled.div`
  height: 95px;
  padding: 25px 25px 0px 20px;
  box-sizing: border-box;
  color: #fff;
  @media screen and (max-width: 720px) {
    height: 70px;
  }
  .GlobalContainer {
    padding-bottom: 0.5rem;
  }
`;

export const StyledSearchBarContent = styled.div`
  max-width: 700px;
  position: relative;
  padding: 10px;
  border-radius: 50px;
  display: flex;
  height: 60px;
  color: #fff;

  .fa-search {
    width: 50px;
    height: 40px;
    border-radius: 50%;
    /* background: #ff00ff; */
    background: #147;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: 12px;
    box-shadow: 2px 7px 8px rgba(0, 0, 0, 0.45);
    @media screen and (max-width: 720px) {
      height: 30px;
    }
  }

  input {
    font-family: "Abel", sans-serif;
    font-size: 20px;
    outline: none;
    border: 0;
    background: #147;
    border-radius: 50px;
    padding: 10px 20px;
    width: 100%;
    height: 40px;
    color: #fff;
    opacity: 0.8;
    box-shadow: 2px 7px 5px rgba(0, 0, 0, 0.45);
    ::placeholder {
      color: #fff;
      opacity: 1;
    }

    ::-webkit-input-placeholder {
      color: #fff;
    }

    :-ms-input-placeholder {
      color: #fff;
    }

    :focus {
      outline: none;
      color: #fff;
      opacity: 0.9;
    }

    @media screen and (max-width: 720px) {
      height: 30px;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 720px) {
    padding: 0px;
    height: 30px;
    font-size: 15px;
    background: transparent;
  }
`;
