import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LinkRow from '../components/LinkRow';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [targetUrl, setTargetUrl] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Base url
  const BASE_URL ='https://tinylink-dfb6.onrender.com';

  // Load all links from backend
  const loadLinks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${BASE_URL}/api/links`);
      setLinks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load links');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  // Handle adding a new link
  const handleAdd = async (e) => {
  e.preventDefault();
  setError('');

  const trimmedUrl = targetUrl.trim(); // <-- remove leading/trailing spaces

  if (!/^https?:\/\//.test(trimmedUrl)) {
    setError('URL must start with https://');
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(`${BASE_URL}/api/links`, {
      target_url: trimmedUrl, // use trimmed URL
      code: code.trim() || undefined, // optional, trim code as well
    });
    console.log('Backend response:', res.data);

    if (res.status === 201) {
      setTargetUrl('');
      setCode('');
      loadLinks();
    } else {
      setError(res.data?.error || 'Failed to create link');
    }
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error || 'Failed to create link');
  }
  setLoading(false);
};

  // Handle deleting a link
  const handleDelete = async (c) => {
    if (!confirm('Delete this link?')) return;
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/api/links/${c}`);
      loadLinks();
    } catch (err) {
      console.error(err);
      setError('Failed to delete link');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <form onSubmit={handleAdd} className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="https://example.com"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          type="text"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border px-3 py-2 rounded w-52"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(links) && links.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2">Code</th>
              <th className="border px-2 py-2">URL</th>
              <th className="border px-2 py-2">Total Clicks</th>
              <th className="border px-2 py-2">Last Click</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((item) => (
              <LinkRow key={item.code} item={item} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No links found.</p>
      )}
    </div>
  );
}

