import Head from 'next/head';
import { useState, useEffect } from 'react';
import Overview from '../src/components/Overview';
import LiveView from '../src/components/LiveView';
import Tabs from '../src/components/Tabs';
import ErrorBoundary from '../src/components/ErrorBoundary';
import { getHistoricalData } from '../src/utils/getData';

const MyDashboard = () => {
    const [view, setView] = useState('overview');
    const [error, setError] = useState('');
    const [historicalData, setHistoricalData] = useState([]);
    const noData = historicalData.length === 0;
    
    useEffect(() => {
        let isSubscribed = true;
        if(noData) {
            async function setData() {
                getHistoricalData().then(data => (isSubscribed ? setHistoricalData(data) : null))
                .catch(error => (isSubscribed ? setError(error.toString()) : null));
            };
            setData();
        }
        return () => (isSubscribed = false);
    }, [noData]);

    useEffect(() => {
        // Register service worker
        if(typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service worker registered'))
                .catch(err => console.log(`Service worker error: ${err}`));
            });
        }

        // Unregister
        return () => {
            if(typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations()
                .then(function(registrations) {
                    for(let registration of registrations) {
                        registration.unregister();
                    }
                });
            }   
        }
    }, []);

    return(
        <div>
            <Head>
                <title>Upstox</title>
                <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
            </Head>
            <Tabs setView={setView} /> 
            <ErrorBoundary>
                {view === 'overview' && <Overview data={historicalData} />}
                {view === 'liveview' && <LiveView historicalData={historicalData} setHistoricalData={setHistoricalData}/>}
            </ErrorBoundary>
            <div className='container'>
                {noData && !error && <h5>Loading data....</h5>}
                {error}
            </div>
        </div>
    )
}

export default MyDashboard;