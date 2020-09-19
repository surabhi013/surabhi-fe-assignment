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
    const [parsedData, setParsedData] = useState([]);    
    
    useEffect(() => {
        let isSubscribed = true;
        async function setData() {
            getHistoricalData().then(data => (isSubscribed ? setParsedData(data) : null))
            .catch(error => (isSubscribed ? setError(error.toString()) : null));
        };
        setData();

        return () => (isSubscribed = false);
    }, []);

    return(
        <div>
            <Head>
                <title>Upstox</title>
                <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
            </Head>
            <Tabs setView={setView} /> 
            <ErrorBoundary>
                {view === 'overview' && <Overview data={parsedData} />}
                {view === 'liveview' && <LiveView historicalData={parsedData}/>}
            </ErrorBoundary>
            {error && 
                <div className="container">
                    {error}
                </div>
            }
        </div>
    )
}

export default MyDashboard;