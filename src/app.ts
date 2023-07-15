import express, { Application } from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json());

/**
 * Detalhes da aplicação:
 * 1. Criar novas tarefas
 * 2. Listar todas as tarefas
 * 3. Pegar uma tarefa específica
 * 4. Atualizar uma tarefa especifica
 * 5. Atualizar o status de uma tarefa específica
 *
 * regras da aplicação
 * 1- caso o ID enviado não exista, retornar um erro para o cliente
 * 2- se o nome da tarefa já existir, retornar um erro para o cliente
 * 3- caso o 'status' enviado na rota de atualização não exista, retornar um erro para o cliente
 */

app.post("/tasks", logics.create);
app.get("/tasks", logics.read);

app.use("/tasks/:taskId", middlewares.verifyIfIDExist);
app.get("/tasks/:taskId", logics.retrieve);
app.put("/tasks/:taskId", logics.updateStatus);
app.patch("/tasks/:taskId", logics.update);
app.delete("/tasks/:taskId", logics.destroy);

const PORT: number = 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
