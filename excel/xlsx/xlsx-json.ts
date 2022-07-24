import * as xlsx from 'xlsx';
import { getWorkBook } from './xlsx-common';
import { getExcelJsonData } from '../data-generate';

export function getWorkSheetForJson() {
  const arrayData = getExcelJsonData();
  return xlsx.utils.json_to_sheet(arrayData);
}

export function getWorkBookJson(name) {
  const workbook = getWorkBook();
  const workSheetJson = getWorkSheetForJson();
  xlsx.utils.book_append_sheet(workbook, workSheetJson, name);
  return workbook;
}
