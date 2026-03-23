
import { HomePage } from './pages/HomePage';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import '../styles/main.scss';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { DarkModeProvider, useDarkMode } from './providers/DarkModeProvider';
function App() {
  const { darkMode } = useDarkMode();
  return (
    <ReactQueryProvider>
      <DarkModeProvider>
        <div className={darkMode ? 'darkMode' : ''}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/error' element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </DarkModeProvider>
    </ReactQueryProvider>
  );
}

export default App;
