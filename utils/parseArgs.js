const regex = /[^\s"]+|"([^"]*)"/gi;

module.exports = (message, test) => {
	let arr = [];
	let match = null;

	do {
		match = regex.exec(message);
		if(match !== null){
			arr.push(match[1] ? match[1] : match[0])
		}
	} while(match !== null);

	return arr;
}