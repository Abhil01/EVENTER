import React, { useState } from 'react';

export default function EventForm({ onSubmit, initial = {} }) {
  const [title, setTitle] = useState(initial.title || '');
  const [date, setDate] = useState(initial.date ? initial.date.slice(0, 10) : '');
  const [location, setLocation] = useState(initial.location || '');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ title, date, location });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {initial._id ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
}
