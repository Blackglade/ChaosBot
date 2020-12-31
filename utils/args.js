const regex = /[^\s"]+|"([^"]*)"/gi;

const parseArgs = (message) => {
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

const printArgs = (args) => args.reduce((acc, cv) => acc + `\n • *${cv}*`, "")

module.exports = {
	parseArgs,
	printArgs
}