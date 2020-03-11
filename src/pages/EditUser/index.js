import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import UserEditForm from '../../components/UserEditForm';
import api from '../../services/api';

import './styles.css';
import AddressItem from '../../components/AddressItem';

function EditUser({match}) {

  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getAddress() {
      const response = await api.get(`/users/${match.params.user_id}/address`);
      setAddresses(response.data);
    }
    getAddress();
  }, [match.params.user_id, addresses])

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`/users/${match.params.user_id}`)
      setUser(response.data);
    }
    loadUser();
    
  }, [match.params.user_id]);

  async function loadAddresses() {
    const response = await api.get(`/users/${match.params.user_id}/address`);
    setAddresses(response.data);
  }

  function handleUpdateAddresses() {
    loadAddresses();
  }

  function handleCancel() {
    history.goBack();
  }

  async function handleEditUser(data) {
    await api.put(`/users/${match.params.user_id}`, data);
    history.goBack();
  }

  if(!user) {
    return null;
  }

  return(
    <div className="container">
      <main className="userform">
        <p>Editar Usuário</p>
        <UserEditForm user={user} onSubmit={handleEditUser} onCancel={handleCancel} />
        <div className="addresses">
          <p>Endereços</p>
          <div className="addresses-items">
            <ul>
              {addresses.map(address => (
                <AddressItem key={address.id} address={address} callback={handleUpdateAddresses} />
              ))}
            </ul>
          </div>
          <Link to={`/users/${match.params.user_id}/address/new`}>
            <button className="btn-add">+</button>
          </Link>
        </div>
                  
      </main>
    </div>
  )
}

export default EditUser;

