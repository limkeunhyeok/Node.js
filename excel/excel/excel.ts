import * as ExcelJS from 'exceljs';

export const createExcelWithExcelJS = (rawData: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet();
  
  const headers = getHeadersFromData(rawData);
  worksheet.columns = headers;

  rawData.forEach((data, index) => {
    worksheet.getColumn(index + 1).values = [data.h]
  })
}

export const getHeadersFromData = (rawData: any[]) => {
  const keys = Object.keys(rawData[0]);
  return keys.map((key) => ({ header: key, key }));
}
