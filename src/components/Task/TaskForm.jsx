import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ taskName: "", description: "" });

  const validate = () => {
    const newErrors = { taskName: "", description: "" };
    let isValid = true;
    if (!taskName.trim()) {
      newErrors.taskName = "Task name is required.";
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    await onAddTask(taskName, description);
    setTaskName("");
    setDescription("");
    setErrors({ taskName: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="task-form-row">
        <div className="task-form-field">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name..."
          />
          {errors.taskName && (
            <p className="task-form-error">{errors.taskName}</p>
          )}
        </div>
        <div className="task-form-field">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description..."
          />
          {errors.description && (
            <p className="task-form-error">{errors.description}</p>
          )}
        </div>
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
}

export default TaskForm;