"use client"
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Spinner from "@/Components/Spinner";
import TodoDetailPage from "@/Components/TodoDetailPage";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [todoData, setTodoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewingTodo, setViewingTodo] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios('/api');
      setTodoData(response.data.todos);
    } catch (error) {
      toast.error('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formData);
      toast.success(response.data.Msg);
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch (error) {
      toast.error('Error creating todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api', { params: { mongoId: id } });
      toast.success(response.data.Msg);
      await fetchTodos();
    } catch (error) {
      toast.error('Error deleting todo');
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await axios.put('/api', {}, { params: { mongoId: id } });
      toast.success(response.data.Msg);
      await fetchTodos();
    } catch (error) {
      toast.error('Error completing todo');
    }
  };

  // search by id& title &description
  const filteredTodos = todoData.filter(todo => {
    const searchLower = searchTerm.toLowerCase();
    return (
      todo._id.toString().toLowerCase().includes(searchLower) ||
      todo.title.toLowerCase().includes(searchLower) ||
      todo.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <ToastContainer theme="dark"/>
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input
          type="text"
          value={formData.title}
          onChange={onChangeHandler}
          placeholder="Enter Title"
          name="title"
          className="px-3 py-2 border-2 w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={onChangeHandler}
          placeholder="Enter description"
          className="px-3 py-2 border-2 w-full"
          required
        />
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      {/* Unified Search Input */}
      <div className="my-4 w-[60%] mx-auto">
        <input
          type="text"
          placeholder="Search by ID, title, or description..."
          className="px-3 py-2 border-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Todo Table */}
      <div className="relative overflow-x-auto mt-6 w-[60%] mx-auto">
        {loading ? (
           <div className="text-center py-4">
           <Spinner size="lg" className="mx-auto" />
           <p className="mt-2">Loading todos...</p>
         </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.length > 0 ? (
                filteredTodos.map((item, index) => (
                  <Todo
                    key={item._id}
                    id={index + 1}
                    title={item.title}
                    description={item.description}
                    complete={item.isCompleted}
                    mongoId={item._id}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    {searchTerm ? "No matching todos found" : "No todos available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>


    </>
  );
}