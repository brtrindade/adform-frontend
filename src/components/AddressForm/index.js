import React from 'react';
import viacep from '../../services/viacep';
import {mzip} from '../../util/inputMasks';

import './styles.css'

function AddressForm({addresses, setAddresses, addressTypes}) {
  const addressFields = {
    type_id: '',
    zipcode: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    spanZipcodeError: false
  }

  function handleAddAddressFields() {
    setAddresses([...addresses, addressFields])
  }

  function handleExcludeAddress(e, i) {
    e.preventDefault();
    const values = [...addresses];
    values.splice(i, 1);
    setAddresses(values);
  }

  async function handleInputChange(event, index) {
    const values = [...addresses];
    const field = event.target.name;
    const value = event.target.value;

    if(field === 'zipcode'){
      values[index].zipcode = mzip(value);
      if (value.length === 9) {
        const zipcode = value.replace('-','');
        const {erro, logradouro, localidade, uf} = await requestAddressFromZipcode(zipcode);
        if(!erro) {
          values[index].street = logradouro;
          values[index].city = localidade;
          values[index].state = uf;
          values[index].spanZipcodeError = false;
        } else {
          values[index].spanZipcodeError = true;
        }
      }
    } else {
      values[index][field] = value;
    }

    setAddresses(values);
  };

  async function requestAddressFromZipcode(zipcode) {
    const response = await viacep.get(`${zipcode}/json`);
    
    return response.data;
  };

  return(
    <>
    {addresses.map((address, i) => (
      <div className="address-form" key={`${address}~${i}`}>
        <button className="exclude" onClick={e => handleExcludeAddress(e, i)}>X</button>
        <strong>Endereço {i+1}</strong>
        <div className="input-block">
          <label htmlFor="type_id">Tipo</label>
          <select required id='type_id' name='type_id' value={address.type_id} onChange={e => handleInputChange(e, i)} >
            <option value="">Selecione</option>
            {addressTypes.map(type => (
              <option key={type.id} value={type.id}>{type.description}</option>
            ))}
          </select>
        </div>

        <div className="input-block">
          <label htmlFor="zipcode">Cep</label>
          <input
            className={address.spanZipcodeError ? "error" : ""} 
            name="zipcode" 
            id="zipcode" 
            required 
            value={address.zipcode}
            maxLength={9}
            onChange={e => handleInputChange(e, i)}
          />
        {address.spanZipcodeError && (<span>cep inválido</span>)}
        </div>
        <div className="input-block">
          <label htmlFor="street">Logradouro</label>
          <input 
            name="street" 
            id="street" 
            required
            disabled 
            value={address.street}
            onChange={e => handleInputChange(e, i)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="number">Número</label>
            <input 
              type="number"
              name="number" 
              id="number"
              value={address.number}
              onChange={e => handleInputChange(e, i)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="complement">Complemento</label>
            <input 
              name="complement" 
              id="complement"
              value={address.complement} 
              onChange={e => handleInputChange(e, i)}
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
              value={address.city}
              onChange={e => handleInputChange(e, i)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="state">UF</label>
            <input 
              className="input-uf"
              name="state" 
              id="state" 
              required
              value={address.state} 
              onChange={e => handleInputChange(e, i)}
            />
          </div>
        </div>
      </div>
    ))}
    <div className="add-address">
      <input 
        type="button" 
        value="Adicionar Endereço" 
        onClick={handleAddAddressFields}
      />
    </div>
    {/*
    <div className="address-form">
      <strong>Endereço</strong>
      <div className="input-block">
        <label htmlFor="type_id">Tipo</label>
        <input 
          name="type_id" 
          id="type_id" 
          required 
          value={type_id}
          onChange={e => setTypeId(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="zipcode">Cep</label>
        <input 
          name="zipcode" 
          id="zipcode" 
          required 
          value={zipcode}
          onChange={e => handleZipcode(e.target.value)}
        />
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
      
      <div className="input-block">
        <label htmlFor="number">Número</label>
        <input 
          type="number"
          name="number" 
          id="number" 
          required 
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="complement">Complemento</label>
          <input 
            name="complement" 
            id="complement" 
            required value={complement} 
            onChange={e => setComplement(e.target.value)}
          />
        </div>
        
      </div>
      
      <input 
          type="button" 
          value="add New Address" 
          onClick={addAddress}
      />
    </div>
    */}
    </>
  )
}

export default AddressForm;
