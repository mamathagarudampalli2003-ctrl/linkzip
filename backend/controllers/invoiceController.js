import PDFDocument from "pdfkit";
import User from "../models/User.js";

export const downloadInvoice = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user.userId
      );

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }

    // ================= GET LATEST PAYMENT =================

    const payment =
      [...(
        user.paymentHistory || []
      )]
      .sort(
        (a, b) =>
          new Date(
            b.paidAt
          ) -
          new Date(
            a.paidAt
          )
      )[0];

    if (!payment) {

      return res.status(404).json({

        success: false,

        message:
          "No invoice found",

      });

    }

    // ================= INVOICE NUMBER =================

    const invoiceNumber =
      `INV-${
        payment.orderId ||
        Date.now()
      }`;

    // ================= PDF =================

    const doc =
      new PDFDocument({
        margin: 50,
      });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoiceNumber}.pdf`
    );

    doc.pipe(res);

    // ================= HEADER =================

    doc
      .fontSize(28)
      .text(
        "LINKZIP",
        {
          align: "center",
        }
      );

    doc
      .fontSize(16)
      .text(
        "Subscription Invoice",
        {
          align: "center",
        }
      );

    doc.moveDown();

    // ================= COMPANY DETAILS =================

    doc
      .fontSize(12)
      .text(
        "LinkZip Technologies"
      );

    doc.text(
      "support@linkzip.com"
    );

    doc.text(
      "India"
    );

    doc.moveDown();

    // ================= INVOICE INFO =================

    doc
      .fontSize(12)
      .text(
        `Invoice Number: ${invoiceNumber}`
      );

    doc.text(
      `Invoice Date: ${new Date().toLocaleDateString()}`
    );

    doc.text(
      `Generated At: ${new Date().toLocaleString()}`
    );

    doc.moveDown();

    // ================= CUSTOMER DETAILS =================

    doc
      .fontSize(16)
      .text(
        "Customer Details"
      );

    doc
      .fontSize(12)
      .text(
        `Name: ${user.username}`
      );

    doc.text(
      `Email: ${user.email}`
    );

    doc.moveDown();

    // ================= SUBSCRIPTION DETAILS =================

    doc
      .fontSize(16)
      .text(
        "Subscription Details"
      );

    doc
      .fontSize(12)
      .text(
        `Plan: ${user.plan.toUpperCase()}`
      );

    doc.text(
      `Subscription Status: ${user.subscriptionStatus}`
    );

    doc.text(
      `Valid Till: ${
        user.planExpiry
          ? new Date(
              user.planExpiry
            ).toLocaleDateString()
          : "N/A"
      }`
    );

    doc.moveDown();

    // ================= PAYMENT DETAILS =================

    doc
      .fontSize(16)
      .text(
        "Payment Information"
      );

    doc
      .fontSize(12)
      .text(
        `Amount Paid: ₹${payment.amount}`
      );

    doc.text(
      `Payment ID: ${
        payment.paymentId || "N/A"
      }`
    );

    doc.text(
      `Order ID: ${
        payment.orderId || "N/A"
      }`
    );

    doc.text(
      `Status: ${
        payment.status || "N/A"
      }`
    );

    doc.text(
      `Payment Date: ${
        payment.paidAt
          ? new Date(
              payment.paidAt
            ).toLocaleDateString()
          : "N/A"
      }`
    );

    doc.moveDown();

    // ================= BILLING SUMMARY =================

    doc
      .fontSize(16)
      .text(
        "Billing Summary"
      );

    doc
      .fontSize(12)
      .text(
        `Subtotal: ₹${payment.amount}`
      );

    doc.text(
      "GST: ₹0"
    );

    doc.text(
      `Total Paid: ₹${payment.amount}`
    );

    doc.moveDown(3);

    // ================= FOOTER =================

    doc
      .fontSize(10)
      .text(
        "Thank you for using LinkZip.",
        {
          align: "center",
        }
      );

    doc.text(
      "This is a system generated invoice.",
      {
        align: "center",
      }
    );

    doc.end();

  } catch (error) {

    console.error(
      "Invoice Generation Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to generate invoice",

    });

  }

};