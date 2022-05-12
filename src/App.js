import "./App.css";

// import des librairies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import des composants
import Header from "./components/Header/Header";

// import des pages
import Home from "./pages/Home/Home";
import Characters from "./pages/Characters/Characters";
import CharacterId from "./pages/CharacterId/CharacterId";
import Comics from "./pages/Comics/Comics";
import ComicCharacterId from "./pages/ComicCharacterId/ComicCharacterId";

function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* React router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/Characters" element={<Characters />} />
          <Route path="/Character/:CharacterId" element={<CharacterId />} />
          <Route
            path="/ComicCharacterId/:ComicCharacterId"
            element={<ComicCharacterId />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
