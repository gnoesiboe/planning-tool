import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { PlanningContextProvider } from '../context/planning/PlanningContext';
import { ToastContainer } from 'react-toastify';
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand>Freshheads</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link href="/">
                        <Nav.Link href="/">Planning</Nav.Link>
                    </Link>
                    <Link href="/projects">
                        <Nav.Link href="/projects">Projects</Nav.Link>
                    </Link>
                </Nav>
            </Navbar>
            <div className="container-fluid page-content">
                <PlanningContextProvider>
                    <Component {...pageProps} />
                </PlanningContextProvider>
                <ToastContainer />
            </div>
        </>
    );
}

export default MyApp;
