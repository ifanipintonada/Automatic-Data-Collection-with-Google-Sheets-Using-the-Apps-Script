function getdata() {
  srcSheetName = "CompileEssay";
  destinationSS_ID = "10DKYgUgUHtJOARXMo03bF7ndpmk-l4fuIpQu7E2TCDc";
  files = DriveApp.getFolderById("1UlInDuSjW9JhM0-eLD0MmGVaGJkxCDkp").getFiles();
  destinationSpreadsheet = SpreadsheetApp.openById(destinationSS_ID);
  destSheet = destinationSpreadsheet.getSheetByName('RekapEssay');

  listFile = [];

  while(files.hasNext()) {
    file = files.next();

    if (file.getMimeType() !== "application/vnd.google-apps.spreadsheet" || file.getId() === "17ypZDeFj5uZpAE1QSdMi9VKgKbQwV6_0Wv8RgxEGEK8") {
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
    sourceAssesor = sourceSheet.getRange('D5:D5').getValues();
    sourceAspectFromAssesor = sourceSheet.getRange('D12:J12').getValues();

    if (sourceName[0][0] !== nameBefore) {
      index++;
      no[0][0]++;
      nameBefore = sourceName[0][0];
      noCol = destSheet.getRange('A' + index + ':A' + index);
      nameCol = destSheet.getRange('B' + index + ':B' + index);
      assesorCol = destSheet.getRange('G' + index + ':G' + index);
      aspectFromAssesorCol = destSheet.getRange('I' + index + ':O' + index);
    } else {
      noCol = destSheet.getRange('A' + index + ':A' + index);
      nameCol = destSheet.getRange('B' + index + ':B' + index);
      assesorCol = destSheet.getRange('H' + index + ':H' + index);
      aspectFromAssesorCol = destSheet.getRange('P' + index + ':V' + index);
    }

    noCol.setValues(no);
    nameCol.setValues(sourceName);
    assesorCol.setValues(sourceAssesor);
    aspectFromAssesorCol.setValues(sourceAspectFromAssesor);
  }
};
