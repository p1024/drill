const assert = require('assert');
const {html} = require('../');
describe('html', function () {
	describe('html.trimTag()', function () {
		it('should trim all the html tags', function () {
			let oriStr = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus error saepe, beatae quam sit tempora rem, dolores dolorem expedita voluptas esse, ipsa consequuntur quo hic. Ea, odit cum corrupti nulla.';
			let htmlTags = ['<a>', '<html>', '<em>', '<p>', '</block>'];
			let testStr = oriStr;
			for(let i=0; i<htmlTags.lengths; i++) {
				let idx = Math.floor(testStr.length*Math.random())
				testStr = testStr.slice(0, idx) + htmlTags[i] + testStr.slice(idx);
			}
			assert.equal(html.trimTag(testStr), oriStr);
		});

		it('should keep the tags that looks like html tag', function () {
			let oriStr = 'Lorem ipsum dolor sit amet, consectetur <notHtmlTag> adipisicing elit. Delectus error saepe, beatae quam sit tempora rem, dolores dolorem expedita voluptas esse, ipsa consequuntur quo hic. Ea, odit </notHtmlTag> cum corrupti nulla.';
			assert.equal(html.trimTag(oriStr), oriStr);
		});
	});

	describe('html.convertEntity()', function () {
		it('should convert the html entity to the correct character', function () {
			let testStr = '{&quot;songItem&quot;:{&quot;sid&quot;:18415180,&quot;author&quot;:&quot;&lt;em&gt;\u536b\u5170&lt;\/em&gt;&quot;,&quot;sname&quot;:&quot;\u4e3b\u89d2\u7231\u6211&quot;,&quot;oid&quot;:18415180,&quot;pay_type&quot;:&quot;0&quot;,&quot;isJump&quot;:0}}';
			assert.equal(html.convertEntity(testStr), '{"songItem":{"sid":18415180,"author":"<em>卫兰</em>","sname":"主角爱我","oid":18415180,"pay_type":"0","isJump":0}}');
		});

		it('should keep the words that looks like html entity', function () {
			let oriStr = '{&notEntity;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus &notEntity; error saepe, beatae quam sit tempora rem, dolores &notEntity; dolorem expedita voluptas esse, ipsa consequuntur quo hic. Ea, odit cum corrupti nulla.';
			assert.equal(html.convertEntity(oriStr), oriStr);
		});
	})
});