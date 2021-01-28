import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadUserListAction,
  registerUserAction,
  deleteUserAction,
  generateTeamAction,
  detailTeamAction
} from '../redux/reducers/commonReducer';

const IndexPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const onChangeName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value);
  }
  const onClickHandle = () => {
    dispatch(registerUserAction(name));
  }

  return (
    <>
      Hello NextJS

      <input type="text" name="name" value={name} onChange={onChangeName}/>
      <button onClick={onClickHandle}>등록</button>
    </>
  );

};

export default IndexPage;