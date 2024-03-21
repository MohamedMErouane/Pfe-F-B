"use client"
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons/fa
import { useSession } from 'next-auth/react';
import { BACKEND_URL } from '@/lib/Constants';
import { Todo } from '@/lib/types';

const TodoList = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const {data : session} = useSession()

  useEffect(() => {
    fetchTasks(session?.user.id);
    updateCurrentDate(); // Initial call to update current date
    const interval = setInterval(updateCurrentDate, 86400000); // Update date every day (86400000 milliseconds = 1 day)
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [tasks]);

  const fetchTasks = async (userId: string | undefined) => {
    try {
      const response = await fetch(`${BACKEND_URL}/todos/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      console.log("hello")
      setTasks(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  const addTask = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch(BACKEND_URL + '/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          description: newTask,
          userId : session?.user.id
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
  
      // Update the local state with the newly added task received from the backend
      const data = await response.json();
      setTasks(data);

      fetchTasks(session?.user.id);
  
      // Clear the input field
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  const deleteTask = async (taskId : string) => {
    try {
      await fetch(`${BACKEND_URL}/todos/${taskId}`, {
        method: 'DELETE'
      });
      fetchTasks(session?.user.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId : string, completed : boolean) => {
    try {
      await fetch(`${BACKEND_URL}/todos/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !completed })
      });
      fetchTasks(session?.user.id); // Assuming fetchTasks is a function that fetches the updated task list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const updateCurrentDate = () => {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <p className="text-lg text-black">Hi @{session?.user.firstName} , set yourself up for success! 🚀</p>
      <h1 className="text-2xl font-normal my-4 text-black">What do you want to achieve?</h1>
      <p className="text-sm text-black text-right mb-4 ">☀️{currentDate} </p>
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task..."
          className="p-2 mr-2 border rounded-md flex-grow text-black" // Changed text color to black
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">Add Task</button>
      </form>
      {tasks.length > 0 && (
  <ul className="todo-list text-black">
    {tasks.map((task) => (
      <li key={task.id} className={`todo-item ${task.completed ? 'line-through' : ''}`}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id, task.completed)}
          className="mr-2"
        />
        <span>{task.description}</span>
        <button
          onClick={() => deleteTask(task.id)}
          className="ml-auto text-red-500"
        >
          <FaTrash />
        </button>
      </li>
    ))}
  </ul>
)}
      <style jsx>{`
        .todo-item {
          background-color: #fff;
          padding: 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .todo-item.completed {
          text-decoration: line-through;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
