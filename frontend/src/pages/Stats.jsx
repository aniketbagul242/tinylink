import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const BASE_URL ='http://localhost:3000';


  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/links/${code}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError('Link not found');
        setData({ error: true });
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [code]);

  if (loading)
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (data?.error)
    return <p className="text-red-600 text-center mt-10">Not found</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Stats for <span className="text-blue-600">{data.code}</span></h2>

      <div className="space-y-2">
        <div>
          <span className="font-semibold text-gray-700">URL:</span>{' '}
          <a href={data.target_url} target="_blank" className="text-blue-600 hover:underline">
            {data.target_url}
          </a>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Total Clicks:</span> {data.total_clicks}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Last Clicked:</span>{' '}
          {data.last_clicked ? new Date(data.last_clicked).toLocaleString() : '—'}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Created:</span>{' '}
          {new Date(data.created_at).toLocaleString()}
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
