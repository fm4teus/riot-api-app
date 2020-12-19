import React, { useState, useEffect, FormEvent } from 'react';
import Input from '../src/components/Input';
import api from './services/api';
import './App.css';


function App() {
  const [summoner, setSummoner] = useState("Digite aqui");
  const [level, setLevel] = useState("");
  const [masteryScore, setMasteryScore] = useState("");

  async function searchSummoner(event?: FormEvent){
    if(event){
      event.preventDefault();
    }
    console.log("response");

    try{
      const response = await api.get(`/${summoner}`)
      setLevel(`Olá ${summoner}, você é nível ${response.data.summonerLevel}!`);
      setMasteryScore(`Pontuação de maestria: ${response.data.masteryScore}!`);
      console.log(response.data);
    }catch(error){
      return console.log(error);
    } 
  }

  return (
    <div className="App">
      <form onSubmit={searchSummoner} id="searchBox">
        <Input name="busca" 
          label="Busque pelo seu nome de invocador" 
          onChange={event=>{setSummoner(event.target.value)}} 
        />
        <button type="submit">Buscar🔎</button>
      </form>
      <h3>{level}</h3>
      <h3>{masteryScore}</h3>
    </div>
  );
}

export default App;
