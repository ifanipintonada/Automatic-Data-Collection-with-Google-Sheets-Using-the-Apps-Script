function getdataMicroTeaching() {
  srcSheetName = "CompileMT";
  destinationSS_ID = "10DKYgUgUHtJOARXMo03bF7ndpmk-l4fuIpQu7E2TCDc";
  files = DriveApp.getFolderById("1kaszEManGb7hs2kNa8fpSFOWZhhmC32c").getFiles();
  destinationSpreadsheet = SpreadsheetApp.openById(destinationSS_ID);
  destSheet = destinationSpreadsheet.getSheetByName('RekapMT');

  listFile = [];

  while(files.hasNext()) {
    file = files.next();

    if (file.getMimeType() !== "application/vnd.google-apps.spreadsheet" || file.getId() === "1DwrBkc_AquJE1-KXJhY0x9bPVZHAlPNl_tTU2RrEq8g") {
      continue;
    }

    listFile.push(file);
  }

  listFile = listFile.sort(function(file1, file2) {
      if (file1.getName().toLowerCase() < file2.getName().toLowerCase())
          return -1;
      else if (file1.getName().toLowerCase() > file2.getName().toLowerCase())
          return 1;
      else 
        return 0;
    }
  )

  index = 2;
  no = [[0]];
  nameBefore = "Not a name";
  counter = 1;
  Logger.log(listFile)
  for (i = 0; i < listFile.length; i++) {
    sourceSS = SpreadsheetApp.openById(listFile[i].getId());
    sourceSheet = sourceSS.getSheetByName(srcSheetName);
    Logger.log(i)
    sourceName = sourceSheet.getRange('D4:D4').getValues();
    sourceAssesor = sourceSheet.getRange('D5:D5').getValues();
    sourceAspectFromAssesor = sourceSheet.getRange('D14:L14').getValues();

    if (sourceName[0][0] !== nameBefore) {
      counter = 1;
      index++;
      no[0][0]++;
      nameBefore = sourceName[0][0];
      noCol = destSheet.getRange('A' + index + ':A' + index);
      nameCol = destSheet.getRange('B' + index + ':B' + index);
      assesorCol = destSheet.getRange('C' + index + ':C' + index);
      aspectFromAssesorCol = destSheet.getRange('F' + index + ':N' + index);
    } else if (counter == 2) {
      noCol = destSheet.getRange('A' + index + ':A' + index);
      nameCol = destSheet.getRange('B' + index + ':B' + index);
      assesorCol = destSheet.getRange('E' + index + ':E' + index);
      aspectFromAssesorCol = destSheet.getRange('X' + index + ':AF' + index);
    } else {
      noCol = destSheet.getRange('A' + index + ':A' + index);
      nameCol = destSheet.getRange('B' + index + ':B' + index);
      assesorCol = destSheet.getRange('D' + index + ':D' + index);
      aspectFromAssesorCol = destSheet.getRange('O' + index + ':W' + index);
      counter++;
    }

    noCol.setValues(no);
    nameCol.setValues(sourceName);
    assesorCol.setValues(sourceAssesor);
    aspectFromAssesorCol.setValues(sourceAspectFromAssesor);
  }
};