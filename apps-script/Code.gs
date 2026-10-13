/**
 * Google Apps Script - AT 羽球盃賽程分數 API
 *
 * 使用方式：
 * 1. 在 Google Sheet 中點選「擴充功能」>「Apps Script」
 * 2. 將此檔案的內容全部貼上（取代原有的 Code.gs）
 * 3. 點選「部署」>「新增部署作業」
 * 4. 選擇類型「網頁應用程式」
 * 5. 執行身分選「我」，存取權限選「所有人」
 * 6. 點選「部署」，複製產生的 URL
 * 7. 將 URL 填入前端 tournaments.js 的 sheetScriptUrl 欄位
 *
 * 注意：「所有人」代表任何拿到 URL 的人都能呼叫 doPost 改分數（前端的 ?admin=true 只是 UI 開關）。
 * 比賽結束後請到「管理部署作業」封存此部署。
 */

const SHEET_NAME = '20260207 比賽';
const DATA_START_ROW = 13; // F13 開始
const DATA_END_ROW = 32;   // 到 K32 (預賽 20 場)
const FINALS_START_ROW = 33; // 決賽從 row 33 開始
const FINALS_END_ROW = 34;   // 2 場決賽
const SCORE_COL = 10;       // J 欄 (比分)
const ROUND_COL = 6;        // F 欄 (Round)
const COURT_COL = 7;        // G 欄 (場地)
const TEAM1_COL = 8;        // H 欄 (對戰組A)
const TEAM2_COL = 9;        // I 欄 (對戰組B)

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const scores = [];

  // 預賽 20 場 (rows 13-32, matchIndex 0-19)
  for (let row = DATA_START_ROW; row <= DATA_END_ROW; row++) {
    scores.push({
      row: row - DATA_START_ROW,
      round: sheet.getRange(row, ROUND_COL).getValue(),
      court: sheet.getRange(row, COURT_COL).getValue(),
      team1: sheet.getRange(row, TEAM1_COL).getValue(),
      team2: sheet.getRange(row, TEAM2_COL).getValue(),
      score: sheet.getRange(row, SCORE_COL).getDisplayValue(),
    });
  }

  // 決賽 2 場 (rows 33-34, matchIndex 20-21)
  for (let row = FINALS_START_ROW; row <= FINALS_END_ROW; row++) {
    scores.push({
      row: row - DATA_START_ROW,
      round: sheet.getRange(row, ROUND_COL).getValue() || (row === 33 ? '冠亞軍' : '季殿軍'),
      court: sheet.getRange(row, COURT_COL).getValue(),
      team1: sheet.getRange(row, TEAM1_COL).getValue(),
      team2: sheet.getRange(row, TEAM2_COL).getValue(),
      score: sheet.getRange(row, SCORE_COL).getDisplayValue(),
    });
  }

  return jsonOutput({ scores });
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  // data: { matchIndex: number, score: "15:10", team1?: string, team2?: string }
  // matchIndex 0-19 = 預賽 (rows 13-32), 20-21 = 決賽 (rows 33-34)
  if (!isValidPayload(data)) {
    return jsonOutput({ error: 'Invalid payload' });
  }
  const targetRow = data.matchIndex < 20
    ? DATA_START_ROW + data.matchIndex
    : FINALS_START_ROW + (data.matchIndex - 20);

  sheet.getRange(targetRow, SCORE_COL).setValue(data.score);

  // 決賽時同時寫入隊伍名稱
  if (data.team1) {
    sheet.getRange(targetRow, TEAM1_COL).setValue(data.team1);
  }
  if (data.team2) {
    sheet.getRange(targetRow, TEAM2_COL).setValue(data.team2);
  }

  return jsonOutput({ success: true });
}

// 只接受純比分與隊名；以 = + - @ 開頭的字串會被 setValue() 當成公式寫入，一律拒絕
function isValidPayload(data) {
  const isName = (v) => v === undefined || (typeof v === 'string' && v.length <= 40 && !/^[=+\-@]/.test(v));
  return Number.isInteger(data.matchIndex) && data.matchIndex >= 0 && data.matchIndex <= 21
    && typeof data.score === 'string' && /^\d{1,2}:\d{1,2}$/.test(data.score)
    && isName(data.team1) && isName(data.team2);
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
