import { useEffect, useState } from 'react';
import { parseCSVData } from '../utils/getData';
import OHLCChart from './OHLCChart';

const io = require('socket.io-client');
const watch = io.connect('http://kaboom.rksv.net/watch');

const LiveView = ({historicalData}) => {
    const parseFromStorage = (entries) => {
        const res = entries ? entries.map(e => {
            return {
                ...e,
                date: new Date(e.date)
            };
        }) : null;
        return res;
    }
    const [error, setError] = useState('');
    const [liveData, setLiveData] = useState(parseFromStorage(JSON.parse(localStorage.getItem('liveData'))) || historicalData || []);    
    let timer = null;

    useEffect(() => {
        watch.emit('ping', {});
        watch.emit('sub', {state: true});
        timer = setTimeout(() => {
            watch.on('data', function(data, ack) {
                // Set updated data in local storage
                localStorage.setItem('liveData', JSON.stringify([...liveData, ...parseCSVData(data)]));
                // Get from local storage and set state
                setLiveData(parseFromStorage(JSON.parse(localStorage.getItem('liveData'))));
                ack(1);
            });
        }, 100);
        watch.on('error', function(error) {
            setError(error.toString());
        });
        return () => {
            watch.emit('unsub', {state: false});
            clearTimeout(timer);
        }
    }, [liveData]);

    return(
        <div className='container'>
            <h3>Live View</h3>
            {error ? <div>{error}</div> : <OHLCChart data={liveData} />}
        </div>
    )
}

export default LiveView;