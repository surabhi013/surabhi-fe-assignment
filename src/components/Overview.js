import OHLCChart from "./OHLCChart";

const Overview = ({data}) => {
    return(
        <React.Fragment>
            <div className="container"><h3>Historical Data</h3></div>
            {data &&
                <OHLCChart data={data} />
            }
        </React.Fragment>
    )
};

export default Overview;