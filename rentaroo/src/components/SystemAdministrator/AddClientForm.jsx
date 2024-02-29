import React, { useState } from 'react';
import '../../styles/SystemAdministrator/ClientForm.css'

const AddClientForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form className='client-form'>

      <h1>Client Form</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add Client</button>
    </form>
  );
};

export default AddClientForm;

