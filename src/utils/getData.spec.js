const { getHistoricalData, parseCSVData } = require('./getData');

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(csv),
  })
);

describe('getData util', () => {
    it('should call the api', () => {
        const res = getHistoricalData();
        expect(fetch).toHaveBeenCalledWith(
            'http://kaboom.rksv.net/api/historical'
        );
    });
    it('should parse csv data', () => {
        const res = parseCSVData("[\"1308594600000,839.9,855,837.3,848.65,3980489,\"]");
        expect(res).toEqual([{"close": 848.65, "date": new Date(1308594600000), "high": 855, "low": 837.3, "open": 839.9, "volume": 3980489}]);
    });
});