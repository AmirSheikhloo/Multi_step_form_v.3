import React, { useState } from "react";
import { DataGrid, GridPagination, GridToolbar } from "@mui/x-data-grid";
import { multiStepContext } from "./StepContext";
import { Button } from "@mui/material";

export default function DisplayData() {
  const { finalData, setFinalData } = React.useContext(multiStepContext); // Define setFinalData
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [isSpecButtonClicked, setIsSpecButtonClicked] = React.useState(false);

  // Prepare data for DataGrid
  const columns = [
    {
      field: "id", // Add ID field
      headerName: "ID", // Column header name
      width: 70, // Set the width of the column
      disableColumnMenu: true,
    },
    {
      field: "firstname",
      headerName: "First Name",
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 120,
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
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "district",
      headerName: "District",
      width: 100,
      disableColumnMenu: true,
    },
    { field: "city", headerName: "City", width: 120, disableColumnMenu: true },
    {
      field: "landmark",
      headerName: "Landmark",
      width: 150,
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
      width: 170,
      align: "center", // Set the alignment of the cell content to center

      headerAlign: "center",
      renderCell: (params) => (
        <div>
          {selectedRow === params.id ? (
            <>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleDelete(params.id)}
              >
                Delete
              </Button>
              <span> </span>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => setSelectedRow(null)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setSelectedRow(params.id)}
            >
              More
            </Button>
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

  const handleSpecButtonClick = () => {
    if (rowSelectionModel.length > 0) {
      const filtered = rows.filter((row) => rowSelectionModel.includes(row.id));
      setFilteredRows(filtered);
    } else {
      setFilteredRows([]);
    }

    setIsSpecButtonClicked(true);
  };

  const handleResetButtonClick = () => {
    setRowSelectionModel([]);
    setFilteredRows([]);
    setIsSpecButtonClicked(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <Button
            onClick={handleSpecButtonClick}
            color="primary"
            variant="contained"
            style={{ marginBottom: '10px', marginRight: '10px' }}
          >
            Spec
          </Button>
        </div>
        <div>
          <Button
            onClick={handleResetButtonClick}
            color="secondary"
            variant="contained"
            style={{ marginBottom: '10px' }}
          >
            Reset
          </Button>
        </div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={isSpecButtonClicked ? filteredRows : rows}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          page={page}
          pageSize={pageSize}
          disableRowSelectionOnClick
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
          rowCount={isSpecButtonClicked ? filteredRows.length : rows.length}
          components={{
            Toolbar: GridToolbar, // Enable toolbar with column filters and export options
            pagination: (props) => (
              <GridPagination
                {...props}
                rowsPerPageOptions={[5, 10, 15]} // Set the available rows per page options
              />
            ),
          }}
        />
      </div>
    </div>
  );
}
