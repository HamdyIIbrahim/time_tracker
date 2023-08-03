import { NavLink, Outlet } from "react-router-dom";

const GardRoute = () => {
  const isLoggedIn = localStorage.getItem("isAuth");
  console.log(isLoggedIn)
  if (isLoggedIn !== "true") {
    return (
      <div className="flex min-h-screen flex-col gap-5 items-center justify-center p-10">
        <h1 className="text-red-700 font-bold text-xl">Unauthorized :</h1>
        <span>
          <NavLink to="/admin"><span className="text-blue-700 font-bold text-lg underline">Login</span></NavLink> to gain access
        </span>
      </div>
    );
  }
  return <Outlet />;
};

export default GardRoute;
