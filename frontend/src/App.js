import { Routes, Route, HashRouter} from 'react-router-dom';
import './App.css';

import { ProductsPage } from './components/ProductsPage/ProductsPage';


function App() {
  return (
    <HashRouter>
      <div className="App">
        
        <Routes>
          <Route path="/" exact element={<ProductsPage/>}/>
          
        </Routes>
      
      </div>
    </HashRouter>
  );
}

export default App;
