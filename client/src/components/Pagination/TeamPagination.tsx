import React, { FC } from "react";
import styled from "styled-components";

const StylePaginationWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StylePagination = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: #fcfcfc;
  border: 1px solid #ddd;
  cursor: pointer;

  &:focus {
    outline: unset;
  }

  &:hover {
    background-color: #ececec;
  }

  &:disabled {
    background-color: #ddd;
  }

  & + & {
    margin-left: 1rem;
  }
`;

const StylePrevImage = styled.img`
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
`;

const StyleNextImage = styled.img`
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
`;

type TypeMainTitle = {
  currentPage: number | undefined;
  maxPage: number | undefined;
  onClickPrevHandle: React.MouseEventHandler<HTMLElement>;
  onClickNextHandle: React.MouseEventHandler<HTMLElement>;
};

const TeamPagination: FC<TypeMainTitle> = ({
  currentPage,
  maxPage,
  onClickPrevHandle,
  onClickNextHandle,
}) => {
  return (
    <StylePaginationWrap>
      <StylePagination
        onClick={onClickPrevHandle}
        disabled={!currentPage || currentPage === 1}
      >
        <StylePrevImage src="/images/down-arrow.svg" alt="이전페이지" />
      </StylePagination>
      <StylePagination
        onClick={onClickNextHandle}
        disabled={!currentPage || !maxPage || currentPage === maxPage}
      >
        <StyleNextImage src="/images/down-arrow.svg" alt="이전페이지" />
      </StylePagination>
    </StylePaginationWrap>
  );
};

export default TeamPagination;
