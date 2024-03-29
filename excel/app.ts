import express from 'express';
import { writeCsvFile } from './csv/csv';
import { getExcelJsonData } from './data-generate';
import { getWorkbookWithExcelJS, writeExcelFile } from './excel/excel';
import { getWorkBookAoa } from './xlsx/xlsx-array';
import { deleteExcelFile, writeXlsxFile } from './xlsx/xlsx-common';
import { getWorkBookJson } from './xlsx/xlsx-json';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.send('hello world!') });

app.post('/xlsx-aoa', (req, res) => {
  const { name } = req.body;
  const workbook = getWorkBookAoa(name);
  writeXlsxFile(workbook, name);
  res.download(`./${name}`, (err) => {
    if (err) {
      res.send(err);
    }
    deleteExcelFile(`./${name}`);
  })
});

app.post('/xlsx-json', (req, res) => {
  const { name } = req.body;
  const workbook = getWorkBookJson(name);
  writeXlsxFile(workbook, name);
  res.download(`./${name}`, (err) => {
    if (err) {
      res.send(err);
    }
    deleteExcelFile(`./${name}`);
  })
});

app.post('/excel', async (req, res) => {
  const { name } = req.body;
  const rawData = getExcelJsonData();
  const workbook = getWorkbookWithExcelJS(rawData);
  await writeExcelFile(workbook, name);
  res.download(`./${name}`, (err) => {
    if (err) {
      res.send(err);
    }
    deleteExcelFile(`./${name}`);
  })
})

app.post('/csv', async (req, res) => {
  const { name } = req.body;
  const rawData = getExcelJsonData();
  await writeCsvFile(name)(rawData);
  res.download(`${name}.csv`, (err) => {
    if (err) {
      res.send(err);
    }
  })
})

app.listen(3000, () => {
  console.log('example app listening on the port 3000!');
});
