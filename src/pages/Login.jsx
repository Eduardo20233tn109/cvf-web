import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance as axios } from "../config/axiosConfig";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-40px) translateX(-10px); }
  75% { transform: translateY(-20px) translateX(5px); }
`;

const floatBubble = keyframes`
  0% { 
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% { 
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const wave = keyframes`
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const carDrive = keyframes`
  0% { 
    left: -20%; 
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% { 
    left: 120%; 
    opacity: 0;
  }
`;

const barrierUp = keyframes`
  0%, 30% { 
    transform: rotate(0deg);
    background: repeating-linear-gradient(90deg, #ef4444 0px, #ef4444 25px, #ffffff 25px, #ffffff 50px);
  }
  35%, 70% { 
    transform: rotate(-88deg);
    background: repeating-linear-gradient(90deg, #22c55e 0px, #22c55e 25px, #ffffff 25px, #ffffff 50px);
  }
  75%, 100% { 
    transform: rotate(0deg);
    background: repeating-linear-gradient(90deg, #ef4444 0px, #ef4444 25px, #ffffff 25px, #ffffff 50px);
  }
`;

const wheelSpin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const lightBlink = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 15px #fef08a, 0 0 30px rgba(254, 240, 138, 0.5); }
  50% { opacity: 0.3; box-shadow: 0 0 5px #fef08a; }
`;

const clickSound = new Audio("/sounds/click.mp3");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handlePasswordToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || password.length < 8) {
      setErrorMsg("Campos inválidos o contraseña muy corta.");
      return;
    }

    try {
      const response = await axios.post("/api/users/login-mobile", {
        username,
        password
      });

      const { user, token, message } = response.data;

      if (!user || !token) {
        setErrorMsg(message || "Credenciales incorrectas.");
        return;
      }

      const userData = { ...user, token };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("id", user._id);

      if (user.tipoUsuario === "ADMIN") {
        navigate("/users", { replace: true });
      } else if (user.tipoUsuario === "RESIDENTE") {
        navigate("/residente/dashboard", { replace: true });
      } else {
        setErrorMsg("Tu tipo de usuario no tiene acceso a la plataforma web.");
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #0a0f1e 100%)",
        backgroundSize: "400% 400%",
        animation: `${gradientShift} 15s ease infinite`,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Burbujas flotantes grandes */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={`bubble-${i}`}
          sx={{
            position: "absolute",
            bottom: "-100px",
            left: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 80}px`,
            height: `${20 + Math.random() * 80}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(20, 184, 166, ${0.15 + Math.random() * 0.25}), rgba(6, 182, 212, ${0.08 + Math.random() * 0.2}))`,
            borderRadius: "50%",
            animation: `${floatBubble} ${12 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            backdropFilter: "blur(3px)",
            border: "1px solid rgba(20, 184, 166, 0.3)",
            boxShadow: "0 0 20px rgba(20, 184, 166, 0.2), inset 0 0 20px rgba(20, 184, 166, 0.1)",
          }}
        />
      ))}

      {/* Partículas pequeñas flotantes */}
      {[...Array(30)].map((_, i) => (
        <Box
          key={`particle-${i}`}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 8}px`,
            height: `${3 + Math.random() * 8}px`,
            background: `rgba(${i % 2 === 0 ? '20, 184, 166' : '6, 182, 212'}, 0.6)`,
            borderRadius: "50%",
            animation: `${floatSlow} ${8 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
            boxShadow: `0 0 ${10 + Math.random() * 10}px rgba(${i % 2 === 0 ? '20, 184, 166' : '6, 182, 212'}, 0.6)`,
          }}
        />
      ))}

      {/* Formas geométricas grandes con más brillo */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.12), rgba(6, 182, 212, 0.06), transparent)",
          borderRadius: "50%",
          animation: `${pulse} 8s ease-in-out infinite`,
          filter: "blur(50px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.12), rgba(20, 184, 166, 0.06), transparent)",
          borderRadius: "50%",
          animation: `${pulse} 10s ease-in-out infinite`,
          animationDelay: "2s",
          filter: "blur(50px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.08), transparent)",
          borderRadius: "50%",
          animation: `${pulse} 12s ease-in-out infinite`,
          animationDelay: "4s",
          filter: "blur(60px)",
        }}
      />

      {/* Círculos decorativos con más brillo */}
      {[1, 2, 3, 4].map((_, i) => (
        <Box
          key={`circle-${i}`}
          sx={{
            position: "absolute",
            top: `${20 + i * 15}%`,
            right: `${10 + i * 10}%`,
            width: `${120 + i * 20}px`,
            height: `${120 + i * 20}px`,
            border: `${2 + i * 0.5}px solid rgba(20, 184, 166, ${0.15 + i * 0.05})`,
            borderRadius: "50%",
            animation: `${rotate} ${15 + i * 5}s linear ${i % 2 === 0 ? 'normal' : 'reverse'}, ${float} ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            boxShadow: `0 0 20px rgba(20, 184, 166, ${0.1 + i * 0.05})`,
          }}
        />
      ))}

      {/* Hexágonos */}
      {[1, 2].map((_, i) => (
        <Box
          key={`hex-${i}`}
          sx={{
            position: "absolute",
            top: `${30 + i * 30}%`,
            left: `${15 + i * 50}%`,
            width: "70px",
            height: "70px",
            background: `linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(6, 182, 212, 0.1))`,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            animation: `${rotate} ${20 + i * 5}s linear infinite, ${float} ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
            border: "2px solid rgba(20, 184, 166, 0.3)",
            boxShadow: "0 0 30px rgba(20, 184, 166, 0.2)",
          }}
        />
      ))}

      {/* Líneas decorativas múltiples */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={`line-${i}`}
          sx={{
            position: "absolute",
            top: `${10 + i * 15}%`,
            left: `${i % 2 === 0 ? '20%' : 'auto'}`,
            right: `${i % 2 === 1 ? '20%' : 'auto'}`,
            width: `${180 + i * 30}px`,
            height: "3px",
            background: `linear-gradient(90deg, transparent, rgba(${i % 2 === 0 ? '20, 184, 166' : '6, 182, 212'}, 0.4), transparent)`,
            animation: `${float} ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            transform: `rotate(${i % 2 === 0 ? '-45deg' : '45deg'})`,
            boxShadow: `0 0 10px rgba(${i % 2 === 0 ? '20, 184, 166' : '6, 182, 212'}, 0.5)`,
          }}
        />
      ))}

      {/* Efectos de destello en las esquinas */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle at top left, rgba(20, 184, 166, 0.15), transparent)",
          animation: `${pulse} 6s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.15), transparent)",
          animation: `${pulse} 6s ease-in-out infinite`,
          animationDelay: "3s",
        }}
      />

      {/* Escena mejorada de fraccionamiento - De lado a lado */}
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "0",
          right: "0",
          zIndex: 5,
          filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))",
        }}
      >
        {/* Carretera de lado a lado */}
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100vw",
            height: "25px",
            background: "linear-gradient(180deg, #475569 0%, #334155 100%)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "0",
              width: "100%",
              height: "4px",
              background: "repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 40px, transparent 40px, transparent 70px)",
              transform: "translateY(-50%)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "4px",
              background: "rgba(0, 0, 0, 0.4)",
            }
          }}
        />

        {/* Caseta de vigilancia en el lado izquierdo */}
        <Box
          sx={{
            position: "absolute",
            bottom: "25px",
            left: "15%",
            width: "100px",
            height: "90px",
            background: "linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)",
            borderRadius: "6px 6px 0 0",
            border: "3px solid #14b8a6",
            boxShadow: "0 0 30px rgba(20, 184, 166, 0.5), inset 0 0 20px rgba(20, 184, 166, 0.1)",
          }}
        >
          {/* Techo */}
          <Box
            sx={{
              position: "absolute",
              top: "-25px",
              left: "-8px",
              width: "116px",
              height: "25px",
              background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
              clipPath: "polygon(15% 100%, 0% 0%, 100% 0%, 85% 100%)",
              boxShadow: "0 -4px 20px rgba(20, 184, 166, 0.6)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          />

          {/* Ventana izquierda */}
          <Box
            sx={{
              position: "absolute",
              top: "15px",
              left: "12px",
              width: "32px",
              height: "28px",
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.2))",
              border: "2px solid #14b8a6",
              boxShadow: "inset 0 0 15px rgba(20, 184, 166, 0.6), 0 0 20px rgba(20, 184, 166, 0.4)",
            }}
          />

          {/* Ventana derecha */}
          <Box
            sx={{
              position: "absolute",
              top: "15px",
              right: "12px",
              width: "32px",
              height: "28px",
              background: "linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.2))",
              border: "2px solid #14b8a6",
              boxShadow: "inset 0 0 15px rgba(20, 184, 166, 0.6), 0 0 20px rgba(20, 184, 166, 0.4)",
            }}
          />

          {/* Puerta */}
          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "28px",
              height: "40px",
              background: "linear-gradient(180deg, #1e293b, #0f172a)",
              border: "2px solid #14b8a6",
              borderRadius: "3px 3px 0 0",
            }}
          />

          {/* Logo CVF en la caseta */}
          <Box
            sx={{
              position: "absolute",
              top: "52px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "9px",
              fontWeight: 700,
              color: "#14b8a6",
              textShadow: "0 0 10px rgba(20, 184, 166, 0.8)",
            }}
          >
            CVF
          </Box>
        </Box>

        {/* Base de la pluma - Poste moderno */}
        <Box
          sx={{
            position: "absolute",
            bottom: "25px",
            left: "calc(15% + 110px)",
            width: "25px",
            height: "80px",
            background: "linear-gradient(90deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            borderRadius: "3px",
            boxShadow: "0 0 25px rgba(20, 184, 166, 0.4), inset 0 0 10px rgba(0, 0, 0, 0.5)",
            border: "2px solid #14b8a6",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "18px",
              height: "60px",
              background: "linear-gradient(180deg, transparent, rgba(20, 184, 166, 0.3), transparent)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-8px",
              left: "-15px",
              width: "55px",
              height: "12px",
              background: "linear-gradient(90deg, #1e293b, #334155, #1e293b)",
              borderRadius: "6px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
            }
          }}
        />

        {/* Caja de control en el poste */}
        <Box
          sx={{
            position: "absolute",
            bottom: "50px",
            left: "calc(15% + 95px)",
            width: "55px",
            height: "35px",
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            borderRadius: "4px",
            border: "2px solid #14b8a6",
            boxShadow: "0 0 20px rgba(20, 184, 166, 0.5), inset 0 0 10px rgba(20, 184, 166, 0.2)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "8px",
              left: "8px",
              width: "10px",
              height: "10px",
              background: "#22c55e",
              borderRadius: "50%",
              boxShadow: "0 0 10px #22c55e",
              animation: `${lightBlink} 2s ease-in-out infinite`,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "10px",
              height: "10px",
              background: "#ef4444",
              borderRadius: "50%",
              boxShadow: "0 0 10px #ef4444",
              animation: `${lightBlink} 2s ease-in-out infinite`,
              animationDelay: "1s",
            }
          }}
        />

        {/* Brazo de la pluma - Diseño moderno */}
        <Box
          sx={{
            position: "absolute",
            bottom: "105px",
            left: "calc(15% + 110px)",
            width: "180px",
            height: "10px",
            background: "linear-gradient(90deg, #1e293b 0%, #334155 50%, #1e293b 100%)",
            transformOrigin: "left center",
            animation: `${barrierUp} 10s ease-in-out infinite`,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
            border: "2px solid #475569",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-8px",
              left: "0",
              width: "100%",
              height: "6px",
              background: "repeating-linear-gradient(90deg, #ef4444 0px, #ef4444 20px, #ffffff 20px, #ffffff 25px, #ef4444 25px, #ef4444 45px, #ffffff 45px, #ffffff 50px)",
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "10px",
              left: "0",
              width: "100%",
              height: "6px",
              background: "repeating-linear-gradient(90deg, #ef4444 0px, #ef4444 20px, #ffffff 20px, #ffffff 25px, #ef4444 25px, #ef4444 45px, #ffffff 45px, #ffffff 50px)",
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
            }
          }}
        />

        {/* Contrapeso de la pluma */}
        <Box
          sx={{
            position: "absolute",
            bottom: "105px",
            left: "calc(15% + 75px)",
            width: "35px",
            height: "18px",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            transformOrigin: "right center",
            animation: `${barrierUp} 10s ease-in-out infinite`,
            boxShadow: "0 4px 15px rgba(251, 191, 36, 0.6), inset 0 -2px 5px rgba(0, 0, 0, 0.3)",
            border: "2px solid #fef08a",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#1e293b",
              borderRadius: "50%",
            }
          }}
        />

        {/* Luz de advertencia superior */}
        <Box
          sx={{
            position: "absolute",
            bottom: "113px",
            left: "calc(15% + 280px)",
            width: "16px",
            height: "16px",
            background: "radial-gradient(circle, #fef08a, #fbbf24)",
            borderRadius: "50%",
            animation: `${lightBlink} 1s ease-in-out infinite`,
            boxShadow: "0 0 25px #fef08a, 0 0 40px rgba(254, 240, 138, 0.5)",
            border: "3px solid #fbbf24",
            transformOrigin: "left center",
            animation: `${barrierUp} 10s ease-in-out infinite, ${lightBlink} 1s ease-in-out infinite`,
          }}
        />
      </Box>

      {/* Carro mejorado - De extremo a extremo */}
      <Box
        sx={{
          position: "absolute",
          bottom: "5.5%",
          left: "-20%",
          animation: `${carDrive} 12s ease-in-out infinite`,
          zIndex: 6,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "90px",
            height: "40px",
            background: "linear-gradient(180deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)",
            borderRadius: "12px 12px 4px 4px",
            boxShadow: "0 6px 25px rgba(14, 165, 233, 0.6), inset 0 -2px 10px rgba(0, 0, 0, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Techo */}
          <Box
            sx={{
              position: "absolute",
              top: "-20px",
              left: "20px",
              width: "50px",
              height: "20px",
              background: "linear-gradient(180deg, #0284c7 0%, #0369a1 100%)",
              borderRadius: "8px 8px 0 0",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "inset 0 -2px 5px rgba(0, 0, 0, 0.2)",
            }}
          />

          {/* Parabrisas */}
          <Box
            sx={{
              position: "absolute",
              top: "-17px",
              left: "23px",
              width: "20px",
              height: "16px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(191, 219, 254, 0.4))",
              borderRadius: "4px 4px 0 0",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          />

          {/* Ventana trasera */}
          <Box
            sx={{
              position: "absolute",
              top: "-17px",
              right: "23px",
              width: "20px",
              height: "16px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(191, 219, 254, 0.4))",
              borderRadius: "4px 4px 0 0",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          />

          {/* Faros delanteros */}
          <Box
            sx={{
              position: "absolute",
              top: "14px",
              right: "4px",
              width: "10px",
              height: "8px",
              background: "radial-gradient(circle, #fef08a, #fbbf24)",
              borderRadius: "50%",
              boxShadow: "0 0 20px #fef08a, 25px 0 60px rgba(254, 240, 138, 0.5)",
              border: "2px solid #ffffff",
            }}
          />

          {/* Luces traseras */}
          <Box
            sx={{
              position: "absolute",
              top: "14px",
              left: "4px",
              width: "8px",
              height: "6px",
              background: "#ef4444",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)",
              border: "1px solid #ffffff",
            }}
          />

          {/* Rueda delantera */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-10px",
              right: "12px",
              width: "22px",
              height: "22px",
              background: "radial-gradient(circle, #1f2937 40%, #0f172a 100%)",
              borderRadius: "50%",
              border: "3px solid #475569",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.5)",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "8px",
                height: "8px",
                background: "#94a3b8",
                borderRadius: "50%",
                animation: `${wheelSpin} 0.5s linear infinite`,
                border: "2px solid #64748b",
              }
            }}
          />

          {/* Rueda trasera */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-10px",
              left: "12px",
              width: "22px",
              height: "22px",
              background: "radial-gradient(circle, #1f2937 40%, #0f172a 100%)",
              borderRadius: "50%",
              border: "3px solid #475569",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.5)",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "8px",
                height: "8px",
                background: "#94a3b8",
                borderRadius: "50%",
                animation: `${wheelSpin} 0.5s linear infinite`,
                border: "2px solid #64748b",
              }
            }}
          />

          {/* Espejo retrovisor */}
          <Box
            sx={{
              position: "absolute",
              top: "8px",
              right: "-6px",
              width: "8px",
              height: "4px",
              background: "#334155",
              borderRadius: "2px",
              border: "1px solid #64748b",
            }}
          />
        </Box>
      </Box>

      {/* Estrellas brillantes con twinkle */}
      {[...Array(40)].map((_, i) => (
        <Box
          key={`star-${i}`}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 5}px`,
            height: `${2 + Math.random() * 5}px`,
            background: i % 3 === 0 ? "rgba(20, 184, 166, 0.8)" : i % 3 === 1 ? "rgba(6, 182, 212, 0.8)" : "rgba(14, 165, 233, 0.8)",
            borderRadius: "50%",
            animation: `${twinkle} ${1.5 + Math.random() * 2.5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: `0 0 ${15 + Math.random() * 10}px ${i % 3 === 0 ? "rgba(20, 184, 166, 0.8)" : i % 3 === 1 ? "rgba(6, 182, 212, 0.8)" : "rgba(14, 165, 233, 0.8)"}`,
          }}
        />
      ))}

      {/* Ondas expansivas */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={`wave-${i}`}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            border: "2px solid rgba(20, 184, 166, 0.3)",
            borderRadius: "50%",
            animation: `${wave} ${4 + i}s ease-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Rayos de luz */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={`ray-${i}`}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "3px",
            height: "40%",
            background: `linear-gradient(180deg, transparent, rgba(20, 184, 166, 0.15), transparent)`,
            transformOrigin: "top center",
            transform: `rotate(${i * 45}deg)`,
            animation: `${rotate} 20s linear infinite`,
            filter: "blur(1px)",
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "70px",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid rgba(20, 184, 166, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{
            background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
            borderRadius: "10px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <img 
              src="../src/assets/img/LOGOTIPO.png" 
              alt="Logo" 
              style={{ height: "40px", filter: "brightness(0) invert(1)" }} 
            />
          </Box>
          <Box>
            <Typography 
              variant="h5" 
              fontWeight={700}
              sx={{
                background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CONTROL DE VISITAS
            </Typography>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" fontWeight={500}>
              ACCESO WEB
            </Typography>
          </Box>
        </Box>
      </Box>

      <Card
        sx={{
          width: 440,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(30px)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6), 0 0 60px rgba(20, 184, 166, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.1)",
          borderRadius: "28px",
          animation: `${fadeIn} 0.8s ease-out`,
          padding: 4,
          border: "3px solid transparent",
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.98)), linear-gradient(135deg, rgba(20, 184, 166, 0.5), rgba(6, 182, 212, 0.5))",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          position: "relative",
          zIndex: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: "28px",
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.4), rgba(6, 182, 212, 0.4), rgba(14, 165, 233, 0.4))",
            backgroundSize: "200% 200%",
            animation: `${gradientShift} 5s ease infinite`,
            filter: "blur(8px)",
            zIndex: -1,
            opacity: 0.6,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "28px",
            background: "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            animation: `${shimmer} 3s infinite`,
            pointerEvents: "none",
          }
        }}
      >
        <CardContent>
          <Typography 
            variant="h4" 
            fontWeight={700} 
            textAlign="center" 
            mb={3}
            sx={{
              color: "#0f172a",
            }}
          >
            Iniciar Sesión
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Usuario o correo"
                type="text"
                variant="outlined"
                placeholder="Ingresa tu usuario o correo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#14b8a6",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#fff",
                      "& fieldset": {
                        borderColor: "#14b8a6",
                        borderWidth: "2px",
                      }
                    }
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#14b8a6",
                    fontWeight: 600,
                  }
                }}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    transition: "all 0.3s ease",
                    "&:hover fieldset": {
                      borderColor: "#14b8a6",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#fff",
                      "& fieldset": {
                        borderColor: "#14b8a6",
                        borderWidth: "2px",
                      }
                    }
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#14b8a6",
                    fontWeight: 600,
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handlePasswordToggle} 
                        edge="end"
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "rgba(20, 184, 166, 1)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(6, 182, 212, 1)",
                            transform: "scale(1.05)",
                          }
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            {errorMsg && (
              <Box 
                sx={{
                  backgroundColor: "#fee2e2",
                  border: "1px solid #ef4444",
                  borderRadius: "8px",
                  padding: "12px",
                  mb: 2,
                }}
              >
                <Typography color="#dc2626" variant="body2" fontWeight={500}>
                  {errorMsg}
                </Typography>
              </Box>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              onMouseDown={() => {
                clickSound.play();
                if (navigator.vibrate) navigator.vibrate(50);
              }}
              sx={{
                background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                color: "white",
                fontWeight: 700,
                padding: "14px",
                borderRadius: "12px",
                letterSpacing: "1px",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 14px rgba(20, 184, 166, 0.4)",
                textTransform: "uppercase",
                "&:hover": {
                  background: "linear-gradient(135deg, #0d9488, #0891b2)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(20, 184, 166, 0.5)",
                },
                "&:active": {
                  transform: "translateY(0)",
                }
              }}
            >
              INGRESAR
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
