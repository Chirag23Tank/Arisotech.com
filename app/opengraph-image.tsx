import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Arisotech HRMS: HR and payroll software for growing Indian companies'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#ffffff',
          color: '#13203b',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, color: '#2563eb' }}>Arisotech</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Payday, without the month-end scramble.
          </div>
          <div style={{ fontSize: 32, marginTop: 24, color: '#3a4660' }}>
            HR, attendance, leave and payroll with PF, ESI, PT and TDS built in.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              border: '4px solid #18805a',
              color: '#18805a',
              borderRadius: 8,
              padding: '6px 16px',
              fontSize: 30,
              fontWeight: 800,
              transform: 'rotate(-4deg)',
            }}
          >
            Paid
          </div>
          <div style={{ fontSize: 30, color: '#5b6578' }}>142 employees, March payroll</div>
        </div>
      </div>
    ),
    size
  )
}
