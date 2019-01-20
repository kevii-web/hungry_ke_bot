import pyrebase
import datetime
import os
from pytz import timezone

config = {
  "apiKey": "AIzaSyBLcRWvSCuy3hWtZG9Jw5abo8Re4l80Mm0",
  "authDomain": "hungrykebot.firebaseapp.com",
  "databaseURL": "https://hungrykebot.firebaseio.com/",
  "storageBucket": "hungrykebot.appspot.com"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()
items = db.get()
# get today's date
now = datetime.datetime.now(timezone('Australia/Queensland'))
today = now.strftime("%A, %d %B %Y")
print(today)

# Returns menu items from firebase database
def getMenu():
    # get today's date
    now = datetime.datetime.now(timezone('Australia/Queensland'))
    today = now.strftime("%A, %d %B %Y")
      
    for item in items.each():
        date = item.key()
        if (date == today):
            dateObject = item.val()
            breakfast = "Breakfast\n" + dateObject['breakfast1'] + "\n" + dateObject['breakfast2'] + "\n" + dateObject['breakfast3']
            dinner = "Dinner\n"+ "_Meat:_ " + dateObject['meat'] + "\n"+ "_Vege:_ " + dateObject['vege'] + "\n"+ "_Sides:_ " + dateObject['sides'] + "\n"+ "_Soup & Fruit/Dessert:_ " + dateObject['soup'] + ", " + dateObject['fruit'] + "\nDrinks"
            dinner = dinner.replace(',', ', ')
            special = "Special\n" + dateObject['special'].replace(',',' ')
            
            return "" + date + "" + "\n\n" + str(breakfast + "\n\n" + dinner) + str("\n\n_" + special + "_")