import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Login from './Login';

import Signup from './Signup';
import '../App.css';

const Authentication = () => {
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [toggle, setToggle] = useState(true);
  return (
    <div>
      <h1>Authentication</h1>
      <p>Authentication component</p>
      {toggle ? (
        <Login toggleForm={handleToggle} />
      ) : (
        <Signup toggleForm={handleToggle} />
      )}
    </div>
  );
};

export default Authentication;
