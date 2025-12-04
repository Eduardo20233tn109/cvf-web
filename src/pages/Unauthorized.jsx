import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Unauthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirigir al login después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoToLogin = () => {
    // Limpiar localStorage
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #0a0f1e 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Partículas de fondo */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `rgba(${i % 2 === 0 ? '20, 184, 166' : '6, 182, 212'}, 0.4)`,
            borderRadius: '50%',
            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: `0 0 10px rgba(${i % 2 === 0 ? '20, 184, 166' : '6, 182, 212'}, 0.5)`
          }}
        />
      ))}

      {/* Efectos de brillo en esquinas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle at top left, rgba(20, 184, 166, 0.08), transparent)',
        animation: 'pulse 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.08), transparent)',
        animation: 'pulse 6s ease-in-out infinite',
        animationDelay: '3s'
      }} />

      {/* Tarjeta principal */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
        borderRadius: '24px',
        padding: '48px 64px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 80px rgba(20, 184, 166, 0.1)',
        textAlign: 'center',
        maxWidth: '520px',
        animation: 'slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(20, 184, 166, 0.2)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Icono SVG de candado profesional */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            animation: 'pulseIcon 2s ease-in-out infinite'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm3 8H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3z" 
                fill="url(#lockGradient)" />
              <circle cx="12" cy="16" r="1.5" fill="#ef4444" />
              <rect x="11.25" y="16.5" width="1.5" height="2.5" rx="0.5" fill="#ef4444" />
              <defs>
                <linearGradient id="lockGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ef4444" />
                  <stop offset="1" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '12px',
          letterSpacing: '-0.5px'
        }}>
          Acceso No Autorizado
        </h1>

        {/* Mensaje principal */}
        <p style={{
          fontSize: '16px',
          color: '#94a3b8',
          marginBottom: '32px',
          lineHeight: '1.7',
          maxWidth: '400px',
          margin: '0 auto 32px'
        }}>
          No tienes permisos para acceder a esta página.
          <br />
          Por favor, inicia sesión con una cuenta válida.
        </p>

        {/* Badge de error */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderLeft: '4px solid #ef4444',
          padding: '16px 24px',
          marginBottom: '32px',
          borderRadius: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.1)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
            <path d="M12 8v4m0 4h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p style={{
            fontSize: '14px',
            color: '#fca5a5',
            margin: 0,
            fontWeight: '600',
            letterSpacing: '0.3px'
          }}>
            Error 401 • Sesión no válida o expirada
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={handleGoToLogin}
          style={{
            background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '16px 48px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3), 0 0 40px rgba(20, 184, 166, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 30px rgba(20, 184, 166, 0.5), 0 0 60px rgba(20, 184, 166, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(20, 184, 166, 0.3), 0 0 40px rgba(20, 184, 166, 0.1)';
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4l5-5-5-5m5 5H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ir al Login
          </span>
        </button>

        {/* Contador con animación */}
        <p style={{
          fontSize: '14px',
          color: '#64748b',
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 2s linear infinite' }}>
            <circle cx="12" cy="12" r="10" stroke="#64748b" strokeWidth="2" strokeDasharray="50" strokeDashoffset="10" strokeLinecap="round" />
          </svg>
          Redirección automática en 5 segundos...
        </p>
      </div>

      {/* Animaciones CSS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(239, 68, 68, 0.2); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(239, 68, 68, 0.4); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Unauthorized;
