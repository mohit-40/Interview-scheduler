import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Home } from './Page/Home/Home';
import { Form } from './Page/Form/Form';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} /> */
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/form/:meetingId" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
