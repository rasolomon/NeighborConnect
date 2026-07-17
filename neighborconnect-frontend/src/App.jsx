import Users from "./components/Users";
import MainLayout from "./layouts/MainLayout";

import "./styles/layout.css";

function App() {
  // Used to run <Users /> as the root JSX but not now...
  return (
    <div className="app">
      <h1>NeighborConnect</h1>
        <MainLayout  />
    </div>
  );
}

export default App;