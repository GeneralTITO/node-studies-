import { NextFunction, Request, Response } from "express";
import { ITask } from "./interfazes";
import database from "./database";

const verifyIfIDExist = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const { taskId } = request.params;
  const foundTask: ITask | undefined = database.find(
    (val): boolean => val.id === Number(taskId)
  );
  if (!foundTask) {
    return response.status(404).json({ error: "Task not found" });
  }
  response.locals = {
    ...response.locals,
    foundTask,
    taskIndex: database.indexOf(foundTask),
  };
  return next();
};

export default { verifyIfIDExist };
