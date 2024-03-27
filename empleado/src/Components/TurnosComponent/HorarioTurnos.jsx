import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const horarios = [
  { dia: "Lunes", hora: "9:00 AM - 5:00 PM" },
  { dia: "Martes", hora: "9:30 AM - 6:30 PM" },
  { dia: "Miércoles", hora: "10:00 AM - 7:00 PM" },
  { dia: "Jueves", hora: "9:00 AM - 5:00 PM" },
  { dia: "Viernes", hora: "8:30 AM - 4:30 PM" },
];

export default function HorarioTurnos() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Día</TableCell>
            <TableCell>Horario</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horarios.map((horario, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {horario.dia}
              </TableCell>
              <TableCell>{horario.hora}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
