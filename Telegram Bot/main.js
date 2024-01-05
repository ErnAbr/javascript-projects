const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const token = "YOUR_TOKEN_ADDRESS";
const bot = new TelegramBot(token, { polling: true });

console.log("Starting program");

const conversationState = {};

const startKeyboard = [
  [{ text: "X pasirinkimas", callback_data: "x" }],
  [{ text: "Y pasirinkimas", callback_data: "y" }],
  [{ text: "help", callback_data: "help" }],
];

const secondaryKeyboard = [
  [{ text: "X pasirinkimas", callback_data: "x" }],
  [{ text: "Y pasirinkimas", callback_data: "y" }],
];

function saveConversationState(username, chatId, state) {
  const filePath = `conversation_${username}_${chatId}.json`;

  fs.writeFileSync(filePath, JSON.stringify(state, null, 2), "utf8");
  console.log("Conversation state saved to path:", filePath);
}

bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const data = callbackQuery.data;

  const username = `${callbackQuery.from.first_name} ${callbackQuery.from.last_name}` || "unknown_user";

  if (!conversationState[chatId]) {
    conversationState[chatId] = { selections: [] };
  }

  conversationState[chatId].selections.push(data);

  saveConversationState(username, chatId, conversationState[chatId]);

  switch (data) {
    case "x": {
      const xKeyboard = [[{ text: "X1", callback_data: "x1" }], [{ text: "X2", callback_data: "x2" }]];
      sendKeyboardMessage(chatId, "Kiek reikia X1 ar X2?", xKeyboard);
      break;
    }
    case "y": {
      const yKeyboard = [[{ text: "Y1", callback_data: "y1" }], [{ text: "Y2", callback_data: "y2" }]];
      sendKeyboardMessage(chatId, "Kiek reikia Y1 ar Y2?", yKeyboard);
      break;
    }
    case "x1":
      sendKeyboardMessage(chatId, "x1 bus pristatyti. Eiti atgal i /start");
      break;
    case "x2":
      sendKeyboardMessage(chatId, "x2 bus pristatyti. Eiti atgal i /start");
      break;
    case "y1":
      sendKeyboardMessage(chatId, "y1 bus pristatyta. Eiiti atgal i /start");
      break;
    case "y2":
      sendKeyboardMessage(chatId, "y2 bus pristatyta. Eiti atgal i /start");
      break;
    case "help": {
      const helpKeyboard = [[{ text: "X", callback_data: "x" }], [{ text: "Y", callback_data: "y" }]];
      sendKeyboardMessage(chatId, "Pasirinkite ka norite uzsisakyti: X ar Y", helpKeyboard);
      break;
    }
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text.match(/\/start|\/help|\/echo|\/x|\/x1|\/x2|\/y|\/y1|\/y2/)) {
    saveConversationState(chatId, conversationState);

    bot.sendMessage(chatId, "I don't understand that command. Type /help to see available commands.");
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sendKeyboardMessage(chatId, "Ko jums reikia. Pasirinkite:", startKeyboard);
});

function sendKeyboardMessage(chatId, text, keyboard) {
  const options = {
    reply_markup: JSON.stringify({ inline_keyboard: keyboard }),
  };
  bot.sendMessage(chatId, text, options);
}
