# Hungry KE Bot
Telegram bot for posting King Edward VII Hall's daily menu

Bot hosted on https://t.me/hungry_KE_bot

## Instructions for developers
Hungry KE Bot is hosted on the Heroku server to respond to incoming messages via Telegram's webhooks.
The bot will send the daily menu obtained from a Firebase Realtime Database that has been hosted.
To update/add/replace the daily menus, ensure that they are in the corret format and upload them to KE's Google Drive, before running the Google Apps script to populate the database.

## Acknowledgements
- This bot is based off the original Hungry KE Bot that has been deprecated. Link: https://github.com/jia1/hungry-ke-bot
- Libraries used: [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot), [Pyrebase](https://github.com/thisbejim/Pyrebase)