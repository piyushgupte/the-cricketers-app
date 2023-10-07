
import { useState } from 'react';
import { ThemeContext } from './contexts/theme-context';
import Layout from './components/layout';

import { QueryClientProvider,QueryClient} from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import './App.scss';
import { PlayerTableContainer } from './components/player/player-table-container';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PlayerTableContainer/>,
  }
  
]);
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
        <RouterProvider router={router} />
        </div>
      </Layout>
    </div>
    </QueryClientProvider>
  </ThemeContext.Provider>
);


  
}

export default App
