import React, { useState } from "react";
import "./css/Navigation.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work"; // Ícono de área de trabajo
import AssignmentIcon from "@mui/icons-material/Assignment"; // Ícono de contrato

import { ReactComponent as IconAgregarHorario } from "../../icons/Icon_Agregar_Horario.svg";
import { ReactComponent as IconValidarSolicitud } from "../../icons/Icon_validar_solicitud.svg";
import { ReactComponent as IconAgregarTurno } from "../../icons/Icon_Agregar_turno.svg";
import { ReactComponent as IconAgregarUsuario } from "../../icons/Icon_Agregar_Usuario.svg";
import { ReactComponent as IconSede } from "../../icons/Icon_Sede.svg";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawerItems = [
    { text: "Validar solicitud", href: "/", icon: <IconValidarSolicitud /> },
    { text: "Agregar Turno", href: "/turnoCrud", icon: <IconAgregarTurno /> },
    { text: "Agregar usuario", href: "/agregarUsuario", icon: <IconAgregarUsuario /> },
    { text: "Agregar Sede", href: "/agregarSede", icon: <IconSede /> },
    { text: "Agregar Área", href: "/agregarArea", icon: <WorkIcon /> }, // Usar ícono de área de trabajo
    { text: "Agregar Contrato", href: "/agregarContrato", icon: <AssignmentIcon /> }, // Usar ícono de contrato
    { text: "Agregar Horario", href: "/agregarHorario", icon: <IconAgregarHorario /> }
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {drawerItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component="a" href={item.href}>
              <span className="icono-lista">{item.icon}</span> {/* Agregar la clase de estilo */}
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <IconButton onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Container>
      </Navbar>
    </>
  );
}
