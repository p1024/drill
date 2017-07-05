const htmlEntityMap = require('./entityMap.js');
const tagSet = require('./tagSet.js');

let convertEntity = (str)=> {
	return str.replace(/&.*?;/g, entity=>entity in htmlEntityMap ? htmlEntityMap[entity]['character']:entity);
};

let trimTag = (str) => {
	return str.replace(/<.*?>/g, tag=>tagSet.has(tag) ? '' : tag);
}

module.exports = {convertEntity, trimTag};