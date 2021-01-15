import React from 'react'
import api from '../../services/api'
import './styles.css'

export interface MatchProps{
    championCode?: String, 
    championName: String,
    championId: String,
    gameMode: String,
    win: Boolean
}

export const Match: React.FC<MatchProps> = ({championName, gameMode, championId, win})=>{
    
    return(
        <div className={win?"match-victory":"match-defeat"}>
            <div className="icon">
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${championId}.png`} alt="" />
                <h4>{ championName }</h4> 
            </div>
            <div className="info">
                <h3>Modo de jogo: { gameMode }</h3>
                {win?"Vitória":"Derrota"} 
            </div>
        </div>
    )
}
