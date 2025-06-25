import UserHome from "./page/user/home";
import Infor_Boat from "./page/user/infor_boat";
import Search from "./page/user/search/search";
import Staff from "./page/admin/Staff";
import Customer from "./page/admin/Customer";
import AdminHome from "./page/admin/adHome";
import Boat from "./page/admin/Boat/Boat";
import Room from "./page/admin/Room/Room";
import Owner from "./page/admin/Owner";
import Location from "./page/admin/Location";
import Account from "./page/admin/Account";
import IntroduceBoat from "./page/admin/IntroduceBoat";
import Login from "./page/login/login";
import Trip from "./page/admin/Trip";
import Booking from "./page/admin/Booking";
import Email from "./page/user/email";
export const routeUser = [
  { path: "/user/home", Component: UserHome },
  { path: "/user/infor/:id", Component: Infor_Boat },
  { path: "/user/search", Component: Search },
  { path: "/user/email", Component: Email },
];

export const routeAd = [
  {path:"/admin",Component:AdminHome},
  { path: "/admin/staff", Component: Staff },
  {path:"/admin/customer",Component:Customer},
  {path:"/admin/boat",Component:Boat},
  {path:"/admin/room",Component:Room},
  {path:"/admin/owner",Component:Owner},
  {path:"/admin/location",Component:Location},
  {path:"/admin/account",Component:Account},
  {path:"/admin/introduceBoat",Component:IntroduceBoat},
  {path:"/admin/trip",Component:Trip},
  {path:"/admin/booking",Component:Booking},
];
export const routeLogin = [
  {path:"/",Component:Login},
]
