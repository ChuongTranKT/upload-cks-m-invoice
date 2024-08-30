// import React, { useEffect, useMemo, useState } from "react";
// import { MaterialReactTable } from "material-react-table";
// import "./customer.scss";
// import "../dashboard.scss";
// import { Box, Button } from "@mui/material";
// import { useImperativeDisableScroll } from "../../utils/configScrollbar";
// import ExcelJS from "exceljs";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import GetDmkh from "../../utils/GetListCKS";
// import GetUserTracuu from "../../utils/GetUserTracuu";

// const Customer = () => {
//   //hidden scroll
//   useImperativeDisableScroll({
//     element: document.scrollingElement,
//     disabled: true,
//   });
//   const tableHeight =
//     ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 100;

//   const navigate = useNavigate();
//   const [customers, setCustomers] = useState([]);
//   const [getIDRow, setIDRow] = useState(0);
//   const [idCus, setidCus] = useState(0);
//   const [editCustomerData, setEditCustomerData] = useState(null);

//   //active modal
//   const [modal, setModal] = useState(false);
//   const [modalAssign, setModalAssign] = useState(false);
//   const [isLoading, setIsloading] = useState(false);
//   const [isModalChooseFile, setIsModalChooseFile] = useState(false);
//   const [taxCode, setTaxCode] = useState("");
//   const [listKH, setListKH] = useState([]);
//   const [isCreateUser, setIsCreateUser] = useState(false);
//   const [listKHChuaTaoTK, setlistKHChuaTaoTK] = useState([]);
//   const [startLocal, setStartLocal] = useState(0);

//   useEffect(() => {
//     const taxCode = localStorage.getItem("login");

//     if (taxCode) {
//       setTaxCode(taxCode);
//     }
//   }, []);
//   const getDataKH = async (taxCode, start) => {
//     setIsloading(true);

//     const listKHResponse = await GetDmkh(taxCode, start);
//     if (listKHResponse.data.data.length > 0) {
//       // Loại bỏ phần tử trùng lặp dựa trên một thuộc tính nhất định, ví dụ như 'taxCode'
//       const uniqueList = [];
//       const listKHData = [...listKHResponse.data.data];
//       const seen = new Map();

//       const uniqueListKH = listKHData.filter((item) => {
//         if (!seen.has(item.ma_dt)) {
//           seen.set(item.ma_dt, true);
//           return true;
//         }
//         return false;
//       });
//       console.log("🚀 ~ uniqueA ~ uniqueA:", uniqueListKH);

//       console.log(uniqueListKH);
//       setIsloading(false);
//       setlistKHChuaTaoTK([]);
//       setListKH(uniqueListKH);
//     } else {
//       setListKH([]);
//       setIsloading(false);
//     }
//   };

//   const handleExportCustomer = () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Customers");

//     // Thêm tiêu đề cột
//     const columns = ["Mã đối tượng", "Loại tài khoản"];
//     worksheet.addRow(columns);

//     // Thêm dữ liệu khách hàng
//     listKH.forEach((customer) => {
//       const row = [customer.ma_dt, customer.su_dung];
//       worksheet.addRow(row);
//     });

//     // Tạo tệp Excel và tải xuống
//     workbook.xlsx.writeBuffer().then((data) => {
//       const blob = new Blob([data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "Customers.xlsx";
//       a.click();
//       window.URL.revokeObjectURL(url);
//     });
//   };

//   const labelDisplayedRowss = ({ from, to, count }) => {
//     return `${from}-${to} trong ${count} bản ghi`; // Ví dụ: "1-10 of 100"
//   };

//   const handleRowClick = (row) => {
//     if (getIDRow === "" || getIDRow !== row.getValue("AccountID")) {
//       setIDRow(row.getValue("AccountID"));
//     } else {
//       setIDRow("");
//     }
//   };

//   const columns = useMemo(() => [
//     {
//       accessorKey: "stt",
//       header: "STT",

//       Cell: ({ row }) => (
//         <span className={row.original.ma_dt === getIDRow ? "active" : ""}>
//           {row.index + 1}
//         </span>
//       ),
//     },
//     {
//       accessorKey: "ma_dt",
//       header: "Mã đối tượng",
//       Cell: ({ row }) => (
//         <span className={row.original.ma_dt === getIDRow ? "active" : ""}>
//           {row.original.ma_dt}
//         </span>
//       ),
//     },
//     {
//       accessorKey: "su_dung",
//       header: "Loại tài khoản",
//       Cell: ({ row }) => (
//         <span className={row.original.ma_dt === getIDRow ? "active" : ""}>
//           {row.original.su_dung}
//         </span>
//       ),
//     },

//     {
//       header: "Chức năng",
//       accessorKey: "assignService",
//       // Tiêu đề của cột "Assign Service"
//       accessor: "assignService", // Truy cập dữ liệu của cột "Assign Service"

