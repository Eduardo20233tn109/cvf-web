import logo from "../assets/img/LOGOTIPO.png";

const Header = () => {
  return (
    <div
      className="w-100 py-3 px-4 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
        backdropFilter: "blur(10px)",
        height: "120px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        borderBottom: "1px solid rgba(102, 126, 234, 0.15)",
      }}
    >
      <div style={{
        padding: "12px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(102, 126, 234, 0.35)",
        transition: "transform 0.3s ease",
      }}>
        <img 
          src={logo} 
          alt="Logo" 
          style={{ 
            width: "140px", 
            height: "auto",
            filter: "brightness(0) invert(1)",
          }} 
        />
      </div>
      <div className="text-center flex-grow-1">
        <h2 
          className="fw-bold text-uppercase mb-1"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "32px",
            letterSpacing: "1px",
          }}
        >
          Control de Visitas
        </h2>
        <h5 
          className="fw-bold text-uppercase mb-0"
          style={{
            color: "#64748b",
            fontSize: "18px",
            letterSpacing: "2px",
          }}
        >
          A Fraccionamiento
        </h5>
      </div>
    </div>
  );
};

export default Header;
