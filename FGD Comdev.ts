function getDataFGDComdev() {
  srcSheetName = "CompileFGD_Comdev";
  destinationSS_ID = "10DKYgUgUHtJOARXMo03bF7ndpmk-l4fuIpQu7E2TCDc";
  files = DriveApp.getFolderById("1ujiMiD0FaC85me_8lbEVdrJ9eN4ohgm4").getFiles();
  destinationSpreadsheet = SpreadsheetApp.openById(destinationSS_ID);
  destSheet = destinationSpreadsheet.getSheetByName('RekapComdev');

  participant = {};
  row = 3;

  while(files.hasNext()) {
    file = files.next();

    if (file.getMimeType() !== "application/vnd.google-apps.spreadsheet" || file.getId() === "1Z9yCkVrSj1knScYC658YH5rT7o8GGG-KckYZcbnIEao") {
      continue;
    }

    sourceSS = SpreadsheetApp.openById(file.getId());
    sourceSheet = sourceSS.getSheetByName(srcSheetName);

    assessorName = sourceSheet.getRange('D4:D4').getValues();

    for (i = 7; i < 14; i = i + 3) {
      participantName = sourceSheet.getRange('B' + i + ':B' + i).getValues();
      participantScore = sourceSheet.getRange('D' + i + ':L' + i).getValues();

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
          scoreCol = destSheet.getRange('O' + assessorCounter[0] + ':W' + assessorCounter[0]);
          assessorCol.setValues(assessorName);
          scoreCol.setValues(participantScore);
        } else {
          assessorCol = destSheet.getRange('E' + assessorCounter[0] + ':E' + assessorCounter[0]);
          scoreCol = destSheet.getRange('X' + assessorCounter[0] + ':AF' + assessorCounter[0]);
          assessorCol.setValues(assessorName);
          scoreCol.setValues(participantScore);
        }
      } else {
        participant[participantName] = [row, 1]
        nameCol = destSheet.getRange('B' + row + ':B' + row);
        assessorCol = destSheet.getRange('C' + row + ':C' + row);
        scoreCol = destSheet.getRange('F' + row + ':N' + row);
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