/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  // const [isModalMenu, setIsModalMenu] = useState(false);
  // const [isModalChangePass, setIsModalChangePass] = useState(false);
  const getLocation = useLocation();
  const navigate = useNavigate();

  useState(() => {});

  const handleLogout = () => {
    localStorage.removeItem("taxCode");
    localStorage.removeItem("token");
    localStorage.removeItem("companyName");
    localStorage.removeItem("cookie");
    navigate("/");
  };

  return (
    <div
      // layout navbar
      className="layout-navbar"
    >
      <img
        onClick={() => navigate("/dashboard")}
        src={require("../assets/logo-minvoice.png")}
      ></img>

      {/* navbar list */}
      <div style={{ flex: 6, display: "flex", justifyContent: "center" }}>
        {/* <ul className="ul-list-nav">  */}
        {/* <li
            className={getLocation.pathname === "/invoices" ? "active" : ""}
            role="none"
            style={{ alignItems: "center" }}
          >
            <Link className="link" to="/invoices">
              <span
                style={{ paddingRight: "5px" }}
                class="fa-solid fa-file-invoice"
              ></span>
              <span>Quản lý phiếu thu</span>
            </Link>
          </li> */}

        {/* <li
            role="none"
            style={{ alignItems: "center" }}
            className={getLocation.pathname === "/customers" ? "active" : ""}
          >
            <Link className="link" to="/customers">
              <span
                style={{ paddingRight: "5px" }}
                className="fa-solid fa-users"
              ></span>
              <span>Upload chữ kí số</span>
            </Link>
          </li> */}
        {/* <li
            role="none"
            style={{ alignItems: "center" }}
            className={getLocation.pathname === "/services" ? "active" : ""}
          >
            <Link className="link" to="/services">
              <span
                style={{ paddingRight: "5px" }}
                class="fa-solid fa-table-list"
              ></span>
              <span>Quản lý dịch vụ</span>
            </Link>
          </li> */}
        {/* <li
            role="none"
            style={{ alignItems: "center" }}
            className={getLocation.pathname === "/branchreport" ? "active" : ""}
          >
            <Link className="link" to="/branchreport">
              <span
                style={{ paddingRight: "5px" }}
                class="fa-solid fa-calendar-days"
              ></span>
              <span>Báo cáo chi nhánh</span>
            </Link>
          </li> */}
        {/* <li
            role="none"
            style={{ alignItems: "center" }}
            className={getLocation.pathname === "/systemreport" ? "active" : ""}
          >
            <Link className="link" to="/systemreport">
              <span
                style={{ paddingRight: "5px" }}
                class="fa-solid fa-chart-pie"
              ></span>
              <span>Báo cáo hệ thống</span>
            </Link>
          </li> */}
        {/* <li role="none" style={{ alignItems: "center" }}>
            <Link
              className="link"
              to="/customers"
              style={{ alignItems: "center" }}
            >
              <span
                style={{ paddingRight: "5px" }}
                className="fa-solid fa-bars"
              ></span>
              <span>Danh mục</span>
              <i
                style={{ paddingLeft: "5px" }}
                className="fa-solid fa-angle-down"
              ></i>
            </Link>
          </li> */}
        {/* </ul> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          style={{
            padding: "0.75rem",
            border: "1px solid #DEE2E6",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
      {/* link contact */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: "15px 15px",
        }}
      ></div>
    </div>
  );
};
<style type="text/css"></style>;

export default NavBar;
