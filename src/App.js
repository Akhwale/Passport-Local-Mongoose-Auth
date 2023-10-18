import { BrowserRouter,Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import RegisterPage from './Components/RegisterPage';
import ProtectedPage from './Components/ProtectedPage';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/protected" element={<ProtectedPage/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
