export default function Loading() {
  return (
    <div className="organic-theme" style={{ minHeight: '100vh', padding: 'var(--space-8)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
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
          <p style={{ color: '#201e1d', opacity: 0.7, fontSize: '15px' }}>Loading countries...</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="organic-card"
              style={{
                padding: 'var(--space-4)',
                height: '240px',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '140px',
                  background: 'rgba(32, 30, 29, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-3)',
                }}
              />
              <div
                style={{
                  width: '60%',
                  height: '20px',
                  background: 'rgba(32, 30, 29, 0.1)',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </div>
  )
}
