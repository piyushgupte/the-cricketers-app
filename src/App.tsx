
import { useState } from 'react';
import { ThemeContext } from './contexts/theme-context';
import Layout from './components/layout';


import getPlayers from './server/get-players';
import { TPlayer } from './server/types';

import './App.scss';


function App() {



  // const getPlayersFromData =  async () => { 
  //   const players: TPlayer[] = await getPlayers();
  //       return players;
  //     }



const getDefaultTheme = (): string => {
  const localStorageTheme = localStorage.getItem('default-theme');
  const browserDefault = 'light';
  return localStorageTheme || browserDefault;
};

const [theme, setTheme] = useState(getDefaultTheme());

return (
  <ThemeContext.Provider value={{ theme, setTheme }}>
    <div className={`theme-${theme}`}>
      <Layout>
        <div className="content-wrapper">
        </div>
      </Layout>
    </div>
  </ThemeContext.Provider>
);


  
}

export default App
