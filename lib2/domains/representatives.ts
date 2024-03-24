import {wrappedFetch} from "../wrappedFetch";
import {check, checkString} from "../utils/checks";
import {Err} from "../utils/errors";

export const representatives = {
    async create(accountID: string, representative) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        check(representative).or(Err.MISSING_REPRESENTATIVE);
        return wrappedFetch(`accounts/${accountID}/representatives`, {
            method: "POST",
            body: JSON.stringify(representative),
        });
    },
    async list(accountID) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/representatives`);
    },
    async get(accountID, representativeID) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(representativeID).or(Err.MISSING_REPRESENTATIVE_ID);
        return wrappedFetch(`accounts/${accountID}/representatives/${representativeID}`);
    },
    async delete(accountID, representativeID) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(representativeID).or(Err.MISSING_REPRESENTATIVE_ID);
        return wrappedFetch(`accounts/${accountID}/representatives/${representativeID}`, {
            method: "DELETE",
        });
    },
    async update(accountID: string, representativeID: string, representative) {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(representativeID).or(Err.MISSING_REPRESENTATIVE_ID);
        check(representative).or(Err.MISSING_REPRESENTATIVE);
        return wrappedFetch(`accounts/${accountID}/representatives/${representativeID}`, {
            method: "PATCH",
            body: JSON.stringify(representative),
        });
    }
}