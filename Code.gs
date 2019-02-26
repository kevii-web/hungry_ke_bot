// Populates firebase database with menu objects corresponding to each date in sheet.
function writeDataToFirebase() {
  // secret for writing to firebase database
  const secret = "WITHHELD. Get secret from firebase realtime database."; // obtain from Database > Settings > Service accounts > Database secrets
  var ss = SpreadsheetApp.openById("WITHHELD. Get spreadsheetId from URL of your sheet."); // https://docs.google.com/spreadsheets/d/<<spreadsheetId>>/edit#gid=0
  // get main menu sheet from spreadsheet
  var sheet = ss.getSheets()[0];
  // get data of all values as an object
  var data = sheet.getDataRange().getValues();
  // json object to store dates and their menu objects
  var dataToImport = {};
  
  // Logic for getting row indices of dates, as dates do not appear in each row
  var dateRows = [];
  for (var i = 0; i < data.length; i++) {
    var date = data[i][0];
    // if date exists (not empty), push index of date (eg. 0, 13, 26...)
    if (date) {
      dateRows.push(i);
    }
  }
  
  // iterate through each date, parse the date and the menu as an object belonging to each date
  for(var j = 0; j < dateRows.length; j++) {
    var dateIndex = dateRows[j];
    var date = data[dateIndex][0];
    Logger.log("Date is : " + date + " at date index: " + dateIndex);
    
    // number of rows for each date (not used)
    var numRows;
    if (j < dateRows.length-1) {
      numRows = dateRows[j+1] - dateIndex;
    } else {
      numRows = sheet.getLastRow() - dateIndex;
    }
    
    // getSheetValues(start row, start column, numRows, numColumns) - returns rectangular grid of values for this range
    var breakfast1 = sheet.getSheetValues(dateIndex + 2, 2, 3, 1);
    var breakfast2 = sheet.getSheetValues(dateIndex + 6, 2, 1, 1);
    var breakfast3 = sheet.getSheetValues(dateIndex + 7, 2, 7, 1);
    // breakfast begins at second column, dinner at third column onwards
    var meat = sheet.getSheetValues(dateIndex + 2, 3, 1, 3);
    var vege = sheet.getSheetValues(dateIndex + 4, 3, 1, 3);
    var sides = sheet.getSheetValues(dateIndex + 6, 3, 1, 3);
    var special = sheet.getSheetValues(dateIndex + 8, 3, 1, 3);
    var fruit = sheet.getSheetValues(dateIndex + 10, 3, 1, 1);
    var soup = sheet.getSheetValues(dateIndex + 12, 3, 1, 1);
    
    // add json object for each date containing the menu items
    dataToImport[date] = {
      breakfast1:breakfast1.join(" "),
      breakfast2:breakfast2.join(" "),
      breakfast3:breakfast3.join(" "),
      meat:meat.join(" "),
      vege:vege.join(" "),
      sides:sides.join(" "),
      special:special.join(" "),
      fruit:fruit.join(" "),
      soup:soup.join(" ")
    };
    
    //Logger.log(dataToImport)
  }
  var firebaseUrl = "https://hungry-ke-bot.firebaseio.com/";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  base.setData("", dataToImport);
}