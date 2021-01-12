const Inventory = require('../models/inventory.js');

const baitList = ['🧂', '🍗', '🦍', '🥚', '💣', '🥨', '👂', '🦐', '🧀', '👶', '🐍', '🍎', '🇧🇷', '🤺', '🐌', '🐀', '🩸', '🏹', '🎈', '🐛', '🍆', '🍪', '🔥', '🐬', '🔪', '🧑‍🦼', '🐅', '🍌', '💩', '🔫', '🐳', '🥾', '🇺🇸', '🥄', '🍕', '🥃', '🎣', '🦴', '🥜', '🌵', '🍩', '🍣', '🧠', '🦀', '🔨', '🍄', '🦠', '🧼', '🍺', '🤡']

module.exports = {
	name: '!parasect',
	cooldown: 3,
	cooldownMsg: 'the crabs all went home! Come back in a few hours to catch some more!',
	async execute(message) {
		let bait1 = baitList[Math.round(Math.random() * (baitList.length - 1))];
		let bait2 = baitList[Math.round(Math.random() * (baitList.length - 1))];
		let bait3 = baitList[Math.round(Math.random() * (baitList.length - 1))];
		
		let crabs = 0;
		let crabChance = Math.random() * 100;
		switch(true){
			case (crabChance < 60): default: crabs = Math.floor(Math.random() * 5) + 1; break;
			case (crabChance < 90): crabs = Math.floor(Math.random() * 5) + 6; break;
			case (crabChance < 99): crabs = Math.floor(Math.random() * 5) + -5; break;
			case (crabChance < 100): crabs = 25; break;
		}

		let doc = await Inventory.findOne({userID: message.author.id});
		
		message.channel.send('So you wanna go crab fishing eh?');
		message.reply(`choose your bait:  ${bait1}  |  ${bait2}  |  ${bait3}`).then(msg => {

			Promise.all([msg.react(bait1), msg.react(bait2), msg.react(bait3)]);
			return msg;

		}).then((msg) => msg.awaitReactions(

			(reaction, user) => [bait1, bait2, bait3].includes(reaction.emoji.name) && user.id === message.author.id,
			{max: 1, time: 10000, errors: ['time']}).then(collected => (selectedBait = collected.first().emoji.name) && msg)
			.catch(() => message.reply('you took too long! The crabs all ran away ☹️') && Promise.reject("User never responded!"))
		)
		.then(async msg => 
			(doc ? await doc.updateOne({crabs: doc.crabs + crabs}) : await Inventory.create({userID: message.author.id, crabs: crabs})) 
			&& msg.channel.send('Alright... time to catch some crabs!')
		)
		.then(async msg => { await new Promise(r => setTimeout(r, 2000)); return msg.edit('\\'); })
		.then(async msg => { await new Promise(r => setTimeout(r, 1000)); return msg.edit('|'); })
		.then(async msg => { await new Promise(r => setTimeout(r, 1000)); return msg.edit('/\\`\\`\\`\\`'); })
		.then(async msg => { await new Promise(r => setTimeout(r, 1500)); return msg.edit('/\\`\\`\\`\\`\\`\\`\\`\\`'); })
		.then(async msg => { await new Promise(r => setTimeout(r, 1500)); return msg.edit('/\\`\\`\\`\\`\\`\\`\\`\\`\\`\\`\\`\\`'); })
		.then(async msg => { await new Promise(r => setTimeout(r, 1500)); return msg.edit('/\\`\\`\\`\\`\\`\\`\\`\\`\\`\\`\\`\\`' + selectedBait); })
		.then(async msg => { await new Promise(r => setTimeout(r, 1500)); return msg.edit(`Congrats ${message.author}, you've caught ${crabs}  🦀 !`); })
		.then(msg => msg.channel.send(`You now have ${doc ? doc.crabs + crabs : crabs}  🦀 ! Make sure to spend them at the !shop.`))
		.catch(err => console.log(err));
	}
}