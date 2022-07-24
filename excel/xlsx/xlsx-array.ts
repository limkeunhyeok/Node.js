import * as xlsx from 'xlsx';
import { getWorkBook } from './xlsx-common';
import { getExcelArrayData } from '../data-generate';

export function getWorkSheetForArray() {
  const arrayData = getExcelArrayData();
  return xlsx.utils.aoa_to_sheet(arrayData);
}

export function getWorkBookAoa(name) {
  const workbook = getWorkBook();
  const workSheetAoa = getWorkSheetForArray();
  xlsx.utils.book_append_sheet(workbook, workSheetAoa, name);
  return workbook;
}
