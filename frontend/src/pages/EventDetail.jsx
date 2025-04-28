import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import RegisterButton from '../components/RegisterButton';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`/events/${id}`).then(res => setEvent(res.data));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
      <p className="mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-4">Location: {event.location}</p>
      <RegisterButton
        eventId={event._id}
        onRegistered={() => alert('Registered!')}
      />
    </div>
  );
}
