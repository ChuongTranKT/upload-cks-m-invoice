import React, { useEffect, useState } from "react";

import { useLocation, Link } from "react-router-dom";
import formatTaxCode from "../utils/formatTaxCode";

const breadcrumbLabels = {
  "/customers": "Quản lý user tra cứu",
  "/tu-dong-dang-nhap": "Đăng nhập CRM",
  "/chuyen-chu-ky-so": "Chuyển chữ ký số",
  "/services": "Dịch vụ",
  "/branchreport": "Báo cáo chi nhánh",
  "/systemreport": "Báo cáo toàn hệ thống",
  // Thêm các đường dẫn và nhãn khác nếu cần thiết
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const [taxCode, setTaxcode] = useState("");
  const [ten_dvcs, setTendvcs] = useState("");
  useEffect(() => {
    const taxCode = localStorage.getItem("taxCode");
    const ten_dvcs = localStorage.getItem("companyName");

    if (taxCode) {
      setTaxcode(taxCode);
      setTendvcs(ten_dvcs);
    }
  }, []);

  // Tạo một mảng chứa các phần tử breadcrumb
  const breadcrumbs = [];
  let breadcrumbPath = "";

  for (let i = 0; i < pathSegments.length; i++) {
    breadcrumbPath += `/${pathSegments[i]}`;
    breadcrumbs.push({ path: breadcrumbPath, label: pathSegments[i] });
  }

  // Xử lý khi bấm vào biểu tượng và điều hướng về /dashboard
  const handleIconClick = () => {
    window.location.href = "/";
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#FAFAFA",
        position: "fixed",
        color: "#0069b4",
        marginTop: "4rem",
        display: "flex",
        fontWeight: "350",
        fontSize: "13px",
        alignItems: "center",
        padding: "0px 2.6rem",
        zIndex: 2,
        justifyContent: "space-between",
      }}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && <i className="fa-solid fa-angle-right"></i>}
          {index === 0 ? (
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={handleIconClick}
            >
              {breadcrumb.path === "/" ? (
                <i className="fa-solid fa-house-chimney"></i>
              ) : (
                <i className="fa-solid fa-house-chimney"></i>
              )}
              {breadcrumb.path === "/" ? null : (
                <i
                  className="fa-solid fa-angle-right"
                  style={{ padding: " 0 0.4rem" }}
                ></i>
              )}
              {breadcrumb.path === "/" ? (
                <i
                  className="fa-solid fa-angle-right"
                  style={{ padding: " 0 0.4rem" }}
                ></i>
              ) : (
                breadcrumbLabels[breadcrumb.path] || breadcrumb.label
              )}
            </div>
          ) : (
            <Link to={breadcrumb.path}>
              {breadcrumbLabels[breadcrumb.path] || breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}

      <div>
        <span
          style={{
            display: "block",
            color: "#0069b",
            fontWeight: "700",
            paddingTop: "5px",
            textAlign: "center",
            paddingRight: "3px",
            fontSize: "12px",
          }}
        >
          {ten_dvcs}
        </span>
        <span
          style={{
            display: "block",
            color: "#0069b",
            fontWeight: "700",

            textAlign: "end",
            paddingRight: "3px",
            fontSize: "12px",
          }}
        >
          {"MST: " + taxCode}
        </span>
      </div>
    </div>
  );
};
export default Breadcrumbs;
