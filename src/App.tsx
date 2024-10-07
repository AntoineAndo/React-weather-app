import "./App.scss";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="layout">
      {/* Header */}
      <Header />
      {/* Main */}
      <main>
        <CurrentWeather />
      </main>
    </div>
  );
}

export default App;
