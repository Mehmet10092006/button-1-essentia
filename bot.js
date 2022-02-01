const discord = require('discord.js');
const client = new discord.Client();
const disbut = require('discord-buttons')(client);
const cfg = require("./config.json");

client.on("message", async (msg) => {
let prefix = cfg.Bot.Prefix.find((x) => msg.content.toLowerCase().startsWith(x));
if (msg.content !== "!button" && msg.content !== "!buttons") return; 
if(!cfg.Bot.Owners.includes(msg.author.id) && !msg.guild.owner.user.id.includes(msg.author.id)) return

let yes = new disbut.MessageButton()
     .setStyle('red')
     .setLabel('❤️ Sevgilim Var')
     .setID('yes')
let no = new disbut.MessageButton()
    .setStyle('gray')
    .setLabel('💔 Sevgilim Yok')
    .setID('no')

    let yapmam = new disbut.MessageButton()
    .setStyle('gray')
    .setLabel('🖤 Sevgili Yapmıyorum')
    .setID('yapmam')




msg.channel.send(`
 Merhaba **Galaxy** üyeleri

 Aşağıda bulunan butonlardan İlişki Rol Şeçme Menüsü Bulunmakta İstediğniz Gibi Şeçebilirsiniz

`, {
        buttons: [yes , no, yapmam]
    })

})
client.on('clickButton', async (button) => {

    if (button.id === 'yes') {
        if (button.clicker.member.roles.cache.get(cfg.Roles.yes)) {
            await button.clicker.member.roles.remove(cfg.Roles.yes)
            await button.think(true);
            await button.reply.edit(" Sevgilim Var rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(cfg.Roles.yes)
            await button.think(true);
            await button.reply.edit(" Sevgilim Var rolü üzerinize verildi.")
        }
    }
    if (button.id === 'no') {
        if (button.clicker.member.roles.cache.get(cfg.Roles.no)) {
            await button.clicker.member.roles.remove(cfg.Roles.no)
            await button.think(true);
            await button.reply.edit(" Sevgilim Yok rolü üzerinizden alındı.")
        } else {
            await button.clicker.member.roles.add(cfg.Roles.no)
            await button.think(true);
            await button.reply.edit(" Sevgilim Yok rolü üzerinize verildi.")
        }
    }

        if (button.id === 'yapmam') {
            if (button.clicker.member.roles.cache.get(cfg.Roles.yapmam)) {
                await button.clicker.member.roles.remove(cfg.Roles.yapmam)
                await button.think(true);
                await button.reply.edit(" Sevgili Yapmıyorum rolü üzerinizden alındı.")
            } else {
                await button.clicker.member.roles.add(cfg.Roles.yapmam)
                await button.think(true);
                await button.reply.edit(" Sevgili Yapmıyorum rolü üzerinize verildi.")
            }}
        
    
    
        

})




client.on('ready', async () => {

client.user.setPresence({ activity: { name: cfg.Bot.Durum }, status: cfg.Bot.Status })
let VoiceChannelID = client.channels.cache.get(cfg.Channels.VoiceChannelID)
if (VoiceChannelID) VoiceChannelID.join().catch(() => { })
console.log(`(${client.user.username}) adlı hesapta [${client.guilds.cache.get(cfg.Server.GuildID).name}] adlı sunucuda giriş yapıldı. ✔`)

});

client.login(cfg.Bot.Token).catch(() => console.error("Bota giriş yapılırken başarısız olundu!"));