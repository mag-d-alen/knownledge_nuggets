
import { HomePage } from './pages/HomePage';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';

import '../styles/main.scss';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { DarkModeProvider } from './providers/DarkModeProvider';
import { ThemeProvider } from './providers/ThemeProvider';
function App() {
  return (

    <ReactQueryProvider>
      <DarkModeProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/error' element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </DarkModeProvider>
    </ReactQueryProvider >

  );
}

export default App;
