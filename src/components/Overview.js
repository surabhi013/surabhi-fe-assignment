import OHLCChart from './OHLCChart';

const Overview = ({data}) => {
    return(
        <React.Fragment>
            <div className='container'>
                <h3>Historical Data</h3>
                {data &&
                    <OHLCChart data={data} />
                }
            </div>
        </React.Fragment>
    )
};

export default Overview;