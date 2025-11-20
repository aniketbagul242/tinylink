import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [targetUrl, setTargetUrl] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // Base url
  const BASE_URL ='https://tinylink-dfb6.onrender.com';

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

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedUrl = targetUrl.trim();
    if (!/^https?:\/\//.test(trimmedUrl)) {
      setError('URL must start with https://');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/links`, {
        target_url: trimmedUrl,
        code: code.trim() || undefined,
      });
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

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied!');
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Dashboard</h2>

      {/* Add Link Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="https://example.com"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-52 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {/* Links Table */}
      {loading ? (
        <p>Loading...</p>
      ) : links.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-2">Short URL</th>
                <th className="border px-2 py-2">Original URL</th>
                <th className="border px-2 py-2">Code</th>
                <th className="border px-2 py-2">Total Clicks</th>
                <th className="border px-2 py-2">Last Click</th>
                <th className="border px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((item) => {
                const shortUrl = `${BASE_URL}/${item.code}`;
                return (
                  <tr key={item.code} className="hover:bg-gray-50">
                    <td className="border px-2 py-2 ">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        {shortUrl}
                      </a>
                    </td>
                    <td className="border px-2 py-2 truncate max-w-xs">{item.target_url}</td>
                    <td className="border px-2 py-2">{item.code}</td>
                    <td className="border px-2 py-2">{item.total_clicks}</td>
                    <td className="border px-2 py-2">
                      {item.last_clicked ? new Date(item.last_clicked).toLocaleString() : '-'}
                    </td>
                    <td className="border px-2 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleCopy(shortUrl)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        Copy
                      </button>
                      <a
                        href={shortUrl}
                        target="_blank"
                        className="px-2 py-1 bg-blue-200 rounded hover:bg-blue-300 transition"
                      >
                        Open
                      </a>
                      <a
                        href={`/code/${item.code}`}
                        className="px-2 py-1 bg-green-200 rounded hover:bg-green-300 transition"
                      >
                        Stats
                      </a>
                      <button
                        onClick={() => handleDelete(item.code)}
                        className="px-2 py-1 bg-red-200 rounded hover:bg-red-300 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No links found.</p>
      )}
    </div>
  );
}


