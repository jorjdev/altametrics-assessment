import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import ArrowForwardSVG from "./shared/ArrowForward";
import { useLocation } from "react-router-dom";

const NavigationSideNav: React.FC = () => {
  const location = useLocation();
  const routePath = location.pathname;

  const createNavItem = (path: string, text: string) => {
    const isSelected = routePath === path;
    const backgroundColor = isSelected ? "#824892" : "#f3f2fe";
    const textColor = isSelected ? "white" : "black";
    const marginTop = path == "/invoices" ? "40vh" : "";

    return (
      <ListItem
        component="a"
        href={path}
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor,
          color: textColor,
          gap: "0.4rem",
          marginTop: marginTop,
        }}
      >
        <ArrowForwardSVG color={textColor} />
        <ListItemText primary={text} />
      </ListItem>
    );
  };

  return (
    <List
      sx={{
        backgroundColor: "#f3f2fe",
        width: "15rem",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        height: "100vh",
      }}
    >
      {createNavItem("/invoices", "Invoices")}
      {createNavItem("/bills", "Bills")}
    </List>
  );
};

export default NavigationSideNav;
