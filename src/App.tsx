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
  const [masteryScore, setMasteryScore] = useState("");
  const [matchList, setMatchList] = useState<MatchProps[]>([]);
  const [matchChampionList, setMatchChampionList] = useState<MatchChampionProps[]>([]);

  async function searchSummoner(event?: FormEvent){
    if(event){
      event.preventDefault();
    }

    try{
      const response = await api.get(`/${summoner}`)
      setLevel(`Olá ${summoner}, você é nível ${response.data.summonerLevel}!`);
      setMasteryScore(`Pontuação de maestria: ${response.data.masteryScore}!`);
      setMatchList(response.data.matchList);
      console.log("TIPO MATCHLIST")
      console.log(typeof(response.data.matchList));
      console.log(response.data.matchList[0]);
      console.log(response.data.matchList[1]);
      console.log(response.data.matchList[2]);
      console.log(response.data.matchList[1]);

      for( const match in response.data.matchList){
          const responseMatch = await api.get(`/champions/${response.data.matchList[match].championCode}`)
      }
      /*
      const championList = await response.data.matchList.map(async (match:MatchProps)=>{
        const responseMatch = await api.get(`/champions/${match.championCode}`)
        return{
          championCode: match.championCode,
          id: responseMatch.data.id,
          title: responseMatch.data.title
        }
      })
      (async () => {
        const resultado: MatchChampionProps[] = await Promise.all(championList);
        console.log(resultado);
        setMatchChampionList(resultado);
      })();
      */

      console.log(matchChampionList)
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
      { matchList.map(((match: any) => {
        console.log(match)
        return <Match championName={match.championName} />
      }))}
    </div>
  );
}

export default App;
