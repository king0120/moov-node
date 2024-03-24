import {wrappedFetch} from "./utils/wrappedFetch";
import {check} from "./utils/checks";
import {Err} from "./utils/errors";

export const institutions = {
    async getInstitution(criteria, rail) {
        check(criteria).or(Err.MISSING_CRITERIA);

        if (!criteria.name && !criteria.routingNumber) {
            throw new TypeError(Err.MISSING_INSTITUTION_NAME_OR_ROUTING);
        }

        const params = new URLSearchParams();

        if (criteria.routingNumber) {
            params.append("routingNumber", criteria.routingNumber);
        }
        return wrappedFetch(`institutions/${rail}/search?${params.toString()}`);
    },
    async getWireInstitution(criteria) {
        return this.getInstitution(criteria, "wire");
    },
    async getACHInstitution(criteria) {
        return this.getInstitution(criteria, "ach");
    }

}