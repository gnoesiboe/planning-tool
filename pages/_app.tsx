import { AppProps } from 'next/app';
import '../styles/global.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { PlanningContextProvider } from '../context/planning/PlanningContext';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="container-fluid">
            <PlanningContextProvider>
                <Component {...pageProps} />
            </PlanningContextProvider>
            <ToastContainer />
        </div>
    );
}

export default MyApp;
