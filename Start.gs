// Merges all sheets of menus into a new master sheet
function combineSheets() {
  var mainMenu = "Main Menu";
  var ss = SpreadsheetApp.openById("WITHHELD. Get spreadsheetId from URL of your sheet."); // https://docs.google.com/spreadsheets/d/<<spreadsheetId>>/edit#gid=0
  var sheets = ss.getSheets();
  
  // return if main menu exists already
  if (sheets[0].getName() === mainMenu) {
    Logger.log("Master sheet exists and has been populated.");
    return;
  }
  
  var masterSheet = ss.insertSheet(0);
  masterSheet.setName(mainMenu);
  
  // for each sheet containing menu, copy the data range of each sheet into the master sheet
  for (var i = 0; i < sheets.length-1; i++) {
    var sheet = sheets[i];
    
    var sourceRange = sheet.getDataRange();
    // offset range and make it larger to include 4 merged columns (last column is empty)
    sourceRange = sourceRange.offset(0, 0, sourceRange.getLastRow(), sourceRange.getLastColumn() + 1);
    Logger.log(sourceRange.getSheet().getName());
    //Logger.log(sourceRange.getValues());
    
    var lastRow = masterSheet.getLastRow();
    Logger.log(lastRow);
    // return the range (coordinates) of the next empty row/cell position in master sheet
    var destRange = masterSheet.getRange(lastRow + 1, 1);
    
    sourceRange.copyTo(destRange);
    Logger.log(masterSheet.getLastRow());
  }
  //masterSheet.deleteRow(1);
  masterSheet.setColumnWidths(1, masterSheet.getLastColumn(), 184);
  
  removeDateWord();
}

// Removes the keyword 'Date' from each date cell to allow python to parse it
function removeDateWord() {
  // text style for dates
  var style = SpreadsheetApp.newTextStyle()
      .setFontSize(9)
      .setFontFamily("Arial")
      .build()
  
  var ss = SpreadsheetApp.openById("WITHHELD. Get spreadsheetId from URL of your sheet."); // https://docs.google.com/spreadsheets/d/<<spreadsheetId>>/edit#gid=0
  var sheet = ss.getSheets()[0];
  
  if (sheet.getName() != "Main Menu") {
    Logger.log("Master sheet does not exist.");
    return;
  }

  var dateRange = sheet.getRange(1, 1, sheet.getLastRow());
  var mergedRange = dateRange.getMergedRanges();
  
  // for each date object in date column range, replace the date word with empty string
  for (var i = 0; i < mergedRange.length; i++) {
    var dateObj = mergedRange[i].getValue();
    // find all digits of a date for padding purpose
    var digits = dateObj.match(/\d/g);
    //Logger.log(digits);
    
    // pad 0 to dates before 10th of each month
    if (digits.length < 6) {
      dateObj = dateObj.replace(digits[0], "0" + digits[0]);
    }
    
    var correctDate =  dateObj.replace("Date\n", "");
    Logger.log(correctDate);
    mergedRange[i].setValue(correctDate);
  }
  // remove date formatting on date ranges and set text style
  dateRange.setNumberFormat("@");
  dateRange.setTextStyle(style);
}