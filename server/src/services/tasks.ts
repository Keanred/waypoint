import { CreateTaskInput, UpdateTaskInput } from "@waypoint/schemas";

export const getTasks = () => {
  return [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];
}

export const createTask = (title: CreateTaskInput) => {
  return { id: Math.floor(Math.random() * 1000), title, completed: false };
}

export const updateTask = (id: string, updates: UpdateTaskInput) => {

}

export const deleteTask = (id: number) => {
  return { message: `Task '${id}' deleted` };
}
