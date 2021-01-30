import express, { Request, Response, NextFunction } from 'express';
import * as db from '../modules/db_query';
import { generateMessage, removeTextRow } from '../util';
import {
  ITeamFilter,
  TTeamData,
  IRequestDetail,
  ITeamAndUser,
  IResultTeam,
} from '../type/Interfaces';
import { generateTeam } from '../util/generateTeam';

const router = express.Router();

/**
 * @route   POST api/team/generate
 * @body    minUserCount:number, teamCount:number
 * @desc    generate team
 * @access  public
 */
router.post('/generate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { minUserCount, teamCount }: ITeamFilter = req.body;
    const notCreateTeamMsg = generateMessage('그룹을 생성할 수 없습니다.');

    let userIdList: any[] = await db.userIdList();
    if (userIdList.length === 0) {
      return res.status(500).json(notCreateTeamMsg);
    }

    const isNotTryProcess = userIdList.length < minUserCount * teamCount;
    if (isNotTryProcess) {
      return res.status(500).json(notCreateTeamMsg);
    }

    userIdList = removeTextRow(userIdList).map((el: { user_id: number }) => el.user_id);
    const teams: TTeamData = generateTeam(userIdList, teamCount, minUserCount);
    const generationRow: (number | undefined) = await db.insertTeam({ teams });
    if (!generationRow) {
      return res.status(500).json(notCreateTeamMsg);
    }
    res.status(200).json({ generate_id: generationRow });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'msg': '오류가 발생 했습니다.' });
  }
});

/**
 * @route   GET api/team/detail/:generate_id
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
