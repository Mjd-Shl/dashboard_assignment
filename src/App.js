import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { LoginPage } from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import SnackBar from "./components/ui/SnackBar";
import UserForm from "./components/Users/UserForm";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListIcon from "@mui/icons-material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MenuIcon from "@mui/icons-material/Menu";
import CastleIcon from "@mui/icons-material/Castle";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import DashboardPage from "./pages/DashboardPage";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, logout } from "./redux/reducers/authReducers";

const THEME = createTheme({
  typography: {
    fontFamily: `Open Sans,sans-serif`,
  },
});

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Auth State
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("isAuthenticated: ", isAuthenticated);

  //Drawer
  const drawerWidth = 240;
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isPathLogin = location.pathname === "/login";

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // Close the drawer when navigating to a new route
  const handleNavigation = (to) => {
    handleDrawerClose(); // Close the drawer
    navigate(to); // Navigate to the specified route
  };

  //Handle Auto Login When Reload
  useEffect(() => {
    const isTokenInSession = sessionStorage.getItem("accessToken");
    if (isTokenInSession) dispatch(autoLogin());
  }, []);

  //Handle Logout
  const handleLogOut = () => {
    dispatch(logout());
  };

  const drawer = (
    <div className="flex flex-col h-full">
      <Toolbar className="gap-4">
        <IconButton color="inherit" aria-label="open drawer" edge="start">
          <CastleIcon className="text-[var(--logo-color)]" />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="text-[var(--logo-color)] font-semibold"
        >
          Monty
        </Typography>
      </Toolbar>
      <Divider className="bg-white" />
      <List className="flex-1">
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              gap: "1rem",
              px: 2.5,
            }}
            onClick={() => handleNavigation("/")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <DashboardIcon className="text-[var(--dashboard-bar-text)]" />
            </ListItemIcon>
            <ListItemText
              primary={"Dashboard"}
              className="text-[var(--dashboard-bar-text)]"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              gap: "1rem",
              px: 2.5,
            }}
            onClick={() => handleNavigation("/users")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <ListIcon className="text-[var(--dashboard-bar-text)]" />
            </ListItemIcon>
            <ListItemText
              primary={"Users List"}
              className="text-[var(--dashboard-bar-text)]"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              gap: "1rem",
              px: 2.5,
            }}
            onClick={() => handleNavigation("/add-user")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
              className="text-[var(--dashboard-bar-text)]"
            >
              <PersonAddAltIcon className="text-[var(--dashboard-bar-text)]" />
            </ListItemIcon>
            <ListItemText
              primary={"Create User"}
              className="text-[var(--dashboard-bar-text)]"
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider className="!border-white" />
      <List className="mt-auto">
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              gap: "1rem",
              px: 2.5,
            }}
            onClick={handleLogOut}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
              }}
            >
              <LogoutIcon className="text-[var(--dashboard-bar-text)]" />
            </ListItemIcon>
            <ListItemText
              primary={"Logout"}
              className="text-[var(--dashboard-bar-text)]"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={THEME}>
      <SnackBar />

      <Box className="sm:flex bg-[var(--main-bg)]">
        <CssBaseline />
        {isMobile && (
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              background: "var(--dashboard-app-bar)",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {!isPathLogin && ( // Check if the current route is not "/login"
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
              boxShadow: "1px 1px 50px #ccc",
            }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  background: "var(--dashboard-bar)",
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  background: "var(--dashboard-bar)",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: isPathLogin ? 0 : 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {isMobile && <Toolbar />}
          <Routes>
            <Route path={`/login`} element={<LoginPage />} />

            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path={`/users`} element={<UsersPage />} />
              <Route path={`/add-user`} element={<UserForm />} />
              <Route path={`/`} element={<DashboardPage />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
