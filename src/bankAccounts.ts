import {wrappedFetch} from "./utils/wrappedFetch";
import {Err} from "./utils/errors";
import {check, checkString} from "./utils/checks";

export interface BankAccountAdd {
    holderName: string;
    holderType: 'individual' | 'business';
    routingNumber: string;
    accountNumber: string;
    bankAccountType?: 'checking' | 'savings' | 'unknown';
}

export interface BankAccount {
    // Bank Account identifier
    bankAccountID: string;
    // Fingerprint of Bank Account
    fingerprint: string;
    // The bank account status
    status: 'new' | 'verified' | 'verificationFailed' | 'pending' | 'errored';
    // Name of the bank account holder
    holderName: string;
    // The type of holder on a funding source
    holderType: 'individual' | 'business';
    // Name of the bank
    bankName: string;
    // The bank account type
    bankAccountType: 'checking' | 'savings' | 'unknown';
    // Bank account routing number
    routingNumber: string;
    // Last four digits of the bank account number
    lastFourAccountNumber: string;
}

export const bankAccounts = {
    /**
     * Link a bank account to a Moov account
     *
     * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
     */
    async link(accountID: string, bankAccount?: BankAccountAdd, plaidToken?: string, mxAuthorizationCode?: string): Promise<BankAccount> {
        let payload = {};
        if (!accountID) {
            console.log(Err.MISSING_ACCOUNT_ID);
            throw new Error(Err.MISSING_ACCOUNT_ID);
        }

        if (!bankAccount && !plaidToken && !mxAuthorizationCode) {
            console.log(Err.MISSING_BANK_PAYLOAD);
            throw new Error(Err.MISSING_BANK_PAYLOAD);
        }

        if (bankAccount) {
            if (!bankAccount.accountNumber) {
                console.log(Err.MISSING_BANK_ACCOUNT_NUMBER);
                throw new Error(Err.MISSING_BANK_ACCOUNT_NUMBER);
            }
            if (!bankAccount.routingNumber) {
                console.log(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER);
                throw new Error(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER);
            }
            if (bankAccount.routingNumber.length !== 9) {
                console.log(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER_LENGTH);
                throw new Error(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER_LENGTH);
            }
            if (!bankAccount.holderName) {
                console.log(Err.MISSING_BANK_ACCOUNT_HOLDER_NAME);
                throw new Error(Err.MISSING_BANK_ACCOUNT_HOLDER_NAME);
            }
            if (!bankAccount.holderType) {
                console.log(Err.MISSING_BANK_ACCOUNT_HOLDER_TYPE);
                throw new Error(Err.MISSING_BANK_ACCOUNT_HOLDER_TYPE);
            }
            payload = {
                account: bankAccount,
            };
        } else if (plaidToken) {
            payload = {
                plaid: {token: plaidToken},
            };
        } else if (mxAuthorizationCode) {
            payload = {
                mx: {authorizationCode: mxAuthorizationCode},
            };
        }
        return wrappedFetch(`accounts/${accountID}/bank-accounts`, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
    /**
     * Retrieve bank account details (i.e. routing number or account type) associated with a specific Moov account.
     *
     * The `BANK_ACCOUNTS_READ` scope enum is required when making a request from the browser.
     */
    async get(accountID: string, bankAccountID: string): Promise<BankAccount> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts/${bankAccountID}`);
    },
    /**
     * List all the bank accounts associated with a particular Moov account.
     *
     * The `BANK_ACCOUNTS_READ` scope enum is required when making a request from the browser.
     */
    async list(accountID: string): Promise<BankAccount[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts`);
    },
    /**
     * Discontinue using a specified bank account linked to a Moov account.
     *
     * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
     */
    async disable(accountID: string, bankAccountID: string): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts/${bankAccountID}`, {
            method: "DELETE",
        });
    },
    /**
     * Initiate a micro deposit for a bank account linked to a Moov account.
     *
     * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
     */
    async initMicroDeposits(accountID: string, bankAccountID: string): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts/${bankAccountID}/micro-deposits`, {
            method: "POST",
        });
    },
    /**
     * Complete the micro-deposit validation process by passing the amounts of the two transfers.
     *
     * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
     */
    async completeMicroDeposits(accountID: string, bankAccountID: string, amounts: [number, number]): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
        check(amounts).or(Err.MISSING_AMOUNTS);

        return await wrappedFetch(`accounts/${accountID}/bank-accounts/${bankAccountID}/micro-deposits`, {
            method: "PUT",
            body: JSON.stringify({amounts}),
        });
    }
}
