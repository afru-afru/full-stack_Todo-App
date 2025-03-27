'use client'
import TodoForm from '@/Components/TodoForm';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormPage() {
  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api');
      setTodoData(response.data.todos);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  return (
    <div>
      <ToastContainer theme="dark"/>
      <TodoForm fetchTodos={fetchTodos} />
    </div>
  );
}