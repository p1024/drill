let jsonp = (jsonp, fnName)=> {
	eval(`var ${fnName} = new Function('a', '{return a}')`);
	return eval(jsonp);
}

module.exports = {
	jsonp
}