import {wrappedFetch} from "../wrappedFetch";
import {Err} from "../utils/errors";
import {check, checkString} from "../utils/checks";

export type CAPABILITY = 'transfers' | 'send-funds' | 'collect-funds' | 'wallet' | '1099'

export const capabilities = {
    async requestCapabilities(accountID: string, capabilities: CAPABILITY[]): Promise<CAPABILITY[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        check(capabilities).or(Err.MISSING_CAPABILITIES);
        return wrappedFetch(`accounts/${accountID}/capabilities`, {
            method: "POST",
            body: JSON.stringify({capabilities}),
        });
    },
    async get(accountID: string, capability: CAPABILITY): Promise<CAPABILITY> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(capability).or(Err.MISSING_CAPABILITY);

        return wrappedFetch(`accounts/${accountID}/capabilities/${capability}`)
    },
    async list(accountID: string): Promise<CAPABILITY[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/capabilities`);
    },
    async disable(accountID: string, capability: CAPABILITY): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(capability).or(Err.MISSING_CAPABILITY);
        return wrappedFetch(`accounts/${accountID}/capabilities/${capability}`, {
            method: "DELETE",
        });
    }
}