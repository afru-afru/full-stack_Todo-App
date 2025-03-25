import React from 'react';

const TodoDetailPage = ({ todo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mb-4">{todo.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p className="mt-1 whitespace-pre-line">{todo.description}</p>
          </div>

          <div>
            <h3 className="font-semibold">Status:</h3>
            <p className={`mt-1 ${todo.complete ? 'text-green-600' : 'text-yellow-600'}`}>
              {todo.complete ? '✅ Completed' : '⏳ Pending'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold">ID:</h3>
            <p className="mt-1 font-mono text-sm">{todo._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;