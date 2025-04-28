import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import EventCard from '../components/EventCard';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/events').then(res => setEvents(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map(evt => (
        <EventCard
          key={evt._id}
          event={evt}
          onView={id => navigate(`/events/${id}`)}
        />
      ))}
    </div>
  );
}
