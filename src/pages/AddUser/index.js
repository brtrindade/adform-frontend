import React from 'react';
import UserForm from '../../components/UserForm';
import api from '../../services/api';

import './styles.css';

function AddUser({history}) {

  async function handleAddUser(data) {
    await api.post('/users', data);
    history.goBack();
  }

  function handleCancel() {
    history.goBack();
  }

  return(
    <div className="container">
      <main className="userform">
        <strong>Novo Usuário</strong>
        <UserForm onSubmit={handleAddUser} onCancel={handleCancel} />
      </main>
    </div>
  )
}

export default AddUser;
