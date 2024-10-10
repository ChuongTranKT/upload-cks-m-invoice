import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import "./ManageCustomer/customer.scss";
import "./dashboard.scss";
import { Box, Button } from "@mui/material";
import ExcelJS from "exceljs";
import { useNavigate } from "react-router-dom";
import GetListCks from "../utils/GetListCKS";
import { useImperativeDisableScroll } from "../utils/configScrollbar";
import UploadCksAPI from "../utils/uploadCksApi";
import { toast, ToastContainer } from "react-toastify";
import PopupDialog from "../Components/PopupDialog";
import { styleError, styleSuccess } from "../Components/ToastNotifyStyle";
import ToastNotify from "../Components/ToastNotify";

const UploadCKS = () => {
  //hidden scroll
  useImperativeDisableScroll({
    element: document.scrollingElement,
    disabled: true,
  });
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 100;

  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [getIDRow, setIDRow] = useState(0);
  const [idCus, setidCus] = useState(0);
  const [editCustomerData, setEditCustomerData] = useState(null);

  //active modal
  const [isLoading, setIsloading] = useState(false);
  const [taxCode, setTaxCode] = useState("");
  const [listCks, setListCks] = useState([]);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, setCookie] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoadingUploadCks, setIsLoadingUploadCks] = useState(false);

  useEffect(() => {
    const taxCode = localStorage.getItem("taxCode");

    if (taxCode) {
      setTaxCode(taxCode);

      const getListCks = async () => {
        await handleGetListCks(taxCode);
      };

      getListCks();
    }
  }, []);
  const handleGetListCks = async (taxCode) => {
    setIsloading(true);

    const listCksResponse = await GetListCks(taxCode);
    const currentDate = new Date();
    if (listCksResponse.data.data.length > 0) {
      // Loại bỏ cks hết hạn
      const uniqueList = [];
      const listCksData = [...listCksResponse.data.data];
      console.log("🚀 ~ getListCks ~ listCksData:", listCksData);
      const seen = new Map();

      const uniquelistCks = listCksData.filter((item) => {
        const ngayKetThuc = new Date(item.ngayketthuc);
        return ngayKetThuc >= currentDate;
      });
      console.log("🚀 ~ uniqueA ~ uniqueA:", uniquelistCks);

      console.log(uniquelistCks);
      setIsloading(false);
      setListCks(uniquelistCks);
    } else {
      setIsloading(false);
    }
  };

  const labelDisplayedRowss = ({ from, to, count }) => {
    return `${from}-${to} trong ${count} bản ghi`; // Ví dụ: "1-10 of 100"
  };

  const handleRowClick = (row) => {
    if (getIDRow === "" || getIDRow !== row.getValue("AccountID")) {
      setIDRow(row.getValue("AccountID"));
    } else {
      setIDRow("");
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "STT",

      Cell: ({ row }) => (
        <span className={row.original.id === getIDRow ? "active" : ""}>
          {row.index + 1}
        </span>
      ),
      size: 100,
    },
    {
      accessorKey: "issuer",
      header: "Tên đơn vị cấp",
      Cell: ({ row }) => (
        <span className={row.original.issuer === getIDRow ? "active" : ""}>
          {row.original.issuer}
        </span>
      ),
    },
    {
      accessorKey: "subjectname",
      header: "Tên chủ sỡ hữu",
      Cell: ({ row }) => (
        <span className={row.original.subjectname === getIDRow ? "active" : ""}>
          {row.original.subjectname}
        </span>
      ),
    },
    {
      accessorKey: "so_serial",
      header: "Serial",
      Cell: ({ row }) => (
        <span className={row.original.so_serial === getIDRow ? "active" : ""}>
          {row.original.so_serial}
        </span>
      ),
    },
    {
      accessorKey: "ngaybatdau",
      header: "Ngày bắt đầu",
      Cell: ({ row }) => {
        const date = new Date(row.original.ngaybatdau);
        const formattedDate = date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        return (
          <span
            className={row.original.ngaybatdau === getIDRow ? "active" : ""}
          >
            {formattedDate}
          </span>
        );
      },
    },
    {
      accessorKey: "ngayketthuc",
      header: "Ngày kết thúc",
      Cell: ({ row }) => {
        const date = new Date(row.original.ngayketthuc);
        const formattedDate = date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        return (
          <span
            className={row.original.ngayketthuc === getIDRow ? "active" : ""}
          >
            {formattedDate}
          </span>
        );
      },
    },

    // {
    //   header: "Chức năng",
    //   accessorKey: "assignService",
    //   // Tiêu đề của cột "Assign Service"
    //   accessor: "assignService", // Truy cập dữ liệu của cột "Assign Service"

    //   Cell: ({ row }) => (
    //     <button
    //       className="btn-assign"
    //       onClick={() => {
    //         setidCus(row.getValue("ma_dt"));
    //         setModalAssign(!modalAssign);
    //       }}
    //     >
    //       <span
    //         className="fa-solid fa-plus"
    //         style={{ paddingRight: "5px" }}
    //       ></span>
    //       <span className="p-component">Chọn dịch vụ</span>
    //     </button>
    //   ),
    // },
  ]);

  const handleUploadCks = async () => {
    let isUploadCks = false;
    const dataUploadCks = listCks.map((item) => {
      const cksInfo = {
        vender: item.issuer,
        subjectName: item.subjectname,
        serialNumber: item.so_serial,
        dateFrom: item.ngaybatdau,
        expireDate: item.ngayketthuc,
        form: 1,
        tokenType: 0,
        used: true,
      };
      return cksInfo;
    });
    const dataUpload = {
      cookie: cookie,
      digital_signature: dataUploadCks,
    };
    try {
      const response = await UploadCksAPI(dataUpload);
      if (response.status === "upload success") {
        setIsOpen(false);
        isUploadCks = true;
      } else {
        setIsOpen(false);
        isUploadCks = false;
      }
    } catch (error) {
      setIsOpen(false);
      isUploadCks = false;
    }

    if (isUploadCks) {
      toast.success(
        <ToastNotify status={0} message={"Câp nhật chứ kí số thành công"} />,
        { style: styleSuccess }
      );
      setIsOpen(false);
    } else {
      toast.error(
        <ToastNotify status={-1} message={"Câp nhật chứ kí số thất bại"} />,
        { style: styleError }
      );
    }
    setIsConfirm(false);
    setIsLoadingUploadCks(false);
  };

  useEffect(() => {
    if (isConfirm) {
      localStorage.setItem("cookie", cookie);
      const uploadCks = async () => {
        await handleUploadCks();
      };
      uploadCks();
    }
  }, [isConfirm]);

  const handleOpenConfirm = () => {
    setIsOpen(true);
  };

  return (
    <div
      style={{
        paddingTop: "6.5rem",
        backgroundColor: "#EDF1F5",

        maxHeight: "10px",
      }}
    >
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {listCks && (
        <div className="gird-layout wide ">
          <style>
            {`
              ::-webkit-scrollbar {
                width: 5px;
                height:5px
              }
              ::-webkit-scrollbar-thumb {
                background-color: #6466F1; 
                border-radius:5px
              }
              ::-webkit-scrollbar-track {
                background-color: transparent; 
              }
            `}
          </style>
          <div className="col-12">
            <MaterialReactTable
              muiTablePaperProps={{
                sx: {
                  flex: "1 1 0",
                  display: "flex",
                  "flex-flow": "column",
                },
              }}
              enableSorting={true}
              enableGlobalFilter={true}
              enableColumnFilters={false}
              initialState={{
                columnPinning: { right: ["assignService"] },
                pagination: { pageSize: 300 },
              }} //pin email column to left by default
              state={{ isLoading: isLoading }}
              muiTableBodyRowProps={({ row }) => ({
                // onClick: (event) => handleRowClick(row),
                className:
                  getIDRow === row.getValue("id") ? "selected-row" : "",
                sx: {
                  cursor: "pointer",
                },
              })}
              enableStickyHeader={true}
              enableStickyFooter={true}
              muiTablePaginationProps={{
                labelDisplayedRows: labelDisplayedRowss,
              }}
              muiPaginationProps={{
                rowsPerPageOptions: [300, 500, 1000],
              }}
              enablePagination={true}
              columns={columns}
              data={listCks}
              renderTopToolbarCustomActions={() => (
                <Box className="col">
                  {/* <Button
                    className="btn_add"
                    style={{}}
                    onClick={handleGetListCks}
                  >
                    <span
                      style={{ paddingRight: "5px" }}
                      className="fa-solid fa-plus"
                    ></span>
                    <span style={{ paddingLeft: "5px" }}>
                      Lấy danh sách CKS
                    </span>
                  </Button> */}
                  {/* <Button className="btn_edit">
                    <span
                      style={{ paddingRight: "5px" }}
                      className="fa-solid fa-pencil"
                    ></span>
                    <span style={{ paddingLeft: "5px" }}>Sửa</span>
                  </Button>
                  <Button
                    className="btn_import"
                    onClick={() => setIsModalChooseFile(!isModalChooseFile)}
                  >
                    <span
                      style={{ paddingRight: "5px" }}
                      className="fa-solid fa-file-import"
                    ></span>
                    <span style={{ paddingLeft: "5px" }}>Nhập Excel</span>
                  </Button>
                  <Button onClick={handleExportCustomer} className="btn_export">
                    <span
                      style={{ paddingRight: "5px" }}
                      className="fa-solid fa-file-excel"
                    ></span>
                    <span style={{ paddingLeft: "5px" }}>Xuất Excel</span>
                  </Button> */}
                  <Button className="btn_export" onClick={handleOpenConfirm}>
                    <span
                      style={{ paddingRight: "5px" }}
                      className="fa-solid "
                    ></span>
                    <span style={{ paddingLeft: "5px" }}>Upload CKS</span>
                  </Button>
                </Box>
              )}
            />
          </div>
        </div>
      )}
      <PopupDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mst={taxCode}
        setIsConfirm={setIsConfirm}
        setCookie={setCookie}
        cookie={cookie}
      />
    </div>
  );
};

export default UploadCKS;
