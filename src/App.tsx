import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import ForecastList from "./components/ForecastList/ForecastList";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="layout">
      {/* Header */}
      <Header />
      {/* Main */}
      <main className="flex flex-col gap-2 p-3">
        <CurrentWeather />
        <ForecastList />
      </main>
    </div>
  );
}

export default App;
