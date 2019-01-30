import { Request, Response } from "express";

export interface UserContext {
  req: Request;
  res: Response;
}
