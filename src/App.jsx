import React, { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./utils/routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { CssBaseline, Box } from "@mui/material";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isLogin = location.pathname === "/"; // Ocultar layout si es login

  return (
    <Box sx={{ 
      width: "100vw", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      background: isLogin ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" : "transparent"
    }}>
      {!isLogin && <Topbar />}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {!isLogin && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            marginTop: isLogin ? 0 : "80px",
            marginLeft: isLogin ? 0 : isSidebarOpen ? "280px" : "80px",
            padding: isLogin ? 0 : "32px",
            background: isLogin ? "transparent" : "#f8fafc",
            minHeight: isLogin ? "100vh" : "calc(100vh - 80px)",
            overflowY: "auto",
            position: "relative",
            "&::before": !isLogin ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.03) 0%, transparent 50%)",
              pointerEvents: "none",
            } : {}
          }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <Layout />
    </Router>
  );
}

export default App;
