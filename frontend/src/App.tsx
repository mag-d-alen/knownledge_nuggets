import { useSelector } from 'react-redux';

import { HomePage } from './pages/HomePage';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import type { RootState } from './app/store';
import { ErrorPage } from './pages/ErrorPage';
import '../styles/main.scss';
function App() {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  return (
    <div className={darkMode ? 'darkMode' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/error' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
