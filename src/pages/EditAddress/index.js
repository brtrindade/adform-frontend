import React, {useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import AddressEditForm from '../../components/AddressEditForm';
import api from '../../services/api';

import './styles.css';

function EditAddress({match}) {

  const [address, setAddress] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getAddress() {
      const response = await api.get(`/address/${match.params.address_id}`);
      setAddress(response.data);
    }
    getAddress();
  }, [match.params.address_id]);

  function handleCancel() {
    history.goBack();
  }

  async function handleEditAddress(data) {
    await api.put(`/address/${match.params.address_id}`, data);
    history.goBack();
  }

  if(!address) {
    return null
  }

  return(
    <div className="container">
      <main className="userform">
        <strong>Editar Endereço</strong>
        <AddressEditForm address={address} onSubmit={handleEditAddress} onCancel={handleCancel}/>
      </main>
    </div>
  )
}

export default EditAddress;
