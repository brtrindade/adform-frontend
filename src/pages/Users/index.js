import React, {useState, useEffect} from 'react';
import UserItem from '../../components/UserItem';

import api from '../../services/api';

import './styles.css';
import { Link } from 'react-router-dom';

function Main() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [])

  async function loadUsers() {
    const response = await api.get('/users');
    setUsers([...response.data]);
  }

  function handleUpdateUsers() {
    loadUsers();
    console.log('loadUsers')
  }

  return (
    <>
      <div className="container">
        <main>
          <p>Bem vindo ao painel de usuários</p>
          <ul>
            {users.map(user => (
              <UserItem key={user.id} user={user} callback={handleUpdateUsers} />
            ))}
          </ul>
          <Link to="/">
            <button className="btn-back">Voltar</button>
          </Link>
        </main>
      </div>
    </>
  );
}

export default Main;
