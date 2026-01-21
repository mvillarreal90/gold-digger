import path from "node:path";
import PdfPrinter from "pdfmake";

export function generatePDFDoc(data) {
    try{
        const fonts = {
            Default: {
                normal: path.join("fonts", "Roboto-Regular.ttf"),
            },
        };
        const printer = new PdfPrinter(fonts);
        const docDefinition = buildDocDefinition(data);
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        return pdfDoc;
    } catch (err) {
        throw new Error(err);
    }
}

function buildDocDefinition(data) {
  return {
    content: [
      {
        text: "Gold Investments Report",
        fontSize: 18,
        margin: [0, 0, 0, 10],
      },

      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto"],
          body: [
            [
              "Purchase Date",
              "Amount Paid (£)",
              "Price per oz (£)",
              "Gold Sold (oz)",
            ],
            ...data.map(item => { 
                    const date = new Date(item.purchaseDate);
                    const formattedDate = date.toLocaleString("en-GB", {
                        weekday: "short",
                        day: "2-digit",   
                        month: "short",  
                        year: "numeric",  
                        hour: "2-digit",  
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    }).replace(",", "");
                    return [
                        formattedDate,
                        item.amountPaid,
                        item.pricePerOz,
                        item.goldSold,
                    ]
                }
            ),
          ],
        },
      },
    ],

    defaultStyle: {
      font: "Default",
    },
  };
}