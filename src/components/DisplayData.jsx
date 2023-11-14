import React, { useState } from "react";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { multiStepContext } from "./StepContext";

export default function DisplayData() {
  const { finalData, setFinalData } = React.useContext(multiStepContext); // Define setFinalData
  const [selectedRow, setSelectedRow] = React.useState(null);

  
  // Prepare data for DataGrid
  const columns = [
    {
      field: "firstname",
      headerName: "First Name",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "contact",
      headerName: "Contact Number",
      width: 170,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 210,
      disableColumnMenu: true,
    },
    {
      field: "country",
      headerName: "Country",
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: "district",
      headerName: "District",
      width: 120,
      disableColumnMenu: true,
    },
    { field: "city", headerName: "City", width: 120, disableColumnMenu: true },
    {
      field: "landmark",
      headerName: "Landmark",
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: "postcode",
      headerName: "Postal Code",
      width: 130,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => (
        <div>
          {selectedRow === params.id ? (
            <>
              <button
                className="action-button"
                onClick={() => handleDelete(params.id)}
              >
                Delete
              </button>
              <span> </span>
              <button
                className="action-button"
                onClick={() => setSelectedRow(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setSelectedRow(params.id)}>More</button>
          )}
        </div>
      ),
    },
  ];

  const rows = finalData.map((data, index) => ({
    id: index + 1,
    ...data,
  }));

  // State for page and pageSize
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const handleChangePage = (params) => {
    setPage(params.page);
  };

  const handleChangePageSize = (params) => {
    setPageSize(params.pageSize);
    setPage(0); // Reset page to the first page when changing the pageSize
  };
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setFinalData(updatedRows); // Use setFinalData to update the state
  };

  return (
    <div style={{ height: 400, width: "98%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        page={page}
        pageSize={pageSize}
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangePageSize}
        rowCount={rows.length}
        components={{
          pagination: (props) => (
            <GridPagination
              {...props}
              rowsPerPageOptions={[5, 10, 15]} // Set the available rows per page options
            />
          ),
        }}
      />
    </div>
  );
}