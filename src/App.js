import "./App.css";
// import des librairies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import des composants
import Header from "./components/Header/Header";

// import des pages
import Home from "./pages/Home/Home";
import Comics from "./pages/Comics/Comics";
import Characters from "./pages/Characters/Characters";
import CharacterId from "./pages/CharacterId/CharacterId";
import ComicCharacterId from "./pages/ComicCharacterId/ComicCharacterId";
import Favorites from "./pages/Favorites/Favorites";

// import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faHeartCrack);

function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* React router */}
        <Routes>
          <Route path="/" element={<Comics />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics/:characterId" element={<ComicCharacterId />} />
          <Route
            path="/ComicCharacterId/:ComicCharacterId"
            element={<ComicCharacterId />}
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
