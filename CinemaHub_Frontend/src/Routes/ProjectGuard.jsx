import { Navigate } from "react-router-dom";

const ProjectGuard = () => {
  return <Navigate to="/manager" replace />;
};
export default ProjectGuard;