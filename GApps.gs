function writeDataToFirebase() {
  const secret = "NwqpC2BvR5VHMQDiF27ZvGDgFQUQypJzjK0Cmm6l";
  var ss = SpreadsheetApp.openById("11kPAfKGfw5MOxVEdq_uob6veF8C8X4xgPmpEN7m_G-w");
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
    Logger.log(date);
    
    var numRows;
    if (j < dateRows.length-1) {
      numRows = dateRows[j+1] - dateIndex;
    } else {
      numRows = sheet.getLastRow() - dateIndex;
    }
    
    // start row, start column, numRows, numColumns
    var breakfast = sheet.getSheetValues(dateIndex + 2, 2, numRows, 1);
    var dinner = sheet.getSheetValues(dateIndex + 1, 3, numRows, 1);
    var special = sheet.getSheetValues(dateIndex + 1, 4, numRows, 1);
    var sides = sheet.getSheetValues(dateIndex + 1, 5, numRows, 1);
    //Logger.log(breakfast.join(" "));    
    
    dataToImport[date] = {
      breakfast:breakfast.join(" "),
      dinner:dinner.join(" "),
      special:special.join(" "),
      sides:sides.join(" ")
      /*
      lastName:lastName,
      emailAddress:data[i][2],
      country:data[i][4],
      department:data[i][5],
      weight:data[i][6],
      birthDate:data[i][7]
      */
    };
    Logger.log(dinner.join());
  }
  var firebaseUrl = "https://hungrykebot.firebaseio.com/";
  var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
  base.setData("", dataToImport);
}