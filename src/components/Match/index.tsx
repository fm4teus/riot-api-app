import React from 'react'
import api from '../../services/api'
import './styles.css'

export interface MatchProps{
    championCode?: String, 
    championName: String
}

export const Match: React.FC<MatchProps> = ({championName})=>{
    
    return(
        <div className="match">
            <p> { championName } </p>
        </div>
    )
}
