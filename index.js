const Discord = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const client= new Discord.Client();
const fs = require('fs');
const BOT_TOKEN=appConfig.token
const { parse } = require('csv-parse');
const csvPath=('./chanel-config.csv');
let botName;
const prefix = '!';
let config ;

client.on('ready', async ()  => {
  console.log(`Logged in as ${client.user.tag}!`);
  botName=client.user.tag;
  config=await readCsvFile()
  console.log(config)
});


client.on('message', async message => {
	if(!message.content.startsWith(prefix)||message.author.bot){
	console.log(`${message.author.tag} said: ${message.content}`);
	if(message.author.tag!=botName){
		get_Linked_ChanellID(message.channel.id,message.content,message.author.tag)
		}
		return;
	}
	
	const args = message.content.slice(prefix.length).split(/ -/);
	if (args[0]=="linkChanells"&&args.length==3||args[0]=="lc"&&args.length==3){
		create_Chanell_Config(args[1],args[2])
	}
	if (args[0]=="llc"||args[0]=="listLinkedChanells") {
		const id =message.channel.id
		listLinkedChanels(id, config)
	}
	else if (args[0]=="linkChanells"&&args.length!=3||args[0]=="lc"&&args.length!=3) {
		client.channels.cache.get(message.channel.id).send("You tryed to use the lc(linkChanels)command but you forgot to add the arguments  \n for example **"+prefix+"lc -[firstId] -[secondID]**")
	}
	else if(args[0]=="id"){
		client.channels.cache.get(message.channel.id).send("This chanells id is :"+message.channel.id)
	}
	else if(args[0]=="h"||args[0]=="help"){
		client.channels.cache.get(message.channel.id).send('Commands: \n **!lc** **-**<**firstChanellID**> **-**<**secondChanellID**>   [links chanells ] \n **!llc**  [lists linked chanels] \n **!id**   [show the current id] \n **!h**   [shows this message]')
	}



  });
  

client.on('channelCreate', channel => {
  console.log(`${channel.name} has been created in ${channel.guild.name}`);
});
function create_Chanell_Config(sourceID,DestinationID){
	fs.readFile(csvPath, 'utf8', function(err, data){
		console.log("Read: "+data);
		data=data+"\n"+sourceID+","+DestinationID;
		fs.writeFile(csvPath, data, function(err) {
			if(err) {
				return console.log(err);
			}
			
			console.log("File sucesfully edited");
		}); 
	});

	

}
async function get_Linked_ChanellID(ID,message,author){
	const results = await readCsvFile();

		for (let index = 0; index < results.length; index++) {
			if (results[index].firstID==ID) {
				console.log("Sended message :"+message+" as user "+author+"   ["+results[index].secondID+"]")
				client.channels.cache.get(results[index].secondID).send(author+": "+message)		
			}
		}
}
async function listLinkedChanels(chanellID,results){
	results =await readCsvFile()
	let msg = "Here are the current linked chanells:";	
	client.channels.cache.get(chanellID).send(msg)

		for (let index = 0; index < results.length; index++) {
			msg = "Source: #**"+client.channels.cache.get(results[index].firstID).name+"**  id:["+results[index].firstID+"]"+ 'to ==> Destination: #**'  +client.channels.cache.get(results[index].secondID).name+"**  id:[" + results[index].secondID+"]"
			client.channels.cache.get(chanellID).send(msg)

			console.log(msg)
		}
}


async function readCsvFile() {
	try {
	const fileContents = await fs.promises.readFile(csvPath);
    const parser = parse(fileContents, { columns: true });
	const records = [];
  
	parser.on('readable', () => {
		let record;
		while ((record = parser.read())) {
		records.push(record);
		}
	});
	await new Promise((resolve, reject) => {
		parser.on('end', () => {
		resolve();
		});
		parser.on('error', (error) => {
			reject(error);
		});
	});
	return records;
	} catch (error) {
		console.error(error);
		return null;
	}
  }
  
  
client.login(token);
