import React from 'react';

export default function EventCard({ event, onView }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-1">
        Date: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4">Location: {event.location}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => onView(event._id)}
      >
        View Details
      </button>
    </div>
  );
}
