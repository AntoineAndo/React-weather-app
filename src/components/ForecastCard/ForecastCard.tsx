import { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.extend(isoWeek);

const WEEK_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

type Props = {
  forecast: any;
  isLoading: Boolean;
  error: string | null;
};

function ForecastCard({ forecast, isLoading, error }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    if (isLoading || error) return;
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      // className="border-solid border-2 border-[color:--text-primary] rounded-xl"
      className="bg-[color:--background-2] rounded-xl"
      onClick={toggleCard}
    >
      {isLoading ? (
        // Loader
        <div className="min-h-20 bg-loader bg-loaderSize opacity-50 animate-load"></div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center gap-3 w-full min-h-20 p-3 cursor-pointer">
            {!error && (
              <>
                {/* Icon */}
                <img
                  className="h-8 w-8"
                  src={forecast.day.condition.icon}
                  alt={forecast.day.condition.text}
                />

                {/* Card title */}
                <p className="flex flex-1 text-lg">
                  {WEEK_NAMES[dayjs(forecast.date).day()]}
                  {". "}
                  {dayjs(forecast.date).format("DD/MM")}
                </p>

                <span>{isExpanded ? "🔼" : "🔽"}</span>
              </>
            )}
          </div>

          {/* Card body */}
          {isExpanded && (
            <div className="p-3">{forecast.day.condition.text}</div>
          )}
        </>
      )}
    </div>
  );
}

export default ForecastCard;
