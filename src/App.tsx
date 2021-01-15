import React, { useState, useEffect, FormEvent } from 'react';
import Input from '../src/components/Input';
//import MatchList from './components/MatchList';
import {Match, MatchProps} from './components/Match'
import api from './services/api';
import './App.css';

interface MatchChampionProps{
  id: String,
  name: String,
  title: String
}

function App() {
  const [summoner, setSummoner] = useState("Digite aqui");
  const [level, setLevel] = useState("");
  const [hello, setHello] = useState("");
  const [masteryScore, setMasteryScore] = useState("");
  const [matchList, setMatchList] = useState<MatchProps[]>([]);
  const [matchChampionList, setMatchChampionList] = useState<MatchChampionProps[]>([]);

  async function searchSummoner(event?: FormEvent){
    if(event){
      event.preventDefault();
    }

    try{
      const response = await api.get(`/${summoner}`)
      setHello(`Olá ${summoner},`);
      setLevel(`Nível: ${response.data.summonerLevel}`)
      setMasteryScore(`Pontuação de maestria: ${response.data.masteryScore}`);
      setMatchList(response.data.matchList);
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
      <h2>{hello}</h2>
      <header>
        <h3>{level}</h3>
        <h3>{masteryScore}</h3>
      </header>
      { matchList.map(((match: any) => {
        console.log(match)
        return <Match 
          championName={match.championName} 
          championId={match.championId} 
          gameMode={match.gameMode}
          win={match.win}
        />
      }))}
    </div>
  );
}

export default App;
