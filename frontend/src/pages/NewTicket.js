import produce from 'immer';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
  //get the user details
  const { user } = useSelector((state) => state.authenticate);
  const name = user.name;
  const email = user.email;
  const [project, setProject] = useState('Java');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('N.A.');

  const handleSubmit = (e) => {
    e.preventDeafault();
  };

  return (
    <>
      <section className="heading">
        <h1>New ticket</h1>
        <p>Fill the card below.</p>
      </section>
      <section className="new-ticket-form">
        <div className="form-group">
          <label htmlFor="name">Created by</label>
          <input type="text" disabled className="form-control" value={name} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" disabled className="form-control" value={email} />
        </div>
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
              <option value="Java">Python</option>
              <option value="Java">JavaSript</option>
              <option value="Java">Python</option>
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
            <div className="btn btn-block">Submit</div>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
