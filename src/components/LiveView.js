import { useEffect, useState } from 'react';
import { parseCSVData } from '../utils/getData';
import OHLCChart from './OHLCChart';

const io = require('socket.io-client');
const watch = io.connect('http://kaboom.rksv.net/watch');

const LiveView = ({historicalData, setHistoricalData}) => {
    const [error, setError] = useState('');
    const [liveData, setLiveData] = useState(historicalData || []);    
    let timer = null;

    useEffect(() => {
        watch.emit('ping', {});
        watch.emit('sub', {state: true});
        timer = setTimeout(() => {
            watch.on('data', function(data, ack) {
                setLiveData([...liveData, ...parseCSVData(data)]);
                ack(1);
            });
        }, 100);
        watch.on('error', function(error) {
            setError(error.toString());
        });
        return () => {
            setHistoricalData(liveData);
            watch.emit('unsub', {state: false});
            clearTimeout(timer);
        }
    }, [liveData]);

    return(
        <React.Fragment>
            <div className='container'>
                <h3>Live View</h3>
                {error}
                {!error && <OHLCChart data={liveData} />}
            </div>
        </React.Fragment>
    )
}

export default LiveView;