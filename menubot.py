import os
import firebaselink
import logging
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters

TOKEN = os.environ['BOT_TOKEN']
PORT = int(os.environ.get('PORT', '8443'))
URL = "https://api.telegram.org/bot{}/".format(TOKEN)

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)

# Command handler for sending daily menu
def start(bot, update):
    """Send the menu when the command /start is issued."""
    text = firebaselink.getMenu()
    bot.send_message(chat_id=update.message.chat_id, text=text, parse_mode="markdown")

def error(bot, update, error):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, error)

def logMessages(bot, update):
    print(update.message.message_id + " user: " + update.message.from_user + " chat id: " + update.message.chat_id)
    print(update.message.text)
    
def main():
    """Start the bot."""
    # Create the EventHandler and pass it your bot's token.
    updater = Updater(TOKEN)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    # Add handler for handling start commands
    dp.add_handler(CommandHandler("start", start))

    # log all errors
    dp.add_error_handler(error)

    # log messages
    dp.add_handler(MessageHandler(Filters.all, logMessages))

    # Webhook handler for listening to incoming requests
    updater.start_webhook(listen="0.0.0.0",
            port=PORT,
            url_path=TOKEN)
    updater.bot.set_webhook("https://hungry-ke-bot.herokuapp.com/" + TOKEN)
    updater.idle()

if __name__ == '__main__':
    main()