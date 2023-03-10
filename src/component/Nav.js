import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"

function Nav() {
  const [isNav, setIsNap] = useState(false)
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const data = JSON.parse(localStorage.getItem("user"));
  const dataInfo = JSON.parse(localStorage.getItem("info"));
  return (

    <div>
      <div className={isNav ? "icon-header-active" : "icon-header"} onClick={() => {
        setIsNap(!isNav)
      }}>
        <i>{isNav ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}</i>
      </div>
      <div className={isNav ? "nav-profile-active" : "nav-profile"}>
        <ul className="out">
          <div className="text">
            {/* <span className="log-out" onClick={handleLogout}>
            Đăng xuất
          </span> */}
            <li style={{ marginRight: "10px" }}>Xin chào:</li>
            <li>{dataInfo ? dataInfo.fullName : data.userName}</li>
          </div>
        </ul>
        <ul style={{ justifyContent: "flex-end" }}>
          <li >
            <NavLink style={{ color: "#000" }} to="/home">
              {" "}
              Đặt sân
            </NavLink>
          </li>
          <li >
            <NavLink style={{ color: "#000" }} to="/profile">
              {" "}
              Thông tin
            </NavLink>
          </li>
          <li >
            <NavLink style={{ color: "#000" }} to="/booking">
              {" "}
              Lịch đặt
            </NavLink>
          </li>
          <li >
            <NavLink style={{ color: "#000" }} to="/booking" onClick={handleLogout}>
              {" "}
              Đăng xuất
            </NavLink>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default Nav;
