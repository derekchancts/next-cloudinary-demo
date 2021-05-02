import Head from 'next/head'
import Navbar from './Navbar'


const Layout = ({ children }) => {
  return (
    < >
    <Head>
      <title>Cloudinary Demo</title>
    </Head>
    <Navbar />
    {children}
    </>
  )
}

export default Layout
