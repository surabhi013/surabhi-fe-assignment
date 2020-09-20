const { getHistoricalData } = require('./getData');

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
});