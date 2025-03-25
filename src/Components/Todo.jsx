import React, { useState } from 'react';
import TodoDetailPage from './TodoDetailPage';

function Todo({ id, title, description, mongoId, complete, deleteTodo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {id}
        </th>
        <td className="px-6 py-4">{title}</td>
        <td className="px-6 py-4">
          {description.length > 30 ? `${description.substring(0, 30)}...` : description}
        </td>
        <td className="px-6 py-4">
          {complete ? "✅ Completed" : "⏳ Pending"}
        </td>
        <td className="px-6 py-4 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(mongoId);
            }}
            className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetail(true);
            }}
            className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            View
          </button>
        </td>
      </tr>

      {showDetail && (
        <TodoDetailPage
          todo={{
            _id: mongoId,
            title,
            description,
            complete
          }}
          onClose={() => setShowDetail(false)}
        />
      )}

      {isExpanded && !showDetail && (
        <tr className="bg-gray-50">
          <td colSpan="5" className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold">{title}</h4>
                <p>{description}</p>
                <p className="text-sm text-gray-500">
                  Status: {complete ? "Completed" : "Pending"}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ▲
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default Todo;