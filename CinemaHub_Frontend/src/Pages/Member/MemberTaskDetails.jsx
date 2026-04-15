import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function MemberTaskDetails() {
  const { taskId } = useParams();
  const { isDarkMode } = useTheme();

  return (
    <div className={`p-4 border-t ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
      <p>Task: {taskId}</p>
    </div>
  );
}
