import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.sass';
import Home from './components/Home.jsx';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
