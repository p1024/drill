const assert = require('assert');
const {js} = require('../');
describe('js', function () {
	describe('js.jsonp()', function () {
		it('should return the correct result', function () {
			let transTarget = {name: 'foo'};
			let jsonp = `callback({name:'foo'})`;
			let result = js.jsonp(jsonp, 'callback');
			assert.deepEqual(result, transTarget);
		});
	});
});