function getDataFGDPSDM() {
  srcSheetName = "CompileFGD_PSDM";
  destinationSS_ID = "10DKYgUgUHtJOARXMo03bF7ndpmk-l4fuIpQu7E2TCDc";
  files = DriveApp.getFolderById("1NHvpOnov_6LAOWyIcwHGUFQfTTeG_HzX").getFiles();
  destinationSpreadsheet = SpreadsheetApp.openById(destinationSS_ID);
  destSheet = destinationSpreadsheet.getSheetByName('RekapPSDM');

  participant = {};
  row = 3;

  while(files.hasNext()) {
    file = files.next();

    if (file.getMimeType() !== "application/vnd.google-apps.spreadsheet" || file.getId() === "1nj1P4Svl6PrrkGtXJQrXJzzTYcqCL9VoTsO_AfKNX8g") {
      continue;
    }

    sourceSS = SpreadsheetApp.openById(file.getId());
    sourceSheet = sourceSS.getSheetByName(srcSheetName);

    assessorName = sourceSheet.getRange('D4:D4').getValues();

    for (i = 7; i < 14; i = i + 3) {
      participantName = sourceSheet.getRange('B' + i + ':B' + i).getValues();
      participantScore = sourceSheet.getRange('D' + i + ':J' + i).getValues();

      if (participant[participantName]) {
        assessorCounter = participant[participantName];
        if (assessorCounter.length === 4) {
          Logger.log("There's more than 3 people who assessing participant with name" + participantName);
          continue;
        }
        assessorCounter.push(assessorCounter.length);
        participant[participantName] = assessorCounter;
        if (assessorCounter[assessorCounter.length - 1] === 2) {
          assessorCol = destSheet.getRange('D' + assessorCounter[0] + ':D' + assessorCounter[0]);
          scoreCol = destSheet.getRange('M' + assessorCounter[0] + ':S' + assessorCounter[0]);
          assessorCol.setValues(assessorName);
          scoreCol.setValues(participantScore);
        } else {
          assessorCol = destSheet.getRange('E' + assessorCounter[0] + ':E' + assessorCounter[0]);
          scoreCol = destSheet.getRange('T' + assessorCounter[0] + ':Z' + assessorCounter[0]);
          assessorCol.setValues(assessorName);
          scoreCol.setValues(participantScore);
        }
      } else {
        participant[participantName] = [row, 1]
        nameCol = destSheet.getRange('B' + row + ':B' + row);
        assessorCol = destSheet.getRange('C' + row + ':C' + row);
        scoreCol = destSheet.getRange('F' + row + ':L' + row);
        noCol = destSheet.getRange('A' + row + ':A' + row);
        nameCol.setValues(participantName);
        assessorCol.setValues(assessorName);
        scoreCol.setValues(participantScore);
        noCol.setValues([[row - 2]]);
        row++;
      }
    } 
  }
};