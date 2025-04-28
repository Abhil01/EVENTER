import React, { useState } from 'react';
import axios from '../services/api';

export default function RegisterButton({ eventId, onRegistered }) {
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post(`/registrations`, { eventId });
      onRegistered();
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRegister}
      disabled={loading}
      className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 hover:bg-purple-700"
    >
      {loading ? 'Registering...' : 'Register'}
    </button>
  );
}
