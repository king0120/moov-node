import {wrappedFetch} from "../utils/wrappedFetch";
import {Err} from "../utils/errors";
import {check, checkString} from "../utils/checks";

interface BankAccountAdd {
    holderName: string;
    holderType: 'individual' | 'business';
    routingNumber: string;
    accountNumber: string;
    bankAccountType?: 'checking' | 'savings' | 'unknown';
}

export const bankAccounts = {
    async link(accountID: string, bankAccount: BankAccountAdd, plaidToken: string, mxAuthorizationCode: string) {
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
    async get(accountID: string, bankAccountID: string) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts/${bankAccountID}`);
    },
    async list(accountID) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts`);
    },
    async disable(accountID: string, bankAccountID: string) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts/${bankAccountID}`, {
            method: "DELETE",
        });
    },
    async initMicroDeposits(accountID: string, bankAccountID: string): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/bank-accounts/${bankAccountID}/micro-deposits`, {
            method: "POST",
        });
    },
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
