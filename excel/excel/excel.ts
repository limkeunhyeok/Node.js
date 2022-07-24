import * as ExcelJS from 'exceljs';

export const getWorkbookWithExcelJS = (rawData: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet();
  const headers = getHeadersFromData(rawData);

  worksheet.columns = headers;

  const dataForExcelJS = getFormattingDataForExcelJS(rawData);

  dataForExcelJS.forEach((data, index) => {
    worksheet.getColumn(index + 1).values = [data.header, ...data.data];
  })
  return workbook;
}

export const writeExcelFile = async (workbook: ExcelJS.Workbook, filename) => {
  await workbook.xlsx.writeFile(filename);
}

export const getHeadersFromData = (rawData: any[]) => {
  const keys = Object.keys(rawData[0]);
  return keys.map((key) => ({ header: key, key }));
}

// dataForExcelJs = [{ header: '', data: [...]}]
export const getFormattingDataForExcelJS = (rawData: any[]) => {
  const headers = getHeadersFromData(rawData);
  let dataForExcelJS = [];

  for (let header of headers) {
    let raw = { header: header.key, data: []};
    for (let data of rawData) {
      raw.data.push(data[header.key]);
    }
    dataForExcelJS.push(raw);
  }
  return dataForExcelJS
}