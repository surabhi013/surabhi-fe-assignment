import { useEffect, useState } from 'react';
import { parseCSVData } from '../utils/getData';
import OHLCChart from "./OHLCChart";

const io = require("socket.io-client");
const watch = io.connect('http://kaboom.rksv.net/watch');

const LiveView = ({historicalData}) => {
    const [error, setError] = useState('');
    const [parsedData, setParsedData] = useState(historicalData || []);    
    
    useEffect(() => {
        watch.emit('ping', {})
        watch.emit('sub', {state: true})
        watch.on('data', function(data, ack) {
            setParsedData([...parsedData, ...parseCSVData(data)]);
            ack(1);
        })
        watch.on('error', function(error) {
            setError(error.toString());
        })
        return () => {
            watch.emit('unsub', {state: false})
        }
    }, [parsedData]);

    return(
        <React.Fragment>
            <div className="container"><h3>Live View</h3></div>
            {error ? 
                <div className="container">
                    {error}
                </div> : 
                <OHLCChart data={parsedData} />
            }
        </React.Fragment>
    )
}

export default LiveView;