export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5ead8',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(198, 113, 57, 0.2)',
            borderTopColor: '#c67139',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto var(--space-3)',
          }}
        />
        <p style={{ color: '#201e1d', opacity: 0.7, fontSize: '15px' }}>Loading...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
