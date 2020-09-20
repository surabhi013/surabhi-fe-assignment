import OHLCChart from './OHLCChart';

const Overview = ({data}) => {
    return(
        <div className='container'>
            <h3>Historical Data</h3>
            {data &&
                <OHLCChart data={data} />
            }
        </div>
    )
};

export default Overview;