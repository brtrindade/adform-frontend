import React from 'react';

import AddressEditForm from '../../components/AddressEditForm';
import api from '../../services/api';

import './styles.css';

function AddUserAddress({history, match}) {

  const address = {
    type_id: '', 
    zipcode: '', 
    street: '', 
    number: '',
    state: '',
    city: '',
    complement: '',
  };

  function handleCancel() {
    history.goBack();
  }

  async function handleAddAddress(data) {
    await api.post(`/users/${match.params.user_id}/address/`, data);

    history.goBack();
  }

  return(
    <div className="container">
      <main className="addressform">
        <strong>Novo Endereço</strong>
        <AddressEditForm address={address} onSubmit={handleAddAddress} onCancel={handleCancel} />
      </main>
    </div>
  )
}

export default AddUserAddress;
