import {
  ClearAllOutlined,
  DeleteOutline,
  SearchOutlined,
} from "@mui/icons-material";
import { Box, InputAdornment, TextField, colors } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React, { useEffect, useState } from "react";
import { HomePage } from "../page/HomePage";

export const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#04364A" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 0,
            px: 3,
          }}
        >
          <img
            src="/CM_logo.svg"
            alt="logo"
            style={{ height: "80px", width: "150px" }}
          />
          <Box>
            <TextField
              size="small"
              variant="outlined"
              sx={{ backgroundColor: "white" }}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    // style={{ display: showClearIcon }}
                    onClick={() => setSearchTerm("")}
                  >
                    <DeleteOutline />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </AppBar>
      <HomePage searchTerm={searchTerm} />
    </Box>
  );
};
