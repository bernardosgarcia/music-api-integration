import { Request, Response } from 'express';

export const getAuth = (req: Request, res: Response) => {
  res.json({
    message: 'Auth successful',
    user: req.user
  });
};

