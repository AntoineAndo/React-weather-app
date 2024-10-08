import { useSettings } from "../../providers/SettingsProvider";

type Props = {};

function ThemeToggle({}: Props) {
  const { theme, toggleTheme } = useSettings();

  return (
    <button
      className="cursor-pointer border-solid border-2 border-collapse border-[color:--text-primary] w-10 h-10 text-base rounded-full md:w-16 md:h-16"
      onClick={toggleTheme}
    >
      {theme == "dark" ? "🌞" : "🌜"}
    </button>
  );
}

export default ThemeToggle;
