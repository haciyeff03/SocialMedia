import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import { useMemo } from "react";
import { UseSelector, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>


            <Route path='/' element={<Login />} />

            <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <Profile /> : <Navigate to="/" />} />

          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
