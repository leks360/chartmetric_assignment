import { DeleteOutline, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import _debounce from "lodash/debounce";
import AppBar from "@mui/material/AppBar";
import React, { useEffect, useRef, useState } from "react";
import { HomePage } from "../page/HomePage";

export const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const debouncedHandleSearchTermChange = _debounce((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, 300); // Adjust the debounce delay as needed

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#04364A",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
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
            style={{ height: "65px", width: "150px" }}
          />
          <Box>
            <TextField
              inputRef={textFieldRef}
              size="small"
              variant="outlined"
              sx={{ backgroundColor: "white" }}
              placeholder="Search..."
              onChange={(e) => debouncedHandleSearchTermChange(e.target.value)}
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
                  >
                    <Tooltip title={"Clear search"}>
                      <IconButton>
                        <DeleteOutline
                          onClick={() => {
                            if (textFieldRef.current) {
                              textFieldRef.current.value = "";
                            }
                            debouncedHandleSearchTermChange("");
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </AppBar>
      <Box>
        <HomePage searchTerm={searchTerm} /> {/* Main content */}
      </Box>
    </Box>
  );
};
