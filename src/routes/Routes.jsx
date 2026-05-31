import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllContests from "../pages/AllContests/AllContests";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyParticipated from "../pages/Dashboard/user/MyParticipated";
import MyWinnings from "../pages/Dashboard/user/MyWinnings";
import MyProfile from "../pages/Dashboard/user/MyProfile";
import AddContest from "../pages/Dashboard/creator/AddContest";
import MyContests from "../pages/Dashboard/creator/MyContests";
import SubmittedTasks from "../pages/Dashboard/creator/SubmittedTasks";
import EditContest from "../pages/Dashboard/creator/EditContest";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import ManageContests from "../pages/Dashboard/admin/ManageContests";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoutes";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Contact from "../pages/Contact/Contact";
import Impact from "../pages/Impact/Impact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "all-contests",
        element: (
          <PrivateRoute>
            <AllContests />
          </PrivateRoute>
        ),
      },
      {
        path: "contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails></ContestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          // user
          { path: "my-participated", element: <MyParticipated /> },
          { path: "my-winnings", element: <MyWinnings /> },
          { path: "my-profile", element: <MyProfile /> },
          // creator
          { path: "add-contest", element: <AddContest /> },
          { path: "my-contests", element: <MyContests /> },
          { path: "submitted-tasks", element: <SubmittedTasks /> },
          { path: "edit-contest/:id", element: <EditContest /> },
          // admin
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-contests", element: <ManageContests /> },
        ],
      },
      {
        path: "payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "contact", element: <Contact /> },
      { path: "impact", element: <Impact /> },
    ],
  },
]);

export default router;
