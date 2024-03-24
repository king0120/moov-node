import {wrappedFetch} from "./utils/wrappedFetch";
import {Account, AccountSettings, CustomerSupport, Name, Profile} from "./types";

export type Countries = string[];
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
export type AccountListCriteria = {
    // If provided, this query will attempt to find matches (including partial) against the following Account and Profile fields: Account `displayName`, Individual Profile `firstName`, `middleName`, `lastName`, and `suffix`, and Business Profile `legalBusinessName`, and `doingBusinessAs`
    name?: Name;
    //Filter connected accounts by email address. It is not necessary to provided the full email address as partial matches will also be returned.
    email?: string;
    // Filter connected accounts by AccountType. If the `type` parameter is used in combination with name, only the corresponding type's `name` fields will be searched. For example, if `type=business` and `name=moov`, the search will attempt to find matches against the display name and Business Profile name fields (`legalBusinessName`, and `doingBusinessAs`).
    type?: "individual" | "business";
    // Serves as an optional alias from a foreign/external system which can be used to reference this resource
    foreignID?: string;
    // Optional parameter to limit the number of results in the query
    count?: number;
    // The number of items to offset before starting to collect the result set
    skip?: number;
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
    /**
     * Retrieves details for the list of accounts.
     * The `ACCOUNTS_READ` scope enum is required when making a request from the browser.
     */
    list: async (criteria: AccountListCriteria): Promise<Account[]> => {
        const params = new URLSearchParams(criteria as any).toString();
        return await wrappedFetch(`accounts${params ? "?" + params : ""}`);
    },
    /**
     * Retrieves details for the account with the specified ID.
     * The `PROFILE_READ` scope enum is required when making a request from the browser.
     */
    get: async (connectedAccountID: string): Promise<Account> => {
        return await wrappedFetch(`accounts/${connectedAccountID}`);
    },
    /**
     * Updates an existing account. Does not require a complete Account object,
     * but the `accountID` property is required.
     * The `PROFILE_WRITE` scope enum is required when making a request from the browser.
     */
    async patch(account: Account): Promise<Account> {
        const patchAccount = {...account};

        delete patchAccount.accountID;
        return await wrappedFetch(`accounts/${account.accountID}`, {
            method: "PATCH",
            body: JSON.stringify(patchAccount),
        });
    },
    /**
     * Retrieve the specified countries of operation for an account.
     * The `PROFILE_READ` scope enum is required when making a request from the browser.
     */
    async getCountries(accountID: string): Promise<Countries> {
        return await wrappedFetch(`accounts/${accountID}/countries`);
    },
    /**
     * Assign the countries of operation for an account. This endpoint will always overwrite the previously assigned values.
     * The `PROFILE_WRITE` scope enum is required when making a request from the browser.
     */
    async assignCountries(accountID: String, countries: Countries): Promise<Countries> {
        return await wrappedFetch(`accounts/${accountID}/countries`, {
            method: "PUT",
            body: JSON.stringify(countries),
        });
    }
}
