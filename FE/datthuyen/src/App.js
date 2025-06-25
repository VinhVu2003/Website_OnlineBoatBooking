import logo from './logo.svg';
import './App.css';
import Header from './shared/user/header';
import Footer from './shared/user/footer';
import { routeAd, routeLogin, routeUser } from "./routers";
import Admin from "./shared/admin/index";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const isUser = location.pathname.includes("user");

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const Page = route.Component;
      return <Route key={index} path={route.path} element={<Page />} />;
    });
  };
  
  if (isAdmin) {
    return (
      <Admin>
        <Routes>{renderRoutes(routeAd)}</Routes>
        
      </Admin>
    );
  } 
  else if (isUser) {
    return (
      <>
      <Header />
      <Routes>{renderRoutes(routeUser)}</Routes>
      <Footer />
    </>
    );
  } 
  else {
    return (
      <Routes>{renderRoutes(routeLogin)}</Routes>
    );
  }
}

export default App;
