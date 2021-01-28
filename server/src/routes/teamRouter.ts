import express, { Request, Response, NextFunction } from 'express';
import * as db from '../modules/db_query';
import { generateMessage } from '../util';
import {
  IUserData,
  ITeamFilter,
  TTeamData,
  IRequestDetail,
  ITeamAndUser,
  IResultTeam,
} from '../type/Interfaces';

const router = express.Router();

/**
 * @route   POST api/team/add
 * @desc    add team
 * @access  public
 */
router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { minUserCount, teamCount }: ITeamFilter = req.body;
    const notCreateTeamMsg = generateMessage('그룹을 생성할 수 없습니다.');

    const userList: IUserData[] = await db.userList();
    if (userList.length === 0) {
      return res.status(500).json(notCreateTeamMsg);
    }

    const isNotTryProcess = userList.length < minUserCount * teamCount;
    if (isNotTryProcess) {
      return res.status(500).json(notCreateTeamMsg);
    }

    const teamData: TTeamData = [
      [[1, 2], [3, 4]],
      [[2, 3], [1, 4]],
      [[1, 3], [2, 4]],
    ];

    const generationRow: (number | undefined) = await db.insertTeam({ teamData });
    if (!generationRow) {
      return res.status(500).json({ 'msg': '오류가 발생 했습니다.' });
    }
    res.status(200).json({ generate_id: generationRow });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'msg': '오류가 발생 했습니다.' });
  }
});

/**
 * @route   get api/team/detail/:generate_id
 * @desc    request Detail Team
 * @access  public
 */
router.get('/detail/:generate_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { generate_id }: IRequestDetail = req.body;
    const findTeamList: ITeamAndUser[] = await db.findByTeamByGenerationId({ generate_id });
    const resultTeamList:IResultTeam = findTeamList.reduce((acc: any[], curr: ITeamAndUser) => {
      const { team_step, team_name, name, disabled } = curr;
      if (!Array.isArray(acc[team_step])) acc[team_step] = [];
      if (!Array.isArray(acc[team_step][team_name])) acc[team_step][team_name] = [];
      acc[team_step][team_name].push({ name, disabled });
      return acc;
    }, []);
    res.status(200).json(resultTeamList);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'msg': '오류가 발생 했습니다.' });
  }
});


export default router;
