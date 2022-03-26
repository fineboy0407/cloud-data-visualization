import React from "react";
import { darkTheme, lightTheme } from "./theme";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [light, setLight] = React.useState(true);
  return (
    <ThemeProvider theme={light ? darkTheme : lightTheme}>
      <CssBaseline />
      <Button onClick={() => setLight(prev => !prev)}>Toggle Theme</Button>
    </ThemeProvider>
  );
}

export default App;
