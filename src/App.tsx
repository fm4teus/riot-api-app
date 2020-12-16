import React, { useState, useEffect, FormEvent } from 'react';
import Input from '../src/components/Input';
import api from './services/api';
import './App.css';


function App() {
  const [summoner, setSummoner] = useState("Digite aqui");
  const [level, setLevel] = useState("");

  async function searchSummoner(event?: FormEvent){
    if(event){
      event.preventDefault();
    }
    console.log("response");

    const response = await api.get(`/${summoner}`);
    setLevel(`Olá ${summoner}, você é nível ${response.data.summonerLevel}!`);
    console.log(response.data.summonerLevel);
  }

  return (
    <div className="App">
      <form onSubmit={searchSummoner}>
        <Input name="busca" label={summoner} onChange={event=>{setSummoner(event.target.value)}} />
        <button type="submit">Buscar</button>
      </form>
      <h3>{level}</h3>
    </div>
  );
}

export default App;
