import { useEffect, useState } from 'react'
import './App.css'
import Element from './components/Element'
import confetti from 'canvas-confetti'

export interface Winner{
  position:number
  orientation:string;
}


const INITIAL_VALUES: Array<Array<string | null>> = [[null, null, null], [null, null, null], [null, null, null]];

function App() {
  const [answers, setAnswers] = useState<Array<Array<string | null>>>(()=>{
    const localAnswers=localStorage.getItem('answers');
    if(localAnswers){
      return JSON.parse(localAnswers);
    }
    return structuredClone(INITIAL_VALUES);
  });

  const [player, setPlayer] = useState<boolean>(()=>{
   const localPlayer=localStorage.getItem('player');
   if(localPlayer){
    return JSON.parse(localPlayer);
   }
   return true;
  });
  const [winner, setWinner] = useState<Winner|null>(null);
 useEffect(()=>{
  localStorage.setItem('answers',JSON.stringify(answers));
  localStorage.setItem('player',JSON.stringify(player));
 },[answers, player]);

 

  const getWinner = (c_index: number, r_index: number) => {
    const val = player ? 'X' : 'O';
    let row = 0;
    let col = 0;
    let d1 = 0;
    let d2 = 0;
    let j = 2;
    for (let i = 0; i < 3; i++) {
      if (answers[r_index][i] == val) row++;
      if (answers[i][c_index] == val) col++;
      if (r_index == c_index) {
        if (answers[i][i] == val) d1++;
      }
      if (r_index == 2 && c_index == 0 || r_index == 0 && c_index == 2 || r_index == 1 && c_index == 1) {
        if (answers[i][j] == val) d2++;
        j--;
      }
    }
    if(row == 3) return "row";
    if(col==3) return "col";
    if(d1==3) return "d1";
    if(d2==3) return "d2";   
  }

  const changeValue = (c_index: number, r_index: number) => {
   
    if (winner==null) {
      if (answers[r_index][c_index] == null) {
        const newAnswers = [...answers];
        newAnswers[r_index][c_index] = player ? 'X' : 'O';
        setAnswers(newAnswers);
        setPlayer(!player);
        const w = getWinner(c_index, r_index)
        if (w!=null) {
          let pos=0;
          if(w=="row"){
            pos=r_index;
          }
          else if(w=="col"){
            pos=c_index;
          }
          else if(w=="d1"){
            pos=r_index;
          }
          else if(w=="d2"){
            pos=c_index;
          }
          setWinner({orientation:w, position: pos});   
          confetti()     
        }
        
      }
    }
  }

  const reset=()=>{   
    setAnswers(structuredClone(INITIAL_VALUES));
    setPlayer(true);
    setWinner(null);
    
  }

  return (
    <main>
      <h1>Tic Tac Toe</h1>
      {(!winner)&&<p>Player {player?"Uno":"Dos"}</p>}
      
      <div className='table'>
        {answers.map((row, r_index) =>
          row.map((e, c_index) =>
            <Element key={c_index} info={e} r_index={r_index} c_index={c_index} changeValue={changeValue} style={winner}/>)
        )
        }
      </div>
      <button onClick={reset}>Reset Game</button>
      {(winner) && <div className='winner'>        
        <p>Congratulations for player {!player?"Uno":"Dos"}</p>
      </div>
    }
    </main>
  )
}

export default App
