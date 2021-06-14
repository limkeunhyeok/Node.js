const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margins: 40,layout: 'landscape'});

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 40, 40, { width: 250 })
    .fillColor("#444444")
    .fontSize(18).font("Helvetica-Bold").text("INVOICE", 300, 115)
    .fontSize(18).font("Helvetica-Bold").text("Paid To", 650, 55)
    .fontSize(10).font("Helvetica")
    .text("PPCWIZ", 650, 80)
    .text("3580 Wilshire BlvdLos Angeles", 650, 93)
    .text("CA 90010", 650, 106)
    .text("United States", 650, 119)
    .fontSize(15).font("Helvetica-Bold").text("Invoice number:", 40, 150)
    .fontSize(10).font("Helvetica").text("KR-201911-13-001", 160, 150)
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")

    .fontSize(18).font("Helvetica-Bold").text("Bill To", 40, 175)
    .rect(40, 195, 300, 72).stroke('#000')
    .fontSize(15).font("Helvetica-Bold").text("Name", 45, 200)
    .fontSize(10).font("Helvetica").text("Hyunjea Jo", 45, 215)
    .fontSize(15).font("Helvetica-Bold").text("Account", 45, 235)
    .fontSize(10).font("Helvetica").text("amazon@hellocos.com", 45, 250)

    .fontSize(18).font("Helvetica-Bold").text("Invoice Summary", 400, 175)
    .rect(400, 195, 400, 140).stroke('#000')
    .fontSize(15).font("Helvetica-Bold").text("Name", 405, 200)
    .fontSize(10).font("Helvetica").text("Hyunjea Jo", 405, 215)
    .fontSize(15).font("Helvetica-Bold").text("Account", 405, 235)
    .fontSize(10).font("Helvetica").text("amazon@hellocos.com", 405, 250)
    .fontSize(15).font("Helvetica-Bold").text("Account", 405, 270)
    .fontSize(10).font("Helvetica").text("amazon@hellocos.com", 405, 285)
    .fontSize(15).font("Helvetica-Bold").text("Account", 405, 305)
    .fontSize(10).font("Helvetica").text("amazon@hellocos.com", 405, 320)
  
}

function generateInvoiceTable(doc, invoice) {
  const invoiceTableTop = 350;
  doc
    .fontSize(18).font("Helvetica-Bold").text("Invoice Detail", 40, invoiceTableTop);
  generateHr(doc, invoiceTableTop + 20);

  generateTableRow(
    doc,
    invoiceTableTop + 25,
    "Subscription Type",
    "Period From",
    "Period To",
    "Amount(USD)",
    "Line Total"
  );
  
//   let i;
//   generateHr(doc, invoiceTableTop - 10);
//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     invoiceTableTop,
//     "Subscription Type",
//     "Period From",
//     "Period To",
//     "Amount(USD)",
//     "Line Total"
//   );
//   generateHr(doc, invoiceTableTop + 20);
//   doc.font("Helvetica");

//   for (i = 0; i < invoice.items.length; i++) {
//     const item = invoice.items[i];
//     const position = invoiceTableTop + (i + 1) * 30;
//     generateTableRow(
//       doc,
//       position,
//       item.item,
//       item.description,
//       formatCurrency(item.amount / item.quantity),
//       item.quantity,
//       formatCurrency(item.amount)
//     );

//     generateHr(doc, position + 20);
//   }

//   const subtotalPosition = invoiceTableTop + (i + 1) * 30;
//   generateTableRow(
//     doc,
//     subtotalPosition,
//     "",
//     "",
//     "Subtotal",
//     "",
//     formatCurrency(invoice.subtotal)
//   );

//   const paidToDatePosition = subtotalPosition + 20;
//   generateTableRow(
//     doc,
//     paidToDatePosition,
//     "",
//     "",
//     "Paid To Date",
//     "",
//     formatCurrency(invoice.paid)
//   );

//   const duePosition = paidToDatePosition + 25;
//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     duePosition,
//     "",
//     "",
//     "Balance Due",
//     "",
//     formatCurrency(invoice.subtotal - invoice.paid)
//   );
//   doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}
//   generateTableRow(
//     doc,
//     invoiceTableTop,
//     "Subscription Type",
//     "Period From",
//     "Period To",
//     "Amount(USD)",
//     "Line Total"
//   );
function generateTableRow(
  doc,
  y,
  subscriptionType,
  periodFrom,
  periodTo,
  amount,
) {
  doc
    .fontSize(10)
    .text(subscriptionType, 40, y, { width: 190, align: "center" })
    .text(periodFrom, 230, y, { width: 190, align: "center" })
    .text(periodTo, 420, y, { width: 190, align: "center" })
    .text(amount, 610, y, { width: 190, align: "center" })
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1.5)
    .moveTo(40, y)
    .lineTo(800, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};