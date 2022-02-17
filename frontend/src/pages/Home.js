import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>please select an option below:</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create new ticket.
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt />
        List all tickets.
      </Link>
    </>
  );
};

export default Home;
