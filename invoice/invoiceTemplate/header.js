exports.invoiceHeader = (doc, data) => {
    doc
        // 로고 및 문서 번호
        .image("./invoiceTemplate/logo.png", 40, 40, { width: 250 })
        .fontSize(18).font("Helvetica-Bold").text("INVOICE", 300, 115)
        .fontSize(15).font("Helvetica-Bold").text("Invoice number:", 40, 150)
        .fontSize(10).font("Helvetica").text(data.invoiceNumber, 160, 150)
        
        // 회사 정보
        .fontSize(18).font("Helvetica-Bold").text("Paid To", 650, 55)
        .fontSize(10).font("Helvetica").text("PPCWIZ", 650, 80)
        .fontSize(10).font("Helvetica").text("3580 Wilshire BlvdLos Angeles", 650, 93)
        .fontSize(10).font("Helvetica").text("CA 90010", 650, 106)
        .fontSize(10).font("Helvetica").text("United States", 650, 119)
}