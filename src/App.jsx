import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MineralList from './components/MineralList';
import MineralDetail from './components/MineralDetail';
import MineralForm from './components/MineralForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Container fluid className="mineral-app p-0 vh-100">
        <header className="app-header bg-primary text-white py-0.75 mb-0">
          <Container>
            <h1 className="text-center fs-5">PEDROLOS</h1>
          </Container>
        </header>
        <Routes>
          <Route path="/" element={<MineralList />} />
          <Route path="/add" element={<MineralForm />} />
          <Route path="/edit/:id" element={<MineralForm />} />
          <Route path="/view/:id" element={<MineralDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
