import { useState } from "react";
import style from "./ForecastCard.module.scss";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import localeData from "dayjs/plugin/localeData";
// import localeData from 'dayjs/plugin/localeData' // ES 2015

dayjs.extend(localeData);
dayjs.extend(isoWeek);

const WEEK_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

type Props = {
  forecast: any;
};

function ForecastCard({ forecast }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  //   console.log(forecast);
  return (
    <div className={style.card} onClick={() => setIsExpanded(!isExpanded)}>
      <div className={style.header}>
        {/* Icon */}
        <img
          className={style.icon}
          src={forecast.day.condition.icon}
          alt={forecast.day.condition.text}
        />

        {/* Card title */}
        <p className={style.title}>
          {WEEK_NAMES[dayjs(forecast.date).isoWeekday()]}
          {". "}
          {dayjs(forecast.date).format("DD/MM")}
        </p>

        <span>{isExpanded ? "🔼" : "🔽"}</span>
      </div>

      {/* Card body */}
      {isExpanded && (
        <div className={style.body}>{forecast.day.condition.text}</div>
      )}
    </div>
  );
}

export default ForecastCard;
