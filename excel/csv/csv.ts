import { createObjectCsvWriter } from 'csv-writer';

export interface CsvHeader {
  id: string;
  title: string;
}

export const getCsvHeadersFromData = (data: any[]) => {
  const dataKeys: string[] = Object.keys(data[0]);
  const csvHeaders: CsvHeader[] = dataKeys.map((key) => ({ id: key, title: key }));
  return csvHeaders;
};

export const writeCsvFile = (filename: string) => async (data: any[]) => {
  const path = `./${filename}.csv`;
  const header = getCsvHeadersFromData(data);
  await createObjectCsvWriter({
    path,
    header,
  }).writeRecords(data);
};