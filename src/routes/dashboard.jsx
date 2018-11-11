// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";

import DashboardPage from "modules/views/Dashboard/Dashboard.jsx";
import Status from "modules/views/Status/Status.jsx";
import Reports from "modules/views/Reports/Reports.jsx";
import Typography from "modules/views/Typography/Typography.jsx";
import Icons from "modules/views/Icons/Icons.jsx";
import Maps from "modules/views/Maps/Maps.jsx";
import NotificationsPage from "modules/views/Notifications/Notifications.jsx";
import StatusDetail from "modules/views/StatusDetail/StatusDetail.jsx";

const dashboardRoutes = [
  {
    path: "/overview",
    sidebarName: "Overview",
    navbarName: "Overview",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/status",
    sidebarName: "Status",
    navbarName: "Status",
    icon: Person,
    component: Status
  },
  {
    path: "/discover",
    sidebarName: "Discover",
    navbarName: "Reports",
    icon: "content_paste",
    component: Reports
  },
  {
    path: "/status-detail/:id",
    sidebarName: "",
    navbarName: "",
    icon: null,
    component: StatusDetail
  },
  { redirect: true, path: "/", to: "/status", navbarName: "Redirect" }
];

export default dashboardRoutes;
