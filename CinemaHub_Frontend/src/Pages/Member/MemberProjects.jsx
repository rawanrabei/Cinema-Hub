import { Outlet } from "react-router-dom";
import PageShell from "../../Components/Common/PageShell";

export default function MemberProjects() {
  return (
    <PageShell title="My Projects">
      <Outlet />
    </PageShell>
  );
}
