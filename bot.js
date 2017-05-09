const Botmaster = require('botmaster');
const TelegramBot = require('botmaster-telegram');
const botmaster = new Botmaster();

const telegramSettings = {
  credentials: {
    authToken: '335479533:AAHKJEPc9A3vGXrIctD2TN_m4IwNvdLzKTE',
  },
  webhookEndpoint: 'webhook/',
};

const telegramBot = new TelegramBot(telegramSettings);
botmaster.addBot(telegramBot);

const reservations = new Map();

const controller = (bot, update) => {
    const [command, ...messages] = update.message.text.split(" ");
    if(command === '/reserve') {
        let textMessage;
        if(reservations.get(update.sender.id)) {
            textMessage = 'You already made your reservation';
        } else {
            if(messages.length !== 2) {
                textMessage = 'You must send your name and your email';
            } else {
                textMessage = 'Thanks for your reservation';
                reservations.set(update.sender.id, messages);
            }
        }
        return bot.reply(update, textMessage);
    }
    if(command === '/reservations') {
        return bot.reply(update, `There are ${reservations.size} reservations`);
    }
    const helpMessage = 'Hi, If you want to make a reservation write "/reserve YOUR_NAME YOUR_EMAIL" '
    + 'or "/reservations" to see how many reservations are';
    return bot.reply(update, helpMessage)
}

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: controller,
});
