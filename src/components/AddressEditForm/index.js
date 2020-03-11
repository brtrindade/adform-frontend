import React, {useState, useEffect } from 'react';

import api from '../../services/api';
import viacep from '../../services/viacep';
import {mzip} from '../../util/inputMasks';

import './styles.css';

function AddressEditForm({address, onSubmit, onCancel}) {
  const [addressTypes, setAddressTypes] = useState([]);
  const [addressType, setAddressType] = useState(address.type_id);
  const [zipcode, setZipcode] = useState(address.zipcode);
  const [street, setStreet] = useState(address.street);
  const [number, setNumber] = useState(address.number);
  const [complement, setComplement] = useState(address.complement);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [spanZipcodeError, setSpanZipcodeError] = useState(false);
  
  useEffect(() => {
    async function getAddressTypes() {
      const response = await api.get('address/types');
      setAddressTypes(response.data);
    }
    getAddressTypes();
  }, [address])

  async function handleSubmit(e) {
    e.preventDefault();
    if(!addressType) {
      return;
    }
    await onSubmit({
      zipcode,
      street,
      number,
      complement,
      city,
      state,
      type_id: addressType,
    });
  }

  function handleCancel() {
    onCancel();
  }

  function handleMaskZipcode(v) {
    const maskedZipcode = mzip(v);
    
    if(v.length === 9) {
      const zip = v.replace('-','');
      requestAddressFromZipcode(zip)
    }
    setZipcode(maskedZipcode);
  }

  async function requestAddressFromZipcode(zipcode) {
    const response = await viacep.get(`${zipcode}/json`);
    
    const {erro, logradouro, localidade, uf} = response.data;
    if(!erro) {
      setStreet(logradouro);
      setCity(localidade);
      setState(uf);
      setSpanZipcodeError(false);
    } else {
      setSpanZipcodeError(true);
    }
  };

  if(!address) {
    return null
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="type_id">Tipo</label>
        <select required id='type_id' name='type_id' value={addressType} onChange={e => setAddressType(e.target.value)} >
          <option value="">Selecione</option>
          {addressTypes.map(type => (
            <option key={type.id} value={type.id}>{type.description}</option>
          ))}
        </select>
      </div>

      <div className="input-block">
        <label htmlFor="zipcode">Cep</label>
        <input
          className={spanZipcodeError ? "error" : ""} 
          name="zipcode" 
          id="zipcode" 
          required 
          value={zipcode}
          maxLength={9}
          onChange={e => handleMaskZipcode(e.target.value)}
        />
      {spanZipcodeError && (<span>cep inválido</span>)}
      </div>

      <div className="input-block">
        <label htmlFor="street">Logradouro</label>
        <input 
          name="street" 
          id="street" 
          required
          disabled 
          value={street}
          onChange={e => setStreet(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="number">Número</label>
          <input 
            type="number"
            name="number" 
            id="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="complement">Complemento</label>
          <input 
            name="complement" 
            id="complement"
            value={complement} 
            onChange={e => setComplement(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="city">Cidade</label>
          <input 
            name="city" 
            id="city" 
            required 
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="state">UF</label>
          <input 
            className="input-uf"
            name="state" 
            id="state" 
            required
            value={state} 
            onChange={e => setState(e.target.value)}
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

export default AddressEditForm;
