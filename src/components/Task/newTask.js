import { v4 as uuidv4 } from "uuid";

function newTask(title, description = "") {
  return {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
  };
}

export default newTask;
