import {wrappedFetch} from "./utils/wrappedFetch";
import {checkString} from "./utils/checks";
import {Err} from "./utils/errors";
import {BankAccount} from "./bankAccounts";

// Describes a Payment Method.
export type PaymentMethod = {
    // Payment Method identifier
    paymentMethodID: string;
    // Fingerprint of Bank Account
    paymentMethodType: 'moov-wallet' | 'ach-debit-fund' | 'ach-debit-collect' | 'ach-credit-standard' | 'ach-credit-same-day' | 'card-payment'
    // Optional wallet object when payment method type is 'moov-wallet'.
    wallet?: {
        walletID: string;
    };
    // Optional bank account object when payment method type is one of 'ach-debit-fund', 'ach-debit-collect', ach-credit-standard', or 'ach-credit-same-day'.
    bankAccount?: BankAccount;
}

export const paymentMethods = {
    /**
     * Get the specified payment method associated with a Moov account.
     *
     * The `PAYMENT_METHODS_READ` scope enum is required when making a request from the browser.
     */
    async get(accountID: string, paymentMethodID: string): Promise<PaymentMethod> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(paymentMethodID).or(Err.MISSING_PAYMENT_METHOD_ID);
        return wrappedFetch(`accounts/${accountID}/payment-methods/${paymentMethodID}`);
    },
    /**
     * Retrieve all of the payment methods associated with a Moov account.
     *
     * The `PAYMENT_METHODS_READ` scope enum is required when making a request from the browser.
     */
    async list(accountID: string): Promise<PaymentMethod[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/payment-methods`);
    }
}