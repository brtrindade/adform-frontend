import React, {useState} from 'react';

import './styles.css'

import {mphone, mcpf} from '../../util/inputMasks';

function UserEditForm({user, onSubmit, onCancel}) {
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [cpf, setCpf] = useState(user.cpf);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [cellphone, setCellphone] = useState(user.cellphone);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      first_name,
      last_name,
      cpf,
      email,
      phone,
      cellphone,
    });
  }

  function handleCancel(e) {
    e.preventDefault();
    onCancel();
  }

  function handleMaskCpf(v) {
    const maskedCpf = mcpf(v);
    setCpf(maskedCpf);
  }

  function handleMaskPhone(v) {
    const maskedPhone = mphone(v);
    setPhone(maskedPhone);
  }

  function handleMaskCellphone(v) {
    const maskedCellphone = mphone(v);
    setCellphone(maskedCellphone);
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="first_name">Nome</label>
        <input 
          name="first_name" 
          id="first_name" 
          required 
          value={first_name}
          onChange={e => setFirstName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="last_name">Sobrenome</label>
        <input 
          name="last_name" 
          id="last_name" 
          required 
          value={last_name}
          onChange={e => setLastName(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="cpf">CPF</label>
        <input 
          name="cpf" 
          id="cpf" 
          required
          maxLength={14} 
          value={cpf}
          onChange={e => handleMaskCpf(e.target.value)}
        />
      </div>
      
      <div className="input-block">
        <label htmlFor="email">E-mail</label>
        <input 
          type="email"
          name="email" 
          id="email" 
          required 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="phone">Telefone Fixo</label>
          <input 
            type="tel"
            name="phone" 
            id="phone" 
            maxLength={14}
            required value={phone} 
            onChange={e => handleMaskPhone(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="cellphone">Celular</label>
          <input 
            type="tel" 
            name="cellphone" 
            id="cellphone" 
            required 
            maxLength={15}
            value={cellphone}
            onChange={e => handleMaskCellphone(e.target.value)} 
          />
        </div>
      </div>
      <div className="input-group">
        <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
        <button type="submit">Salvar</button>
      </div>
    </form>
  )
}

export default UserEditForm;
