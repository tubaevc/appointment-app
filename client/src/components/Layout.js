import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const userMenu = [
    { name: "Randevu Al", path: "/booking" },
    { name: "Randevularım", path: "/appointments" },
    { name: "Çıkış", path: "/logout" },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };
  return (
    <div className="main  p-5">
      <div className="layout ">
        <div className="sidebar w-full mr-5  bg-blue-900 rounded-md text-black">
          <div className="menu flex justify-evenly items-center text-lg ">
            {userMenu.map((menu, index) => (
              <div key={index} className="m-4 text-white font-semibold ml-5">
                {menu.name === "Çıkış" ? (
                  <button onClick={handleLogout}>{menu.name}</button>
                ) : (
                  <Link to={menu.path}>{menu.name}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="content w-full h-full mt-4">
          <div className="body bg-white  border-2 border-solid  rounded-md h-[650px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
