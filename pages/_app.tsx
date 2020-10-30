import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { PlanningContextProvider } from '../context/planning/PlanningContext';
import { ToastContainer } from 'react-toastify';
import MainNavigation from '../components/mainNavigation/MainNavigation';
import MainHeader from '../components/mainHeader/MainHeader';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <MainHeader>
            <MainNavigation />
        </MainHeader>
        <div className="container-fluid page-content">
            <PlanningContextProvider>
                <Component {...pageProps} />
            </PlanningContextProvider>
            <ToastContainer />
        </div>
    </>
);

export default MyApp;
