import Home from "../../component/Home";
import Profile from "../../component/Profile";
import Booking from "../../component/Booking";
const PrivateRouting = [
  {
    path: "/home",
    Component: Home,
    exact: true,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/booking",
    Component: Booking,
  },
];

export default PrivateRouting;
