const CrearButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
        color: 'white',
        padding: '12px 28px',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: '15px',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '1rem',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        textTransform: 'uppercase',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(20, 184, 166, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(20, 184, 166, 0.4)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px) scale(0.98)';
      }}
    >
      <span style={{ 
        fontSize: '26px', 
        color: 'white',
        fontWeight: '300',
        textShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        +
      </span> 
      <span style={{ textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        Crear Nuevo
      </span>
    </button>
  );
  
  export default CrearButton;