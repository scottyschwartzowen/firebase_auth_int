import { useState, useEffect, useRef } from "react";
// cspell:ignore firestore
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import Toast from "../Toast/Toast";
import { useLocation } from "react-router-dom";

function TaskComponent() {
  const { user } = UserAuth();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedAlpha, setSortedAlpha] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "error" });

  const location = useLocation();
  const showWelcomeRef = useRef(location.state?.showWelcome ?? false);

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type }), 3000);
  };

  useEffect(() => {
    if (!user || !showWelcomeRef.current) return;
    showWelcomeRef.current = false;
    const username = user?.displayName || user?.email?.split("@")[0] || "User";
    showToast(`Welcome, ${username}. Here are your tasks!`, "success");
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const tasksRef = collection(db, "users", user.uid, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(fetched);
      },
      (error) => {
        showToast("Failed to load tasks. Please refresh.");
        console.error("Snapshot error:", error);
      },
    );
    return () => unsubscribe();
  }, [user]);

  const handleAddTask = async (title, description) => {
    if (!user) return;
    try {
      const tasksRef = collection(db, "users", user.uid, "tasks");
      await addDoc(tasksRef, {
        title: title.trim(),
        description: description.trim(),
        createdAt: serverTimestamp(),
      });
      showToast("Task added successfully!", "success");
      setSortedAlpha(false);
    } catch (error) {
      showToast("Failed to add task. Please try again.");
      console.error("Add task error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!user) return;
    try {
      const taskDoc = doc(db, "users", user.uid, "tasks", id);
      await deleteDoc(taskDoc);
      showToast("Task deleted.", "success");
    } catch (error) {
      showToast("Failed to delete task. Please try again.");
      console.error("Delete task error:", error);
    }
  };

  const handleEdit = async (id, title, description) => {
    if (!user) return;
    try {
      const taskDoc = doc(db, "users", user.uid, "tasks", id);
      await updateDoc(taskDoc, {
        title: title.trim(),
        description: description.trim(),
      });
      showToast("Task updated!", "success");
    } catch (error) {
      showToast("Failed to update task. Please try again.");
      console.error("Edit task error:", error);
    }
  };

  const visibleTasks = [...tasks]
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => (sortedAlpha ? a.title.localeCompare(b.title) : 0));

  return (
    <div className='task-component'>
      <Toast message={toast.message} type={toast.type} />
      <TaskForm onAddTask={handleAddTask} />
      <hr />
      <div className='task-controls'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search Tasks'
        />
        <button onClick={() => setSortedAlpha((prev) => !prev)}>
          {sortedAlpha ? "Sorted A–Z ✓" : "Sort by Name"}
        </button>
      </div>
      <TasksList
        allTasks={visibleTasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default TaskComponent;
