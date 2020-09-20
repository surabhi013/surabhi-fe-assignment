import Chart from '../libs/Chart';

const OHLCChart = ({data}) => {
    return (
        <React.Fragment>
        {data && data.length > 2 &&
            <Chart data={data} />
        }
        </React.Fragment>
    )
}

export default OHLCChart;