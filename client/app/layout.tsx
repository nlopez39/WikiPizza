import { NavLinks } from '@/app/ui/nav-links'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavLinks/>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}