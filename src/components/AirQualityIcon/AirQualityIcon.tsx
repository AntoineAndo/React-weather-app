type Props = {
  value: number;
};

function AirQualityIcon({ value }: Props) {
  return (
    <div className="text-xl">
      {value <= 3 && "😊"}
      {value >= 4 && value <= 6 && "😐"}
      {value >= 7 && value <= 9 && "😷"}
      {value == 10 && "☠️"}
    </div>
  );
}

export default AirQualityIcon;
