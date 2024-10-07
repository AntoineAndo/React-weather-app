import "./App.scss";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import ForecastList from "./components/ForecastList/ForecastList";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="layout">
      {/* Header */}
      <Header />
      {/* Main */}
      <main
        style={{
          // Todo
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <CurrentWeather />
        <ForecastList />
      </main>
    </div>
  );
}

export default App;
