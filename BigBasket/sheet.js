const XLSX = require("xlsx-js-style");
const fs = require('fs');
const fileName = "firstSheet.xlsx";
let row1 = [
    "No. of Recipients",
    "",
    "No. of Invoices",
    "",
    "Total Invoice Value",
    "",
    "",
    "",
    "",
    "",
    "",
    "Total Taxable Value",
    "Total Cess",
];
let row2 = [
    "GSTIN/UIN of Recipient",
    "Receiver Name",
    "Invoice Number",
    "Invoice Date",
    "Invoice Value",
    "Place of Supply",
    "Reverse Charge",
    "Applicable % of Tax Rate",
    "Invoice Type",
    "E-Commerce GSTIN",
    "Rate",
    "Taxable Value",
    "Cess Amount",
];
var aoa = [row1, row2]
var workbook = XLSX.utils.book_new();
var sheet = XLSX.utils.aoa_to_sheet(aoa);
let writeOptions = { type: "buffer", bookType: "xlsx", showGridLines: false };
XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
var buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
fs.writeFileSync(fileName, buf, "binary");


function onOpen() {
    let ui = SpreadsheetApp.getUi()
    ui.createMenu("FRETRON").addItem("Attach driver", main).addToUi()
}
var https = "apis.fretron.com/shipment/v1/shipment/04edc816-995a-47a9-905f-6d01de0dc428?skipCn=true"