'use client'
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const TodoForm = ({ fetchTodos }) => {
    const router =useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

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
      router.push('/')

    } catch (error) {
      toast.error('Error creating todo');
    }
  };

  return (
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
  );
};

export default TodoForm;