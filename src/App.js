import React from 'react';
import './App.css';
import Pesquisa from './Components/Pesquisa';


function App() {

  return (
    <div className='container'>
      <h1 className='h1'>
        Consulta Extrato Bancário
      </h1>
      <Pesquisa/>
    </div>
  );
}

export default App;
