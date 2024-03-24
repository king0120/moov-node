import {wrappedFetch} from "./utils/wrappedFetch";
import {Account, AccountSettings, CustomerSupport, Profile} from "./types";

export type AccountCreate = {
    // Type of entity represented by this account
    accountType: "individual" | "business";
    // Details for individual or business
    profile: Profile;
    // Arbitrary key-value pairs
    metadata: object;
    // An encrypted value used to record acceptance of Moov's Terms of Service
    termsOfService?: { token: string };
    // Optional identification or alias
    foreignID: string;
    // Displayed on credit card transactions (business only)
    customerSupport?: CustomerSupport;
    // Account settings
    settings?: AccountSettings;
}

export const accounts = {
    /**
     * Create a new connected account.
     *
     * The `ACCOUNTS_CREATE` scope enum is required when making a request from the browser.
     */
    create: async (account: AccountCreate): Promise<Account> => {
        const result = await wrappedFetch("accounts", {
            method: "POST",
            body: JSON.stringify(account),
        });

        return JSON.parse(result);
    },
    list: async (accountID: string, criteria) => {
        let params = "";
        if (criteria) {
            params = "?";
            for (const [key, value] of Object.entries(criteria)) {
                params += key + "=" + value + "&";
            }
        }
        params = params.substring(0, params.length - 1);
        return await wrappedFetch(`accounts${params}`);
    },
    get: async (connectedAccountID: string) => {
        return await wrappedFetch(`accounts/${connectedAccountID}`);
    },
    async patch(account) {
        const patchAccount = {...account};

        delete patchAccount.accountID;
        return await wrappedFetch(`accounts/${account.accountID}`, {
            method: "PATCH",
            body: JSON.stringify(patchAccount),
        });
    },
    async getCountries(accountID) {
        return await wrappedFetch(`accounts/${accountID}/countries`);
    },
    async assignCountries(accountID, countries) {
        return await wrappedFetch(`accounts/${accountID}/countries`, {
            method: "PUT",
            body: JSON.stringify(countries),
        });
    }
}
