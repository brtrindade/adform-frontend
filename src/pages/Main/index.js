import React from 'react';
import {Link} from 'react-router-dom';

import './styles.css';

function Main() {


  return (
    <>
      <div className="container">
        <main>
          <p>Bem vindo ao painel de usuários</p>
          <p>O que gostaria fazer?</p>
          <ul className="index-list">
            <li>
              <Link to={'/users'}>
                <button className="main-btn">Listar Usuários</button>
              </Link>
            </li>
            <li>
              <Link to={'/users/find'}>
                <button className="main-btn">Buscar Usuário</button>
              </Link>
            </li>
            <li>
              <Link to={'/users/new'}>
                <button className="main-btn">Novo Usuário</button>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}

export default Main;
