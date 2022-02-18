import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const NewTicket = () => {
  //get the user details
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const name = user.name;
  // const email = user.email;
  const [project, setProject] = useState('Java');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('N.A.');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const handleSubmit = (e) => {
    e.preventDeafault();
    dispatch(createTicket({ project, desc, link }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>New ticket</h1>
        <p>Fill the card below.</p>
      </section>
      <section className="new-ticket-form">
        <div className="form-group">
          <label htmlFor="name">Created by</label>
          <input type="text" disabled className="form-control" value={name} />
        </div>
        {/* <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" disabled className="form-control" value={email} />
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <select
              name="project"
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaSript</option>
              <option value="C++">C++</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the ticket.</label>
            <textarea
              name="description"
              id="description"
              cols=""
              rows=""
              className="form-control-desc"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="link">Link to project</label>
            <input
              type="url"
              id="link"
              name="link"
              className="form-control"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="btn btn-block">Submit</div>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
