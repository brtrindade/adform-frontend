import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

function AddressItem({address, callback}) {
  const [show, setShow] = useState(false)
  const history = useHistory();

  async function handleExclude(address) {
    await api.delete(`/address/${address.id}`);
    callback();
  }

  return(
    <li className="address-item" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <header>
        {show && (<button className="exclude" onClick={() => handleExclude(address)}>X</button>) }
        <div onClick={() => history.push(`/address/${address.id}/edit`)} className="address-info">
          <strong>{address.street}, {address.number}</strong>
          <span>{address.zipcode}</span>
        </div>
      </header>
    </li>
  )
}

export default AddressItem;
