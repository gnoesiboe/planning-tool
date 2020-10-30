import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { PlanningContextProvider } from '../context/planning/PlanningContext';
import { ToastContainer } from 'react-toastify';
import { Navbar } from 'react-bootstrap';
import MainNavigation from '../components/mainNavigation/MainNavigation';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>Freshheads</Navbar.Brand>
            <MainNavigation />
        </Navbar>
        <div className="container-fluid page-content">
            <PlanningContextProvider>
                <Component {...pageProps} />
            </PlanningContextProvider>
            <ToastContainer />
        </div>
    </>
);

export default MyApp;
