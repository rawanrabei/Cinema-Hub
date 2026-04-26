import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ProtectedRoute from "./Routes/ProtectedRoute";
import ProjectGuard from "./Routes/ProjectGuard";
import PublicLayout from "./Layouts/PublicLayout";

const Intro = lazy(() => import("./Pages/Intro/Intro"));
const CinemaHome = lazy(() => import("./Pages/MainContent/MainContent"));

const Login = lazy(() => import("./Pages/Auth/Login/Login.jsx"));
const SignUp = lazy(() => import("./Pages/Auth/SignUp/SignUp.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound.jsx"));
const Notifications = lazy(() => import("./Pages/Notifications"));
const Settings = lazy(() => import("./Pages/Settings"));
const LoadingPage = lazy(() => import("./Pages/LoadingPage/LoadingPage"));

const Movies = lazy(() => import("./Pages/Movies/Movies"));
const MovieDetails = lazy(() => import("./Components/Movies/MovieDetails"));
const Cinemas = lazy(() => import("./Pages/Cinemas/Cinemas"));
const Snacks = lazy(() => import("./Pages/Snacks/Snacks"));
const Offers = lazy(() => import("./Pages/Offers/Offers"));
const AboutUs = lazy(() => import("./Pages/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs"));
const Booking = lazy(() => import("./Pages/Booking/Booking"));
const NotFoundPage = lazy(() => import("./Pages/NotFound/NotFound"));
const UserProfile = lazy(() => import("./Pages/UserProfile/UserProfile"));

const Payment = lazy(() => import("./Pages/Payment/Payment"));
const Confirmation = lazy(() => import("./Pages/Confirmation/Confirmation"));

const DashboardLayout = lazy(() => import("./Layouts/DashboardLayout"));
const AdminLayout = lazy(() => import("./Layouts/AdminLayout"));
const ManagerLayout = lazy(() => import("./Layouts/ManagerLayout"));
const MemberLayout = lazy(() => import("./Layouts/MemberLayout"));

const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));

const ManagerDashboard = lazy(() => import("./Pages/Manager/ManagerDashboard"));

const MemberDashboard = lazy(() => import("./Pages/Member/MemberDashboard"));
const ViewRequests = lazy(() => import("./Pages/Member/ViewRequests"));
const MemberSettings = lazy(() => import("./Pages/Member/MemberSettings"));
const MemberProjects = lazy(() => import("./Pages/Member/MemberProjects"));
const MemberTaskDetails = lazy(
  () => import("./Pages/Member/MemberTaskDetails"),
);
import { User } from "lucide-react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<CinemaHome />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/cinemas" element={<Cinemas />} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Route>
        {/* --------------------------- Admin ---------------------------------  */}
        {/* Admin Section */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
        {/* -------------------------- Manager --------------------------------- */}
        <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/manager">
              <Route index element={<ManagerDashboard />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
        {/* ------------------------- Member--------------------------------- */}
        <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
          <Route path="/user" element={<UserProfile />}>
            <Route index element={<MemberDashboard />} />
            <Route path="requests" element={<ViewRequests />} />
            <Route path="projects" element={<MemberProjects />}>
              {/* <Route path=":projectId" element={<ManageProject />}>
                <Route path="tasks/:taskId" element={<MemberTaskDetails />} />
              </Route> */}
            </Route>
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<MemberSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
