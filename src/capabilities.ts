import {wrappedFetch} from "./utils/wrappedFetch";
import {Err} from "./utils/errors";
import {check, checkString} from "./utils/checks";

export type CAPABILITY = 'transfers' | 'send-funds' | 'collect-funds' | 'wallet' | '1099'

/**
 * The Capabilities API
 */
export const capabilities = {
    /**
     * Request a capability to be added to an account.
     *
     * The `CAPABILITIES_WRITE` scope enum is required when making a request from the browser.
     */
    async requestCapabilities(accountID: string, capabilities: CAPABILITY[]): Promise<CAPABILITY[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        check(capabilities).or(Err.MISSING_CAPABILITIES);
        return wrappedFetch(`accounts/${accountID}/capabilities`, {
            method: "POST",
            body: JSON.stringify({capabilities}),
        });
    },
    /**
     * Retrieve a capability of an account
     *
     * The `CAPABILITIES_READ` scope enum is required when making a request from the browser.
     */
    async get(accountID: string, capability: CAPABILITY): Promise<CAPABILITY> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(capability).or(Err.MISSING_CAPABILITY);

        return wrappedFetch(`accounts/${accountID}/capabilities/${capability}`)
    },
    /**
     * List capabilities on an account
     *
     * The `CAPABILITIES_READ` scope enum is required when making a request from the browser.
     */
    async list(accountID: string): Promise<CAPABILITY[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/capabilities`);
    },
    /**
     * Disable a capability of an account
     *
     * The `CAPABILITIES_WRITE` scope enum is required when making a request from the browser.
     */
    async disable(accountID: string, capability: CAPABILITY): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(capability).or(Err.MISSING_CAPABILITY);
        return wrappedFetch(`accounts/${accountID}/capabilities/${capability}`, {
            method: "DELETE",
        });
    }
}