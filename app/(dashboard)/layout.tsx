
export const metabase = {
  title: 'Next.js',
  sedcription: 'Generated with Next.js'
}

export default function DashboardLayout({ children }: {children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}