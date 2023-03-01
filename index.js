const Discord = require('discord.js');
const client = new Discord.Client();
const BOT_TOKEN = ""			//<=======Token here 
const fs = require('fs');
const csv = require('csv-parser');
const csvPath=('./chanel-config.csv');
let botName;
const prefix = '!';


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  botName=client.user.tag;
  readCsvFile()
  .then((results) => {
	console.log("Current config: ")
	console.log(results)
	})
});

client.on('message', message => {
	if(!message.content.startsWith(prefix)||message.author.bot){
	console.log(`${message.author.tag} said: ${message.content}`);
	if(message.author.tag!=botName){
		get_Linked_ChanellID(message.channel.id,message.content,message.author.tag)
		
	}}
	
	const args = message.content.slice(prefix.length).split(/ -/);
	console.log(args);

	if (args[0]=="linkChanells"&&args.length==3){
		create_Chanell_Config(args[1],args[2])
	}

  });

client.on('channelCreate', channel => {
  console.log(`${channel.name} has been created in ${channel.guild.name}`);
});
function create_Chanell_Config(sourceID,DestinationID){
	//let data="firstID,secondID,";
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
function get_Linked_ChanellID(ID,message,author){
	readCsvFile()
	.then((results) => {
		for (let index = 0; index < results.length; index++) {
			if (results[index].firstID==ID) {
				console.log("Sended message :"+message+" as user "+author+"   ["+results[index].secondID+"]")
				client.channels.cache.get(results[index].secondID).send(author+": "+message)
			}
		}
	})
}

function readCsvFile() {
	const results = [];
  
	return new Promise((resolve, reject) => {
	  fs.createReadStream(csvPath)
		.pipe(csv())
		.on('data', (data) => {
		  results.push(data);
		})
		.on('end', () => {
		  resolve(results);
		})
		.on('error', (error) => {
		  reject(error);
		});
	});
  }
  
  
client.login(BOT_TOKEN);
