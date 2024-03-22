import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './app/home/page'
// import HeaderMainComponent from './utils/components/headers/HeaderMain.component'

function App() {

  return (
    <>
      <section>
        {/* <HeaderMainComponent /> */}
        <ToastContainer autoClose={3000} theme='colored' transition={Zoom} position='top-center' />
        <HomePage />
      </section>
    </>

  )
}

export default App
