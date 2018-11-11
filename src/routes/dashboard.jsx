// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

import DashboardPage from "modules/views/Dashboard/Dashboard.jsx";
import Status from "modules/views/Status/Status.jsx";
import Reports from "modules/views/Reports/Reports.jsx";
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
