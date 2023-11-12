import * as React from "react";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { multiStepContext } from "./StepContext";

export default function DisplayData() {
  const { finalData } = React.useContext(multiStepContext);

  // Prepare data for DataGrid
  const columns = [
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "contact", headerName: "Contact Number", width: 180 },
    { field: "email", headerName: "Email Address", width: 240 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "district", headerName: "District", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "landmark", headerName: "Landmark", width: 180 },
    { field: "postcode", headerName: "Postal Code", width: 150 },
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

  return (
    <div style={{ height: 400, width: "100%" }}>
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