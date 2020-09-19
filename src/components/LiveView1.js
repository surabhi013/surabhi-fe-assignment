import OHLCChart from "./OHLCChart";

const LiveView = ({error, parsedData}) => {

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