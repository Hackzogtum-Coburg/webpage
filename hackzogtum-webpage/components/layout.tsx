import { PropsWithChildren } from 'react'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
