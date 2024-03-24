import {wrappedFetch} from "./utils/wrappedFetch";
import {checkString} from "./utils/checks";
import {Err} from "./utils/errors";

export const paymentMethods = {
    async get(accountID: string, paymentMethodID: string) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(paymentMethodID).or(Err.MISSING_PAYMENT_METHOD_ID);
        return wrappedFetch(`accounts/${accountID}/payment-methods/${paymentMethodID}`);
    },
    async list(accountID: string) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/payment-methods`);
    }
}