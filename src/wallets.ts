import {wrappedFetch} from "./utils/wrappedFetch";
import {checkString} from "./utils/checks";
import {Err} from "./utils/errors";

export const wallets = {
    async get(accountID, walletID) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(walletID).or(Err.MISSING_WALLET_ID);
        return wrappedFetch(`accounts/${accountID}/wallets/${walletID}`);
    },
    async list(accountID) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/wallets`);
    },
    async getTransaction(accountID: string, walletID: string, transactionID: string) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(walletID).or(Err.MISSING_WALLET_ID);
        checkString(transactionID).or(Err.MISSING_WALLET_TRANSACTION_ID);
        return wrappedFetch(`accounts/${accountID}/wallets/${walletID}/transactions/${transactionID}`);
    },
    async listTransactions(accountID, walletID, criteria) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(walletID).or(Err.MISSING_WALLET_ID);
        return wrappedFetch(`accounts/${accountID}/wallets/${walletID}/transactions`, criteria);
    }
}