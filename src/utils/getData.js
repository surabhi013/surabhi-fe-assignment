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
		.then(response => {
            if (response.status === 200) {
                return response.text();
              } else {
                throw new Error(response.statusText);
              }
        })
        .then(data => parseCSVData(data))
        .catch(error => {
             throw new Error(error); 
        });
	return res;
}

export function parseCSVData(data) {
    // Parse data into an array of objects
    data = data.split(',","').join('\n');
    data = data.substring(2, data.length - 3);
    return csvParseRows(data, parseRows());
}
