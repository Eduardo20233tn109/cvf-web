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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px 60px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        textAlign: 'center',
        maxWidth: '500px',
        animation: 'slideIn 0.5s ease-out'
      }}>
        {/* Icono de candado */}
        <div style={{
          fontSize: '80px',
          marginBottom: '20px',
          color: '#dc2626'
        }}>
          🔒
        </div>

        {/* Título */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '10px'
        }}>
          Acceso No Autorizado
        </h1>

        {/* Mensaje */}
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          No tienes permisos para acceder a esta página.<br />
          Por favor, inicia sesión con una cuenta válida.
        </p>

        {/* Código de error */}
        <div style={{
          background: '#fee2e2',
          borderLeft: '4px solid #dc2626',
          padding: '12px 20px',
          marginBottom: '30px',
          borderRadius: '4px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#991b1b',
            margin: 0,
            fontWeight: '600'
          }}>
            Error 401: Sesión no válida o expirada
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={handleGoToLogin}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '14px 40px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          Ir al Login
        </button>

        {/* Contador */}
        <p style={{
          fontSize: '14px',
          color: '#9ca3af',
          marginTop: '20px'
        }}>
          Serás redirigido automáticamente en 5 segundos...
        </p>
      </div>

      {/* Animación CSS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Unauthorized;
