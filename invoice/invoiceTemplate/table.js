// 테이블 헤더
function invoiceTableHeader(
    doc,
    y,
    marketplace,
    filters,
    periodFrom,
    periodTo,
    amount,
) {
    doc
        .fontSize(10)
        .text(marketplace, 40, y, { width: 152, align: "center" })
        .text(filters, 192, y, { width: 152, align: "center" })
        .text(periodFrom, 344, y, { width: 152, align: "center" })
        .text(periodTo, 496, y, { width: 152, align: "center" })
        .text(amount, 646, y, { width: 152, align: "center" });
}

// 테이블 회색 로우
function invoiceTableRowGrey(
    doc,
    y,
    marketplace,
    filters,
    periodFrom,
    periodTo,
    amount,
) {
    doc
        .rect(40, y - 10, 760, 20).fill("#d3d3d3")
        .fontSize(10).fillColor("#444444")
        .font("Helvetica").text(marketplace, 40, y - 4, { width: 152, align: "center" })
        .font("Helvetica").text(filters, 192, y - 4, { width: 152, align: "center" })
        .font("Helvetica").text(periodFrom, 344, y - 4, { width: 152, align: "center" })
        .font("Helvetica").text(periodTo, 496, y - 4, { width: 152, align: "center" })
        .font("Helvetica").text(amount, 646, y - 4, { width: 152, align: "center" })
}

// 테이블 흰색 로우
function invoiceTableRowWhite(
    doc,
    y,
    marketplace,
    filters,
    periodFrom,
    periodTo,
    amount,
) {
    doc
        .fontSize(10).fillColor("#444444")
        .font("Helvetica").text(marketplace, 40, y - 9, { width: 152, align: "center" })
        .font("Helvetica").text(filters, 192, y - 9, { width: 152, align: "center" })
        .font("Helvetica").text(periodFrom, 344, y - 9, { width: 152, align: "center" })
        .font("Helvetica").text(periodTo, 496, y - 9, { width: 152, align: "center" })
        .font("Helvetica").text(amount, 646, y - 9, { width: 152, align: "center" })
}

// 회색 수평선
function invoiceHrGrey(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1.5)
        .moveTo(40, y)
        .lineTo(800, y)
        .stroke();
}

// 검은색 수평선
function invoiceHrBlack(doc, y) {
    doc
        .strokeColor("#000000")
        .lineWidth(1.5)
        .moveTo(40, y)
        .lineTo(800, y)
        .stroke();
}

// 필터 형식
function formatFilters(filters) {
    return filters.join(', ');
}

exports.invoiceTable = (doc, data) => {
    let invoiceTableTop = 320;
    doc
        .fontSize(18).font("Helvetica-Bold").text("Invoice Detail", 40, invoiceTableTop);
    invoiceHrGrey(doc, invoiceTableTop + 20);
  
    invoiceTableHeader(
        doc,
        invoiceTableTop + 26,
        "Marketplace",
        "Filters",
        "Period From",
        "Period To",
        "Amount(USD)",
    );
    invoiceHrGrey(doc, invoiceTableTop + 40);
  
    let dy = 50
    let flag = 1 // 페이지 추가 플래그

    // 사용자 프로필 개수가 6개 이상이면 다음 페이지로 넘어감
    data.items.forEach((item, index) => {
        if (flag && index > 6) {
            flag = 0;
            doc.addPage();
            invoiceTableTop = 40;
            dy = 0;
        }
        if (index % 2 === 0) {
            invoiceTableRowGrey(
                doc,
                invoiceTableTop + dy,
                item.marketplace,
                formatFilters(item.filters),
                data.userInfo.periodFrom,
                data.userInfo.periodTo,
                item.amount,
            );
        dy += 25;
        } else {
            invoiceTableRowWhite(
                doc,
                invoiceTableTop + dy,
                item.marketplace,
                formatFilters(item.filters),
                data.userInfo.periodFrom,
                data.userInfo.periodTo,
                item.amount
            );
            dy += 15;
        }
    })

    if (flag && (invoiceTableTop + dy) > 475) {
        flag = 0;
        doc.addPage();
        invoiceTableTop = 40;
        dy = 0;
    }

    // 청구 금액 총합
    invoiceHrBlack(doc, invoiceTableTop + dy);
    doc
        .fillColor("#444444")
        .fontSize(18).font("Helvetica-Bold").text("Total Amount(USD)", 40, invoiceTableTop + dy + 10)
        .fontSize(15).font("Helvetica").text(`$${data.total}`, 740, invoiceTableTop + dy + 13, { align: "right" })
    invoiceHrBlack(doc, invoiceTableTop + dy + 35);
}
