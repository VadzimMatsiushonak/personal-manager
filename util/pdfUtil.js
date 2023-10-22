const DATE_PATTERN = /^\d{2}\.\d{2}\.\d{4}$/;
const TRANSACTION_PATTERN = /(-?\d{1,5},\d{2})\s(BYN|USD|RUB|EUR)(-?\d{1,5},\d{2})\s(BYN|USD|RUB|EUR)/;

function getTransactions(lines) {
    let foundDateIndex = 0;
    let transactions = [];
    let currentTransaction = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (DATE_PATTERN.test(line)) {
            foundDateIndex = i;
            currentTransaction = {date: line};
            transactions.push(currentTransaction);
        } else if (currentTransaction && TRANSACTION_PATTERN.test(line)) {
            const match = TRANSACTION_PATTERN.exec(line);
            currentTransaction.accountAmount = match[1];
            currentTransaction.accountCurrency = match[2];
            currentTransaction.transactionAmount = match[3];
            currentTransaction.transactionCurrency = match[4];
            currentTransaction.description = lines.slice(foundDateIndex + 1, i).join(' ');
            currentTransaction = null;
        }
    }

    return transactions;
}

module.exports = {
    getTransactions
};