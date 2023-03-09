import Header from "./Head"

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        {children}
    </>
  )
}

export default Layout