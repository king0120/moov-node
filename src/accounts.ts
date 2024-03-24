import {wrappedFetch} from "./utils/wrappedFetch";
import {Account} from "./types";


export const accounts = {
    create: async (account): Promise<Account> => {
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
