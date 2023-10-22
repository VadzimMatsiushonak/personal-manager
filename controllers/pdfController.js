const {prisma} = require('../config/prisma');
const pdf = require('pdf-parse');
const {getTransactions} = require('../util/pdfUtil');

async function parseTransactions(req, res) {
    // The PDF file will be in the req.file.buffer property
    // Parse the PDF file
    const parsedPdf = await pdf(req.file.buffer);

    const lines = parsedPdf.text.split('\n');

    // Get the transactions from the parsed PDF file
    const transactions = getTransactions(lines);

    // Send the transactions back to the client
    res.json(transactions);
}

module.exports = {
    parseTransactions
};