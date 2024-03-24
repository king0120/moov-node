import {wrappedFetch, wrappedFetchBase} from "../wrappedFetch";
import {check, checkString} from "../utils/checks";
import {Err} from "../utils/errors";

export const enrichments = {
    getAvatar: async (accountID: string) => {
        const res = await wrappedFetchBase(`avatars/${accountID}`);
        return res.blob();
    },
    async getAddress(criteria) {
        check(criteria).or(Err.MISSING_CRITERIA);
        checkString(criteria.search).or(Err.MISSING_ENRICH_ADDRESS_SEARCH);
        const params = new URLSearchParams();
        if (criteria) {
            if (criteria.search) {
                params.append("search", criteria.search);
            }
            if (criteria.maxResults) {
                params.append("maxResults", criteria.maxResults.toString());
            }
            if (criteria.includeCities) {
                params.append("includeCities", criteria.includeCities);
            }
            if (criteria.includeStates) {
                params.append("includeStates", criteria.includeStates);
            }
            if (criteria.includeZipcodes) {
                params.append("includeZipcodes", criteria.includeZipcodes);
            }
            if (criteria.excludeStates) {
                params.append("excludeStates", criteria.excludeStates);
            }
            if (criteria.preferCities) {
                params.append("preferCities", criteria.preferCities);
            }
            if (criteria.preferStates) {
                params.append("preferStates", criteria.preferStates);
            }
            if (criteria.preferZipcodes) {
                params.append("preferZipcodes", criteria.preferZipcodes);
            }
            if (criteria.preferRatio) {
                params.append("preferRatio", criteria.preferRatio.toString());
            }
            if (criteria.preferGeolocation) {
                params.append("preferGeolocation", criteria.preferGeolocation);
            }
            if (criteria.selected) {
                params.append("selected", criteria.selected);
            }
            if (criteria.source) {
                params.append("source", criteria.source);
            }
        }

        return wrappedFetch(`enrichment/address${params.toString()}`);
    },
    async getProfile(email: string) {
        checkString(email).or(Err.MISSING_EMAIL);
        return wrappedFetch(`enrichment/profile?email=${email}`);
    }
}