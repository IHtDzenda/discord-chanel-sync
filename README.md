# Discord-chanel-sync
A simple discord bot that synced message a cross multiple discord servers
## Features:
* ✔️ Syncing across chanels 
* ✔️ Command for setting up the bot 
* ✔️ Docker conteiner 

### Commands:
 * !lc -<firstChanellID> -<secondChanellID>   [links chanells ] 
 * !llc                                       [lists linked chanels] 
 * !id                                        [show the current id] 
 * !h                                         [shows this message]

## Docker Setup:
#### Using a build image form dockerhub (easy) : 
```
docker run -e DISCORD_TOKEN=PasteHereYourDiscordToken dzenda/discord-multiserver-sync-bot
```

#### Bulilding the docker Image form source (use if you get errors):
```
git clone https://github.com/IHtDzenda/discord-chanel-sync.git
```
```
cd discord-chanel-sync/
```
```
docker build . --no-cache -t DiscordChanelSyncBot
```
```
docker run -e -d DISCORD_TOKEN=PasteHereYourDiscordToken DiscordChanelSyncBot
```
