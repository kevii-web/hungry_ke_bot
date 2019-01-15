function writeDataToFirebase() {
  const secret = "NwqpC2BvR5VHMQDiF27ZvGDgFQUQypJzjK0Cmm6l";
  var ss = SpreadsheetApp.openById("1YFwfIu2SVGFUGIpHjL2B-smUZduIqgvtSzrMIb004kI");
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  
  // Logic for getting row indices of dates
  var dateRows = [];
  for (var i = 0; i < data.length; i++) {
    var date = data[i][0];
    if (date) {
      dateRows.push(i);
    }
  }
  
  for(var j = 0; j < dateRows.length; j++) {
    var dateIndex = dateRows[j];
    var date = data[dateIndex][0];
    Logger.log(date + " .. " + dateIndex);
    
    var numRows;
    if (j < dateRows.length-1) {
      numRows = dateRows[j+1] - dateIndex;
    } else {
      numRows = sheet.getLastRow() - dateIndex;
    }
    
    // start row, start column, numRows, numColumns
    var breakfast1 = sheet.getSheetValues(dateIndex + 2, 2, 3, 1);
    var breakfast2 = sheet.getSheetValues(dateIndex + 6, 2, 1, 1);
    var breakfast3 = sheet.getSheetValues(dateIndex + 7, 2, 7, 1);
    var meat = sheet.getSheetValues(dateIndex + 2, 3, 1, 3);
    var vege = sheet.getSheetValues(dateIndex + 4, 3, 1, 3);
    var sides = sheet.getSheetValues(dateIndex + 6, 3, 1, 3);
    var special = sheet.getSheetValues(dateIndex + 8, 3, 1, 3);
    var fruit = sheet.getSheetValues(dateIndex + 10, 3, 1, 1);
    var soup = sheet.getSheetValues(dateIndex + 12, 3, 1, 1);

    //Logger.log(breakfast.join(" "));    
    
    
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
    
    //Logger.log(dinner.join());
  }
  var firebaseUrl = "https://hungrykebot.firebaseio.com/";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  base.setData("", dataToImport);
}