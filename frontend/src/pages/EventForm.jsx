import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../services/api';
import EventForm from '../components/EventForm';

export default function EventFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/events/${id}`).then(res => setInitial(res.data));
    }
  }, [id]);

  const handleSubmit = data => {
    if (id) {
      axios.put(`/events/${id}`, data).then(() => navigate(`/events/${id}`));
    } else {
      axios.post('/events', data).then(res => navigate(`/events/${res.data._id}`));
    }
  };

  if (id && !initial) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <EventForm onSubmit={handleSubmit} initial={initial} />
    </div>
  );
}
