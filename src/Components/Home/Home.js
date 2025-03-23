import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogoff = () => {
    // Clear user data from local storage or session storage
    localStorage.removeItem('userToken'); // Example key, replace with your actual key
    sessionStorage.removeItem('userSession'); // Example key, replace with your actual key

    // Redirect to login page
    navigate('/');
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={handleLogoff}>Logoff</button>
    </div>
  );
}

export default Home;