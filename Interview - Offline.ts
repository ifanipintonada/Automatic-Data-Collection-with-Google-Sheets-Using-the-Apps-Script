function getLuring() {
  srcSheetName = "Wawancara";
  destinationSS_ID = "10DKYgUgUHtJOARXMo03bF7ndpmk-l4fuIpQu7E2TCDc";
  files = DriveApp.getFolderById("1T64VO0e2Qn4rOZJTCDMicqU0nqX453Yy").getFiles();
  destinationSpreadsheet = SpreadsheetApp.openById(destinationSS_ID);
  destSheet = destinationSpreadsheet.getSheetByName('RekapLuring');

  listFile = [];

  while(files.hasNext()) {
    file = files.next();

    if (file.getMimeType() !== "application/vnd.google-apps.spreadsheet" || file.getId() === "1dOxALSq3s8-Gb9dtzc8pSaDEwtdUiw6j6OSfeEkwp_0") {
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
  nameBefore = "";
  for (i = 0; i < listFile.length; i++) {
    sourceSS = SpreadsheetApp.openById(listFile[i].getId());
    sourceSheet = sourceSS.getSheetByName(srcSheetName);

    sourceName = sourceSheet.getRange('D4:D4').getValues();
    sourceLuring = sourceSheet.getRange('I73:I73').getValues();
    sourceName[0][0] !== nameBefore
      index++;
      no[0][0]++;
      nameBefore = sourceName[0][0];
      noCol = destSheet.getRange('A' + index + ':A' + index);
      nameCol = destSheet.getRange('B' + index + ':B' + index);
      luringCol = destSheet.getRange('C' + index + ':C' + index);


    noCol.setValues(no);
    nameCol.setValues(sourceName);
    luringCol.setValues(sourceLuring);
   
  }
};