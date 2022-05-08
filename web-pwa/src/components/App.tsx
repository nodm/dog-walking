import { BrowserRouter, Route, Routes } from "react-router-dom";

import MenuAppBar from './MenuAppBar';
import LeafletMap from './LeafletMap';
import RouteRecorderMap from './RouteRecorderMap';
import WalkingMap from './WalkingMap';
import AppBottomNavigation from './AppBottomNavigation';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <MenuAppBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LeafletMap />} />
            <Route path="/route-recorder" element={<RouteRecorderMap />} />
            <Route path="/favorites" element={<WalkingMap />} />
          </Routes>
        </main>
        <footer>
          <AppBottomNavigation />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