//       Cell: ({ row }) => (
//         <button
//           className="btn-assign"
//           onClick={() => {
//             setidCus(row.getValue("ma_dt"));
//             setModalAssign(!modalAssign);
//           }}
//         >
//           <span
//             className="fa-solid fa-plus"
//             style={{ paddingRight: "5px" }}
//           ></span>
//           <span className="p-component">Chọn dịch vụ</span>
//         </button>
//       ),
//     },
//   ]);

//   return (
//     <div
//       style={{
//         paddingTop: "6.5rem",
//         backgroundColor: "#EDF1F5",

//         maxHeight: "10px",
//       }}
//     >
//       {listKH && (
//         <div className="gird-layout wide ">
//           <style>
//             {`
//                           ::-webkit-scrollbar {
//                             width: 5px;
//                             height:5px
//                           }
//                           ::-webkit-scrollbar-thumb {
//                             background-color: #6466F1;
//                             border-radius:5px
//                           }
//                           ::-webkit-scrollbar-track {
//                             background-color: transparent;
//                           }
//                         `}
//           </style>
//           {/* <ToastContainer autoClose={2000} hideProgressBar /> */}
//           {/* <Modal
//           modal={modal}
//           setModal={setModal}
//           editCustomerData={editCustomerData}
//           setEditCustomerData={setEditCustomerData}
//         /> */}
//           {/* <ModalAssignService
//           setidCus={setidCus}
//           idCus={idCus}
//           modalAssign={modalAssign}
//           setModalAssign={setModalAssign}
//           editCustomerData={editCustomerData}
//           setEditCustomerData={setEditCustomerData}
//         /> */}
//           {/* <ModalChooseFile
//           getCustomer={getCustomer}
//           isModalChooseFile={isModalChooseFile}
//           setIsModalChooseFile={setIsModalChooseFile}
//         /> */}
//           <div className="col-12">
//             <MaterialReactTable
//               muiTablePaperProps={{
//                 sx: {
//                   flex: "1 1 0",
//                   display: "flex",
//                   "flex-flow": "column",
//                 },
//               }}
//               enableSorting={true}
//               enableGlobalFilter={true}
//               enableColumnFilters={false}
//               initialState={{
//                 columnPinning: { right: ["assignService"] },
//                 pagination: { pageSize: 300 },
//               }} //pin email column to left by default
//               state={{ isLoading: isLoading }}
//               muiTableBodyRowProps={({ row }) => ({
//                 // onClick: (event) => handleRowClick(row),
//                 className:
//                   getIDRow === row.getValue("ma_dt") ? "selected-row" : "",
//                 sx: {
//                   cursor: "pointer",
//                 },
//               })}
//               enableStickyHeader={true}
//               enableStickyFooter={true}
//               muiTablePaginationProps={{
//                 labelDisplayedRows: labelDisplayedRowss,
//               }}
//               muiPaginationProps={{
//                 rowsPerPageOptions: [300, 500, 1000],
//               }}
//               enablePagination={true}
//               columns={columns}
//               data={listKHChuaTaoTK.length > 0 ? listKHChuaTaoTK : listKH}
//               renderTopToolbarCustomActions={() => (
//                 <Box className="col">
//                   <Button
//                     className="btn_add"
//                     style={{}}
//                     onClick={handleGetUser}
//                   >
//                     <span
//                       style={{ paddingRight: "5px" }}
//                       className="fa-solid fa-plus"
//                     ></span>
//                     <span style={{ paddingLeft: "5px" }}>
//                       Lấy danh sách user chưa tạo
//                     </span>
//                   </Button>
//                   <Button className="btn_edit">
//                     <span
//                       style={{ paddingRight: "5px" }}
//                       className="fa-solid fa-pencil"
//                     ></span>
//                     <span style={{ paddingLeft: "5px" }}>Sửa</span>
//                   </Button>
//                   {/* <Button
//                   className="btn_remove"
//                   // onClick={(e) => handleDeleteCustomer(e)}
//                 >
//                   <span
//                     style={{ paddingRight: "5px" }}
//                     className="fa-solid fa-trash"
//                   ></span>
//                   <span style={{ paddingLeft: "5px" }}>Xoá</span>
//                 </Button> */}

//                   <Button
//                     className="btn_import"
//                     onClick={() => setIsModalChooseFile(!isModalChooseFile)}
//                   >
//                     <span
//                       style={{ paddingRight: "5px" }}
//                       className="fa-solid fa-file-import"
//                     ></span>
//                     <span style={{ paddingLeft: "5px" }}>Nhập Excel</span>
//                   </Button>
//                   <Button onClick={handleExportCustomer} className="btn_export">
//                     <span
//                       style={{ paddingRight: "5px" }}
//                       className="fa-solid fa-file-excel"
//                     ></span>
//                     <span style={{ paddingLeft: "5px" }}>Xuất Excel</span>
//                   </Button>
//                   <Button onClick={handleCreateUser} className="btn_export">
//                     <span
//                       style={{ paddingRight: "5px" }}
//                       className="fa-solid fa-file-excel"
//                     ></span>
//                     <span style={{ paddingLeft: "5px" }}>
//                       Tạo user hàng loạt
//                     </span>
//                   </Button>
//                 </Box>
//               )}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Customer;
