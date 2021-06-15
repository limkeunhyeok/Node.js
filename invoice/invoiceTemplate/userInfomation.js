exports.invoiceUserInformation = (doc, data) => {
    doc
    
        .fontSize(18).font("Helvetica-Bold").text("Bill To", 40, 175)
        .rect(40, 195, 300, 72).stroke('#000')
        .fontSize(15).font("Helvetica-Bold").text("Name", 45, 200)
        .fontSize(10).font("Helvetica").text(data.userInfo.name, 45, 215)
        .fontSize(15).font("Helvetica-Bold").text("Account", 45, 235)
        .fontSize(10).font("Helvetica").text(data.userInfo.account, 45, 250)
    
        .fontSize(18).font("Helvetica-Bold").text("Invoice Summary", 400, 175)
        .rect(400, 195, 400, 108).stroke('#000')
        .fontSize(15).font("Helvetica-Bold").text("Invoice Number", 405, 200)
        .fontSize(10).font("Helvetica").text(data.invoiceNumber, 405, 215)
        .fontSize(15).font("Helvetica-Bold").text("Period From ~ Period To", 405, 235)
        .fontSize(10).font("Helvetica").text(`${data.userInfo.periodFrom} ~ ${data.userInfo.periodTo}`, 405, 250)
        .fontSize(15).font("Helvetica-Bold").text("Due Date", 405, 270)
        .fontSize(10).font("Helvetica").text(data.userInfo.dueDate, 405, 285)
}