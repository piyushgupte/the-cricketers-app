
import { useState } from 'react';
import { ThemeContext } from './contexts/theme-context';
import Layout from './components/layout';

import { QueryClientProvider,QueryClient} from 'react-query';

import './App.scss';
import { PlayersTable } from './components/layout/player/player-table';
import { PlayerTableContainer } from './components/layout/player/player-table-container';


function App() {

  const queryClient = new QueryClient()




const getDefaultTheme = (): string => {
  const localStorageTheme = localStorage.getItem('default-theme');
  const browserDefault = 'light';
  return localStorageTheme || browserDefault;
};



const [theme, setTheme] = useState(getDefaultTheme());

return (
  <ThemeContext.Provider value={{ theme, setTheme }}>
    <QueryClientProvider client={queryClient}>
    <div className={`theme-${theme}`}>
      <Layout>
        <div className="content-wrapper">
          <PlayerTableContainer/>
        </div>
      </Layout>
    </div>
    </QueryClientProvider>
  </ThemeContext.Provider>
);


  
}

export default App
