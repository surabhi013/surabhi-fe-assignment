import Chart from '../libs/Chart';

const OHLCChart = ({data}) => {
    return (
        <React.Fragment>
        {!data || data.length === 0 ?
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
            </div> :
            <Chart data={data} />
        }
        </React.Fragment>
    )
}

export default OHLCChart;