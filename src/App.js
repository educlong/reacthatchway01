import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Routers from './models/Routers';
/**
 * @date Jan 07, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */

function App() {
  return (
    <div className="App">
      <div className="d-flex flex-column h-100">
        <main className="flex-shrink-0">
          <Router>
            <Navigation/>
            <Routers/>
          </Router>
        </main>
        <Footer/>
      </div> 
    </div>
  );
}

export default App;
