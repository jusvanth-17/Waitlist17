import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>iPhone Waitlist</h1>
        <p>Be the first to own the latest iPhone. Join the waitlist now!</p>
      </header>

      <main className="home-main">
        <section className="home-info">
          <h2>Why Join?</h2>
          <ul>
            <li>Exclusive early access</li>
            <li>Priority updates</li>
            <li>Special launch offers</li>
          </ul>
        </section>

        <section className="home-register">
          <h3>Don’t Miss Out!</h3>
          <Link to="/SignUp" className="btn register-btn">Register Now</Link>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} iPhone Waitlist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;