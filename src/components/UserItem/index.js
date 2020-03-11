import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

function UserItem({user, callback}) {
  const [show, setShow] = useState(false)
  const history = useHistory();

  async function handleExclude(user) {
    await api.delete(`/users/${user.id}`);
    callback();
  }

  return(
    <li className="user-item" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}> 
      <header>
        {show && (<button className="exclude" onClick={() => handleExclude(user)}>X</button>) }
        <div onClick={() => history.push(`/users/${user.id}/edit`)} className="user-info">
          <strong>{user.first_name} {user.last_name}</strong>
          <span>{user.cellphone}</span>
        </div>
      </header>
    </li>
  )
}

export default UserItem;
