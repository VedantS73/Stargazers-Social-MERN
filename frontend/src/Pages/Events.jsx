import React from "react";
import {
  Typography,
  Button,
  Stack,
  Card,
  Avatar,
  dividerClasses,
  Grid,
  Drawer,
  colors,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cards from "../Components/Cards";
import BigCard from "../Components/Big-card";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocationBox from "../Components/LocationBox";

const useStyles = makeStyles({
  heading: {
    fontSize: "32px",
    fontWeight: "600",
  },
  Buttons: {
    width: "157px",
    height: "51px",
    backgroundColor: "white",
  },
});

export default function Events() {
  const classes = useStyles();

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Random Cat
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <img src="https://cataas.com/cat/gif" alt="random cat" />
      </Typography>
    </div>
  );
}
