import React, {useState, useEffect} from 'react';
import UserItem from '../../components/UserItem';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

function FindUser() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const history = useHistory();

  async function handleFind(e) {
    e.preventDefault();
    console.log('users');
    const response = await api.get(`/users/user?first_name=${name}`);
    
    setUsers(response.data);
  }

  async function findUsers() {
    const response = await api.get(`/users/user?first_name=${name}`);
    
    setUsers(response.data);
  }

  function handleUpdateUsers() {
    findUsers();
  }

  return (
    <>
      <div className="container">
        <main className="busca">
          <p>Busca</p>
          <div className="form-busca">
            <form onSubmit={handleFind}>
              <div className="input-block">
                <label htmlFor="first_name">Nome</label>
                <input 
                  name="first_name" 
                  id="first_name" 
                  required 
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <button className="btn-cancel" onClick={() => history.goBack()}>Cancelar</button>
                <button type="submit">Buscar</button>
              </div>
            </form>
          </div>
          <div className="results" id="results">
            <ul>
              {users.map(user => (
                <UserItem key={user.id} user={user} callback={handleUpdateUsers} />
              ))}
            </ul>

          </div>
        </main>
      </div>
    </>
  );
}

export default FindUser;
