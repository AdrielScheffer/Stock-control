import { Routes, Route, HashRouter} from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { ProductsPage } from './components/ProductsPage/ProductsPage';


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" exact element={<ProductsPage/>}/>
          
        </Routes>
      
      </div>
    </HashRouter>
  );
}

export default App;
