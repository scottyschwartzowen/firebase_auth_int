import { useState } from "react";

function TasksList({ allTasks, handleDelete, handleEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const confirmDelete = (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmed) handleDelete(id);
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    await handleEdit(id, editTitle, editDescription);
    cancelEdit();
  };

  return (
    <ul className="tasks-list">
      {allTasks.length === 0 && <p className="tasks-empty">No tasks found.</p>}
      {allTasks.map(({ title, description, id }) => (
        <li key={id}>
          {editingId === id ? (
            // Inline edit mode
            <div className="tasks-list-row tasks-list-row--editing">
              <div className="tasks-list-text">
                <input
                  className="task-edit-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Task name"
                />
                <input
                  className="task-edit-input"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className="tasks-list-actions">
                <button
                  className="btn-save"
                  onClick={() => saveEdit(id)}
                >
                  Save
                </button>
                <button
                  className="btn-cancel"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Normal view mode
            <div className="tasks-list-row">
              <div className="tasks-list-text">
                <h2>{title}</h2>
                {!description ? null : <p>{description}</p>}
              </div>
              <div className="tasks-list-actions">
                <button
                  className="btn-edit"
                  onClick={() => startEdit({ id, title, description })}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => confirmDelete(id, title)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TasksList;