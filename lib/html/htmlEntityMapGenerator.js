const request = require('bluebird').promisifyAll(require('request'), {multiArgs: true});
const cheerio = require('cheerio');
const util = require('util');
const fs = require('fs');

const generate = async (fpath='htmlEntityMap.js')=> {
	let uri = `https://dev.w3.org/html5/html-author/charref`;
	let [,html] = await request.getAsync(uri);
	let $ = cheerio.load(html);
	let resultList = {};
	$('tr').each((idx, ele)=>{
		let char = $(ele);
		let nameList = char.find('.named code').text().trim().split(' ');
		let hex = char.find('.hex code').text().trim();
		let character = String.fromCodePoint(parseInt('0'+hex.slice(2, -1), 16))
		let charMes = {
			character: character,
			hex: hex,
			dec: char.find('.dec code').text().trim(),
			desc: char.find('.desc code').text().trim()
		};

		nameList.forEach(name=>resultList[name] = charMes);
	});
	const writeFile = util.promisify(fs.writeFile);
	await writeFile(fpath, `/**
 * source: https://dev.w3.org/html5/html-author/charref
 */
module.exports = ${JSON.stringify(resultList)}`);
}

if(require.main === module) {
	generate();
} else {
	module.exports = generate();
}
