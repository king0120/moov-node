import {wrappedFetch} from "./utils/wrappedFetch";
import {check} from "./utils/checks";
import {Err} from "./utils/errors";

export type ACHInstitutionSearchCriteria = {
    // Optional financial institution name to search
    name?: string;
    // Optional routing number for a financial institution to search
    routingNumber?: string;
    // Optional parameter to limit the amount of results in the query
    count?: string;
    // Optional The number of items to offset before starting to collect the result set
    skip?: string;
}
// ACH Institution Location object.
export type AchInstitutionLocation = {
    // Up to 32 characters
    address: string;
    // Up to 24 characters
    city: string;
    // Up to 24 characters
    state: string;
    // Up to 5 characters
    postalCode: string;
    // Up to 4 characters
    postalCodeExtension: string;
}
/**
 * ACH Institution holds a FedACH dir routing record as defined by Fed ACH Format.
 */
export type ACHInstitution = {
    // Routing number for an ACH institution
    routingNumber: string;
    // Main/Head Office or Branch. O=main B=branch
    officeCode: string;
    // Servicing Fed's main office routing number
    servicingFRBNumber: string;
    // RecordTypeCode The code indicating the ABA number to be used to route or send ACH items to the RDFI - 0 = Institution is a Federal Reserve Bank - 1 = Send items to customer routing number - 2 = Send items to customer using new routing number field
    recordTypeCode: string;
    // Revised Date of last revision: YYYYMMDD, or blank
    revised: string;
    // Institution's new routing number resulting from a merger or renumber
    newRoutingNumber: string;
    // Customer's name
    customerName: string;
    // Phone number
    phoneNumber: string;
    // Code is based on the customers receiver code
    statusCode: string;
    // ViewCode is current view
    viewCode: string;
    // Location is the delivery address
    location: AchInstitutionLocation;
}
/**
 * Wire Institution Location object.
 */
export type WireInstitutionLocation = {
    // Up to 24 characters
    city: string;
    // Up to 24 characters
    state: string;
}
/**
 * Wire Institution holds a FedWIRE dir routing record as defined by Fed WIRE Format
 */
export type WireInstitution = {
    // Routing number for an Wire institution
    routingNumber: string;
    // The short name of financial institution
    telegraphicName: string;
    // Customer's name
    customerName: string;
    // Location is the delivery address
    location: WireInstitutionLocation;
    // Designates funds transfer status  - Y - Eligible  - N - Ineligible
    fundsTransferStatus: string;
    // Designates funds settlement only status  - S - Settlement-Only
    fundsSettlementOnlyStatus: string;
    // Designates book entry securities transfer status
    bookEntrySecuritiesTransferStatus: string;
    // Date of last revision: YYYYMMDD, or blank
    date: string;
}

//  ACH and Wire Institution participants
export type InstitutionParticipants = {
    achParticipants: ACHInstitution[];
    wireParticipants: WireInstitution[];
}

/**
 * The Institutions API
 */
export const institutions = {
    /**
     * Get information on a financial institution
     *
     * The `FED_READ` scope enum is required when making a request from the browser.
     */
    async getInstitution(criteria: ACHInstitutionSearchCriteria, rail: 'ach' | 'wire'): Promise<InstitutionParticipants> {
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
    /**
     * Get information on a financial institution for WIRE
     *
     * The `FED_READ` scope enum is required when making a request from the browser.
     */
    async getWireInstitution(criteria: ACHInstitutionSearchCriteria): Promise<InstitutionParticipants> {
        return this.getInstitution(criteria, "wire");
    },
    /**
     * Get information on a financial institution for ACH
     *
     * The `FED_READ` scope enum is required when making a request from the browser.
     */
    async getACHInstitution(criteria: ACHInstitutionSearchCriteria): Promise<InstitutionParticipants> {
        return this.getInstitution(criteria, "ach");
    }
}