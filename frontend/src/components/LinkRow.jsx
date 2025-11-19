import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkRow({ item, onDelete }) {
  const BASE_URL ='http://localhost:3000';

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3 font-mono text-center">{item.code}</td>
      <td className="px-4 py-3 max-w-md truncate text-left">{item.target_url}</td>
      <td className="px-4 py-3 text-center">{item.total_clicks}</td>
      <td className="px-4 py-3 text-center">
        {item.last_clicked ? new Date(item.last_clicked).toLocaleString() : '-'}
      </td>
      <td className="px-4 py-3 flex justify-center gap-3">
        {/* External link */}
        <a
          href={`${BASE_URL}/${item.code}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          Open
        </a>

        {/* Internal link using React Router */}
        <Link to={`/code/${item.code}`} className="text-green-600 hover:underline">
          Stats
        </Link>

        {/* Delete button */}
        <button
          onClick={() => onDelete(item.code)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
