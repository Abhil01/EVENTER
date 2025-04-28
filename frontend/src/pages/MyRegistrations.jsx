import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import EventCard from '../components/EventCard';

export default function MyRegistrations() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    axios
      .get('/registrations/mine')
      .then(res => setRegs(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      {regs.map(r => (
        <EventCard key={r.event._id} event={r.event} onView={() => {}} />
      ))}
    </div>
  );
}
