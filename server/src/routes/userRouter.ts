import express, { Request, Response, NextFunction } from "express";
import * as db from "../modules/db_query";
import { generateMessage, testRegExp } from "../util";
import { IUserName, IUserId, IUserData } from "../type/Interfaces";

const router = express.Router();

/**
 * @route   get api/user/list
 * @desc    request user list
 * @access  public
 */
router.get("/list", async (req: Request, res: Response, next: NextFunction) => {
  const notLoadUserListMsg = generateMessage(
    "유저 리스트 호출에 실패 했습니다."
  );
  try {
    const userDataList: IUserData[] = await db.userDataList();
    res.status(200).json(userDataList);
  } catch (e) {
    console.error(e);
    return res.status(500).json(notLoadUserListMsg);
  }
});

/**
 * @route   POST api/user/add
 * @desc    register user
 * @access  public
 */
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name }: IUserName = req.body;
    if (!testRegExp("name", name)) {
      return res.status(500).json({ msg: "이름이 올바르지 않습니다." });
    }
    const findUserData: IUserData[] = await db.findUserByUserName({ name });
    if (findUserData.length > 0) {
      return res.status(500).json({ msg: "이미 등록 된 이름 입니다." });
    }
    await db.insertUserName({ name });
    res.status(200).json({ msg: "인원을 추가 하였습니다." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "인원 추가를 실패 했습니다." });
  }
});

/**
 * @route   POST api/user/delete
 * @desc    delete user
 * @access  public
 */
router.post(
  "/delete",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id }: IUserId = req.body;
      await db.deleteUserByUserId({ user_id });
      res.status(200).json({ msg: "인원을 삭제 하였습니다." });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "인원 삭제를 실패 했습니다.." });
    }
  }
);

/**
 * @route   POST api/user/edit
 * @desc    edit user
 * @access  public
 */
router.post(
  "/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, name }: IUserData = req.body;
      const findUserData: IUserData[] = await db.findUserByUserName({ name });
      if (findUserData.length > 0) {
        return res.status(500).json({ msg: "이미 등록 된 이름 입니다." });
      }
      await db.editUserNameByUserId({ user_id, name });
      res.status(200).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "이름 변경을 실패 했습니다." });
    }
  }
);

export default router;
