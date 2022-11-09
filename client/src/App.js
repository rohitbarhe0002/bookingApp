import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import List from './pages/List/List';
import Hotel from './pages/Hotel/Hotel';
import Login from './pages/Login/Login';
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Login/>}/>
  <Route path="/home" element={<Home/>}/>
  <Route path="/hotels" element={<List/>}/>
  <Route path="/hotels/:id" element={<Hotel/>}/>
 </Routes>
</BrowserRouter>
  );
}

export default App;
