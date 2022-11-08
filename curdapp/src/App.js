import Table from './Components/Table';
import Navbar from './Components/Navbar';
import AddProduct from './Components/addpro';
import Error from './Components/Error';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <hr />
        <div className="content">
          <Routes>
          <Route exact path="/" element={<Table/>} />
          <Route exact path="/create" element={<AddProduct />} />
          <Route exact path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
