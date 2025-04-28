import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Eventer</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/events/new" className="hover:underline">New Event</Link>
              <Link to="/my-registrations" className="hover:underline">My Registrations</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
