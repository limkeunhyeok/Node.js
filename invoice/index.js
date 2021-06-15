const { createInvoice } = require("./createInvoice.js");

const data = {
  invoiceNumber: "KR-202106-1-001",
  userInfo: {
    name: "ChangBeom Cho",
    account: "ckdekfdl5788@gmail.com",
    periodFrom: "2021-05-15",
    periodTo: "2021-06-14",
    dueDate: "2021-06-15",
  },
  items: [
    {
      marketplace: "US",
      filters: ["ASIN", "ACOS"],
      amount: "60.6"
    },
    {
      marketplace: "MX",
      filters: ["ASIN", "ACOS"],
      amount: "2.48"
    },
    {
      marketplace: "CA",
      filters: ["ASIN", "ACOS"],
      amount: "1.5"
    },
    {
      marketplace: "US",
      filters: ["ASIN", "ACOS"],
      amount: "60.6"
    },
    {
      marketplace: "MX",
      filters: ["ASIN", "ACOS"],
      amount: "2.48"
    },
    {
      marketplace: "CA",
      filters: ["ASIN", "ACOS"],
      amount: "1.5"
    },
    {
      marketplace: "CA",
      filters: ["ASIN", "ACOS"],
      amount: "1.5"
    },
    {
      marketplace: "MX",
      filters: ["ASIN", "ACOS"],
      amount: "2.48"
    },
    {
      marketplace: "CA",
      filters: ["ASIN", "ACOS"],
      amount: "1.5"
    },
    {
      marketplace: "CA",
      filters: ["ASIN", "ACOS"],
      amount: "1.5"
    },
  ],
  total: "64.58"
}


createInvoice(data, "invoice.pdf");