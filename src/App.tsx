import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import ForecastList from "./components/ForecastList/ForecastList";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="layout h-full flex flex-col">
      {/* Header */}
      <Header />
      {/* Main */}
      <main className="flex flex-col gap-5 p-3 flex-1">
        <p className="text-2xl font-bold self-start">
          Aujourd'hui {new Date().toLocaleDateString("fr-FR")}
        </p>
        <div className="flex flex-col lg:flex-row gap-5">
          <CurrentWeather />
          <ForecastList />
        </div>
      </main>
    </div>
  );
}

export default App;
