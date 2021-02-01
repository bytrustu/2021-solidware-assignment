import React, { FC } from "react";
import styled from "styled-components";
import { Modal, Tag } from "antd";
import { TypeTeams } from "../../type/types";
import { ITeamDetail } from "../../type/interfaces";
import TeamWrap from "../Team/TeamWrap";
import TeamTitle from "../Team/TeamTitle";
import TeamUsersWrap from "../Team/TeamUsersWrap";

const StyleTeamTitle = styled.div`
  position: relative;
  padding: 27px 50px 25px 230px;
  font-size: 17px;
  background-color: #fff;
  line-height: 27px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  height: 80px;
`;

const StyleTeamWrap = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 60px 20px 230px;
  font-size: 14px;
  line-height: 24px;
  color: #555;
  box-sizing: border-box;
  height: 300px;
  max-height: 100px;
  overflow-y: auto;
  border-bottom: 1px solid #eee;

  &.team-list {
    min-height: 30rem;
    max-height: 30rem;
    overflow: scroll;
  }
`;

const StyleTeamBody = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: #555;

  .team-list {
    min-height: 20rem;
  }
`;

const StyleTeamSubTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 180px;
  margin-top: -30px;
  line-height: 60px;
  text-align: center;
  color: #333;
  font-weight: 500;
  font-size: 17px;
`;

const StyleTeamModal = styled(Modal)`
  position: absolute !important;
  width: 60rem !important;
  top: 7% !important;
  left: calc(50% - 30rem) !important;
  z-index: 1000;

  .ant-modal-body {
    padding: 0;
    height: auto;
    max-height: 50rem;
    background: #fcfcfc;

    .team {
      border-bottom: 1px solid #eee;
    }

    .team,
    .answer {
      position: relative;
      width: 100%;
      padding: 20px 200px 20px 230px;
      font-size: 14px;
      line-height: 24px;
      color: #555;
      box-sizing: border-box;
      height: 300px;
      max-height: 100px;
      overflow-y: auto;


      .date {
        position: absolute;
        top: 14px;
        right: 40px;
        font-weight: 500;
      }
    }
  }

  .ant-modal-footer {
    background-color: #fff;

    button {
      color: black;
      border: 1px solid #ddd;

      &:hover {
        color: black;
        border: 1px solid #ddd;
      }
    }
  }


  .ant-modal-footer {
    border: unset;
  }

  .ant-btn-primary {
    display: none;
  }

  button {
    height: 2.5rem;
    font-weight: 500;

    span {
      font-weight: 500;
    }
  }
}

@keyframes display {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

type TypeTeamModal = {
  users: any;
  limit: any;
  group: any;
  teamCase: any;
  teams: any;
  visible: boolean;
  onClose: React.MouseEventHandler<HTMLElement>;
};

const TeamModal: FC<TypeTeamModal> = ({
  users,
  limit,
  group,
  teamCase,
  teams,
  visible,
  onClose,
}) => {
  return (
    <StyleTeamModal
      centered
      visible={visible}
      closable={false}
      cancelText="닫기"
      cancelButtonProps={{ style: { display: "hidden" } }}
      onCancel={onClose}
    >
      <StyleTeamTitle>
        <Tag color="#108ee9">인원: {users && users}</Tag>
        <Tag color="#108ee9">최소 인원: {limit && limit}</Tag>
        <Tag color="#108ee9">그룹 수: {group && group}</Tag>
      </StyleTeamTitle>
      <StyleTeamWrap>
        <StyleTeamSubTitle>팀 케이스</StyleTeamSubTitle>
        <StyleTeamBody>
          {teamCase &&
            teamCase.map((el: number[], elIndex: number) => (
              <Tag key={elIndex} color="#ddd">
                {el.join(", ")}
              </Tag>
            ))}
        </StyleTeamBody>
      </StyleTeamWrap>
      <StyleTeamWrap className="team-list">
        <StyleTeamSubTitle>팀 목록</StyleTeamSubTitle>
        <StyleTeamBody>
          {teams &&
            teams.map((temStep: any, stepIndex: number) => {
              return (
                <TeamWrap key={stepIndex}>
                  <TeamTitle title={teamCase[stepIndex].join(" , ")} />
                  {temStep.map((users: any[], usersIndex: number) => {
                    return (
                      <TeamUsersWrap key={usersIndex} teamIndex={usersIndex}>
                        {users.map((user, userIndex) => (
                          <Tag
                            key={userIndex}
                            color={user.disabled === 0 ? "#108ee9" : "#f50"}
                          >
                            {user.name}
                          </Tag>
                        ))}
                      </TeamUsersWrap>
                    );
                  })}
                </TeamWrap>
              );
            })}
        </StyleTeamBody>
      </StyleTeamWrap>
    </StyleTeamModal>
  );
};

export default React.memo(TeamModal);
