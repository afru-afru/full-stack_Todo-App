"use client"
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Spinner from "@/Components/Spinner";
import TodoDetailPage from "@/Components/TodoDetailPage";
import { useRouter } from "next/navigation";


export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [todoData, setTodoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewingTodo, setViewingTodo] = useState(null);
  const router = useRouter();

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api');
      console.log(response, "response");
      setTodoData(response.data.todos);
    } catch (error) {
      console.error(error, "error")
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



   const handleAddClick = () => {
     router.push('/form');
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


      <div className="flex justify-center items-center gap-4 w-full max-w-[800px] mx-auto mt-24 px-4">

  <div className="w-1/2">
    <input
      type="text"
      placeholder="Search by title, or description..."
      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-400"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* Add Button - equal size */}
  <div className="w-1/2 flex justify-center">
    <button
      className="bg-red-400 hover:bg-red-500 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 w-full max-w-[200px]"
      onClick={handleAddClick}
    >
      Add Todo
    </button>
  </div>
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