import express, { Request, Response, NextFunction } from 'express';
import * as db from '../modules/db_query';
import { testRegExp } from '../util';
import { IUserName, IUserId, IUserData } from '../type/Interfaces';

const router = express.Router();


/**
 * @route   get api/user/list
 * @desc    request user list
 * @access  public
 */
router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userList:IUserData[] = await db.userList();
    res.status(200).json(userList);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'error': '오류가 발생 했습니다.' });
  }
});

/**
 * @route   POST api/user/add_user
 * @desc    register user
 * @access  public
 */
router.post('/add_user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name }: IUserName = req.body;
    if (!testRegExp('name', name)) {
      return res.status(500).json({ 'error': '이름이 올바르지 않습니다.' });
    }
    const findUserData:IUserData[] = await db.findByUserName({ name });
    if (findUserData.length > 0) {
      return res.status(500).json({ 'error': '이미 등록 된 이름 입니다.' });
    }
    await db.insertUserName({ name });
    res.status(200).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'error': '오류가 발생 했습니다.' });
  }
});

/**
 * @route   POST api/user/delete_user
 * @desc    delete user
 * @access  public
 */
router.post('/delete_user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id }: IUserId = req.body;
    await db.deleteUserByUserId({ user_id });
    res.status(200).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'error': '오류가 발생 했습니다.' });
  }
});

/**
 * @route   POST api/user/edit_user
 * @desc    edit user
 * @access  public
 */
router.post('/edit_user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, name }: IUserData = req.body;
    const findUserData:IUserData[] = await db.findByUserName({ name });
    if (findUserData.length > 0) {
      return res.status(500).json({ 'error': '이미 등록 된 이름 입니다.' });
    }
    await db.editUserNameByUserId({ user_id, name });
    res.status(200).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'error': '오류가 발생 했습니다.' });
  }
});

export default router;
