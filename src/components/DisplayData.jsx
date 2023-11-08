import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { multiStepContext } from "./StepContext";

export default function DisplayData() {
  const { finalData } = useContext(multiStepContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer style={{ display: "flex", justifyContent: "center" }}>
        <Table
          border="1"
          style={{ width: "70%", justifyContent: "center" }}
          size="small"
          aria-label="captain table"
        >
          <TableHead>
            <TableRow
              style={{ backgroundColor: "burlywood", color: "aliceblue" }}
            >
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>District</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Landmark</TableCell>
              <TableCell>Postal Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => (
                <TableRow key={data.email}>
                  <TableCell>{data.firstname}</TableCell>
                  <TableCell>{data.lastname}</TableCell>
                  <TableCell>{data.contact}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.country}</TableCell>
                  <TableCell>{data.district}</TableCell>
                  <TableCell>{data.city}</TableCell>
                  <TableCell>{data.landmark}</TableCell>
                  <TableCell>{data.postcode}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={finalData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}