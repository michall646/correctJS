import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
export default function Calendar() {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          
        },
      });
  return (
    <div>
       <ThemeProvider theme={darkTheme}>
       <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker />
      </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}