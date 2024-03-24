import {wrappedFetch} from "./utils/wrappedFetch";
import {check, checkString} from "./utils/checks";
import {Err} from "./utils/errors";
import {Representative} from "./types";

export type RepresentativeName = {
    // Name this person was given. This is usually the same as first name.  string <= 64 characters
    firstName: string;
    // Name this person was given. This is usually the same as middle name.  string <= 64 characters
    middleName: string;
    // Family name of this person. This is usually the same as last name.  string <= 64 characters
    lastName: string;
    // Suffix of a given name.  string <= 20 characters
    suffix: string;
}

export type RepresentativePhone = {
    // string <phone> <= 10 characters
    number: string;
    // string <= 1 characters
    countryCode: string;
}

export type RepresentativeAddress = {
    // string <= 32 characters
    addressLine1: string;
    // string <= 32 characters
    addressLine2: string;
    // string <= 24 characters
    city: string;
    // string <= 2 characters
    stateOrProvince: string;
    // string <= 5 characters
    postalCode: string;
    // string <= 2 characters
    country: string;
}

export type RepresentativeResponsibilities = {
    // Indicates whether this individual has significant management responsibilities within the business
    isController: boolean;
    // Indicates whether this individual has an ownership stake of at least 25% in the business
    isOwner: boolean;
    // The percentage of ownership this individual has in the business (required if `isOwner` is `true`)
    ownershipPercentage: number;
    // string <= 64 characters
    jobTitle: string;
}

export type RepresentativeBirthDate = {
    // 1 or 2 digit day of birth
    day: number;
    // 1 or 2 digit month of birth
    month: number;
    // 4 digit year of birth
    year: number;
}

export type GovernmentID = {
    // string <= 64 characters
    full: string;
    // string <= 4 characters
    lastFour: string;
}

export type RepresentativeGovernmentID = {
    // Social Security Number
    ssn: GovernmentID;
    // Individual Taxpayer Identification Number
    itin: GovernmentID;
}

export type RepresentativeCreateUpdate = {
    // Name for an individual
    name: RepresentativeName;
    // Phone for an individual
    phone: RepresentativePhone;
    // Email Address.  string <email> <= 255 characters
    email: string;
    // Address for an individual
    address: RepresentativeAddress;
    // Birthdate for an individual
    birthDate: RepresentativeBirthDate;
    // Social Security Number, or Individual Taxpayer Identification Number
    governmentID: RepresentativeGovernmentID;
    // Describes the job responsibilities of an individual
    responsibilities: RepresentativeResponsibilities;
}

export const representatives = {
    /**
     * Create representative
     *
     * The `REPRESENTATIVE_WRITE` scope enum is required when making a request from the browser.
     */
    async create(accountID: string, representative: RepresentativeCreateUpdate): Promise<Representative> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        check(representative).or(Err.MISSING_REPRESENTATIVE);
        return wrappedFetch(`accounts/${accountID}/representatives`, {
            method: "POST",
            body: JSON.stringify(representative),
        });
    },
    /**
     * List representatives
     *
     * The `REPRESENTATIVE_READ` scope enum is required when making a request from the browser.
     */
    async list(accountID: string): Promise<Representative[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/representatives`);
    },
    /**
     * Retrieve a specific representative associated with a given Moov account.
     *
     * The `REPRESENTATIVE_READ` scope enum is required when making a request from the browser.
     */
    async get(accountID: string, representativeID: string): Promise<Representative> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(representativeID).or(Err.MISSING_REPRESENTATIVE_ID);
        return wrappedFetch(`accounts/${accountID}/representatives/${representativeID}`);
    },
    /**
     * Deletes a business representative associated with a Moov account.
     *
     * The `REPRESENTATIVE_WRITE` scope enum is required when making a request from the browser.
     */
    async delete(accountID: string, representativeID: string): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(representativeID).or(Err.MISSING_REPRESENTATIVE_ID);
        return wrappedFetch(`accounts/${accountID}/representatives/${representativeID}`, {
            method: "DELETE",
        });
    },
    /**
     * Update a specific representative.
     *
     * The `REPRESENTATIVE_WRITE` scope enum is required when making a request from the browser.
     */
    async update(accountID: string, representativeID: string, representative: RepresentativeCreateUpdate): Promise<Representative> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(representativeID).or(Err.MISSING_REPRESENTATIVE_ID);
        check(representative).or(Err.MISSING_REPRESENTATIVE);
        return wrappedFetch(`accounts/${accountID}/representatives/${representativeID}`, {
            method: "PATCH",
            body: JSON.stringify(representative),
        });
    }
}