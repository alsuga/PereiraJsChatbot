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

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {
    return bot.reply(update, 'Hello world!');
  }
});
