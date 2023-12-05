import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';
import Confetti from 'react-dom-confetti';

function App() {
  const [joke, setJoke] = useState('');
  const [answer, setAnswer] = useState('');
  const [confetti, setConfetti] = useState(false);

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Programming');
      const { joke, delivery } = response.data;

      setJoke(joke);
      setAnswer(delivery || ''); // Some jokes have a "delivery" field for the punchline
      setConfetti(true); // Enable confetti effect
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  useEffect(() => {
    // Fetch the first joke when the component mounts
    fetchJoke();
  }, []); // Empty dependency array ensures the effect runs only once

  const buttonStyle = {
    fontSize: '1.5em', // You can adjust the font size as needed
    padding: '10px', // Optional: Add some padding for better visual appearance
    background: 'linear-gradient(to bottom, #4CAF50 0%, #45a049 100%)', // Green gradient background
    border: '1px solid #357534', // Darker green border
    borderRadius: '5px', // Rounded corners
    color: 'white', // White text color
    cursor: 'pointer', // Change cursor on hover
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow for 3D effect
    transition: 'background 0.3s, transform 0.3s', // Smooth transition on hover
  };

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#4CAF50', '#45a049', '#0099FF'],
  };

  const onButtonClick = () => {
    fetchJoke(); // Fetch the next joke on button click
  };

  return (
    <div className="App">
      <header className="App-header">
        <Confetti active={confetti} config={confettiConfig} />
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to 4095 Joke Factory</h1>
        <p>Click here for:</p>
        <button style={buttonStyle} onClick={onButtonClick}>
          Programming Joke
        </button>

        {joke && (
          <div>
            <p>Joke: {joke}</p>
            {answer && <p>Answer: {answer}</p>}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
