const fs = require("fs");
const PDFDocument = require("pdfkit");
const { invoiceHeader } = require('./invoiceTemplate/header');
const { invoiceUserInformation } = require('./invoiceTemplate/userInfomation');
const { invoiceTable } = require('./invoiceTemplate/table');
const { invoiceFooter } = require('./invoiceTemplate/footer');

function createInvoice(data, path) {
    let doc = new PDFDocument({ size: "A4", margins: 40,layout: 'landscape'});
    invoiceHeader(doc, data);
    invoiceUserInformation(doc, data);
    invoiceTable(doc, data);
    invoiceFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

module.exports = {
    createInvoice
};