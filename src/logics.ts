import { Request, Response, request } from "express";
import { ITask, TTaskCreate, TTaskStatus } from "./interfazes";
import database from "./database";

const getNextId = (): number => {
  const lastItem: ITask | undefined = database
    .sort((a, b): number => a.id - b.id)
    .at(-1);
  if (!lastItem) return 1;
  return lastItem.id + 1;
};

const create = (request: Request, response: Response): Response => {
  const payload: TTaskCreate = request.body;
  const newtask: ITask = { id: getNextId(), ...payload, status: "pendente" };

  database.push(newtask);
  return response.status(201).json(newtask);
};

const read = (request: Request, response: Response): Response => {
  return response.status(201).json(database);
};

const retrieve = (request: Request, response: Response): Response => {
  const { foundTask } = response.locals;

  return response.status(200).json(foundTask);
};
const update = (request: Request, response: Response): Response => {
  const { foundTask, taskIndex } = response.locals;
  const payload = request.body;

  const task: ITask = (database[taskIndex] = {
    ...foundTask,
    ...payload,
  });

  return response.status(200).json(task);
};
const updateStatus = (request: Request, response: Response): Response => {
  const { status } = request.body;
  const { foundTask, taskIndex } = response.locals;

  const possibleStatus: TTaskStatus[] = [
    "cancelado",
    "concluido",
    "em andamento",
    "pendente",
  ];
  if (!possibleStatus.includes(status)) {
    const error: string = `Possible status are : ${possibleStatus}`;
    return response.status(400).json({ error });
  }

  const task: ITask = (database[taskIndex] = {
    ...foundTask,
    status,
  });

  return response.status(200).json(task);
};
const destroy = (request: Request, response: Response): Response => {
  const { taskId } = request.params;
  const { taskIndex } = response.locals;

  database.splice(taskIndex, 1);
  return response.status(204).json();
};

export default { create, read, update, destroy, retrieve, updateStatus };
