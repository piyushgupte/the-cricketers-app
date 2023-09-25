
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import getPlayers from './server/get-players';
import { TPlayer } from './server/types';

 function App() {
  

 
  const getPlayersFromData =  async () => { 
    const players: TPlayer[] = await getPlayers();
        return players;
      }


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() =>{ 
         console.log(getPlayersFromData())
          }}>
         List of players are in the logs
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
