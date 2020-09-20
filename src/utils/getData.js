import { csvParseRows } from 'd3-dsv';

function parseRows() {
	return function(d) {
        const epochSeconds = d[0]/1000;
		return {
            date: new Date(epochSeconds*1000),
            open: +d[1],
            high: +d[2],
            low: +d[3],
            close: +d[4],
            volume: +d[5]
        };
	};
}

export function getHistoricalData() {
	const res = fetch('http://kaboom.rksv.net/api/historical')
		.then(response => response.text())
        .then(data => parseCSVData(data))
        .catch(error => {
             throw error; 
        });
	return res;
}

export function parseCSVData(data) {
    data = data.split(',","').join('\n');
    data = data.substring(2, data.length - 3);
    return csvParseRows(data, parseRows());
}
