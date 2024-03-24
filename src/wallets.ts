import {wrappedFetch} from "./utils/wrappedFetch";
import {checkString} from "./utils/checks";
import {Err} from "./utils/errors";
import {Wallet, WalletTransaction, WalletTransactionListCriteria} from "./types/walletTypes";


/**
 * The Wallets API
 */
export const wallets = {
    /**
     * Get information on a specific Moov wallet (e.g., the available balance).
     *
     * The `WALLETS_READ` scope enum is required when making a request from the browser.
     */
    async get(accountID: string, walletID: string): Promise<Wallet> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(walletID).or(Err.MISSING_WALLET_ID);
        return wrappedFetch(`accounts/${accountID}/wallets/${walletID}`);
    },
    /**
     * List the wallets associated with a Moov account.
     *
     * The `WALLETS_READ` scope enum is required when making a request from the browser.
     */
    async list(accountID: string): Promise<Wallet[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/wallets`);
    },
    /**
     * Get the details of a wallet transaction.
     *
     * The `WALLETS_READ` scope enum is required when making a request from the browser.
     */
    async getTransaction(accountID: string, walletID: string, transactionID: string): Promise<WalletTransaction> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(walletID).or(Err.MISSING_WALLET_ID);
        checkString(transactionID).or(Err.MISSING_WALLET_TRANSACTION_ID);
        return wrappedFetch(`accounts/${accountID}/wallets/${walletID}/transactions/${transactionID}`);
    },
    /**
     * List the transactions in a wallet.
     *
     * The `WALLETS_READ` scope enum is required when making a request from the browser.
     */
    async listTransactions(accountID: string, walletID: string, criteria: WalletTransactionListCriteria): Promise<Wallet[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(walletID).or(Err.MISSING_WALLET_ID);
        const params = new URLSearchParams(criteria as Record<string, string>);
        return wrappedFetch(`accounts/${accountID}/wallets/${walletID}/transactions?${params.toString()}`);
    }
}