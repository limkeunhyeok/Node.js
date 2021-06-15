exports.invoiceFooter = (doc) => {
    doc
        .fontSize(9).font("Helvetica").text("Thank you for your business!", 40, 530)
        .fontSize(9).font("Helvetica").text("Any question? Please contact us anytime at support@ppcwiz.com", 40, 550)
}