type TTaskStatus = "pendente" | "concluido" | "em andamento" | "cancelado";
interface ITask {
  id: number;
  title: string;
  description: string;
  status: TTaskStatus;
}

type TTaskCreate = Omit<ITask, "id" | "status">;
type TTaskUpdate = Partial<TTaskCreate>;

export { TTaskStatus, ITask, TTaskCreate, TTaskUpdate };
