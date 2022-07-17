import * as xlsx from 'xlsx';
import * as fs from 'fs';

export function getWorkBook() {
  return xlsx.utils.book_new();
}

export function writeXlsxFile(workbook, filename) {
  xlsx.writeFile(workbook, filename);
}

export function deleteExcelFile(filename) {
  fs.rmSync(filename);
}
