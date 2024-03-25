export interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
}

export interface Phone {
    number: string;
    countryCode?: string;
}

export interface Name {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
}

export interface Responsibility {
    isController: boolean;
    isOwner: boolean;
    ownershipPercentage: number;
    jobTitle: string;
}

export interface Representative {
    name: Name;
    phone: Phone;
    email: string;
    address: Address;
    birthDateProvided: boolean;
    governmentIDProvided: boolean;
    responsibilities: Responsibility[];
    createdOn: string;
    updatedOn: string;
    disabledOn: string;
}

export interface IndustryCodes {
    naics: string;
    sic: string;
    mcc: string;
}

export interface BusinessProfile {
    legalBusinessName: string;
    doingBusinessAs: string;
    businessType: "soleProprietorship" | "unincorporatedAssociation" | "trust" | "publicCorporation" | "privateCorporation" | "llc" | "partnership" | "unincorporatedNonProfit" | "incorporatedNonProfit";
    address: Address;
    phone: Phone;
    email: string;
    website: string;
    description: string;
    taxIDProvided: boolean;
    representatives: Representative[];
    ownersProvided: boolean;
    industryCodes: IndustryCodes;
}

export interface IndividualProfile {
    name: Name;
    phone: Phone;
    email: string;
    address: Address;
    birthDateProvided: boolean;
    governmentIDProvided: boolean;
}

export interface Profile {
    business?: BusinessProfile
    individual?: IndividualProfile
}

export interface AccountVerification {
    verificationStatus: "unverified" | "pending" | "resubmit" | "review" | "verified" | "failed";
}

export interface CustomerSupport {
    phone: Phone;
    email: string;
    address: Address;
    website: string;
}

export interface CardPaymentSettings {
    statementDescriptor: string;
}

export interface AccountSettings {
    cardPayment: CardPaymentSettings;
}

export interface Account {
    /**
     * @property {AccountVerification} verification - Describes identity verification status and relevant identity verification documents
     * @property {CustomerSupport|null} customerSupport - Displayed on credit card transactions (business only)
     * @property {AccountSettings|null} settings - Account settings
     * @property {string} createdOn - Date account was created
     * @property {string} updatedOn - Date account was last updated
     */
    accountID: string;
    accountType: 'individual' | 'business';
    displayName: string;
    profile: Profile;
    metadata: Record<string, unknown>;
    foreignID: string;
    verification: AccountVerification;
    customerSupport: CustomerSupport | null;
    settings: AccountSettings | null;
    createdOn: string;
    updatedOn: string;
    "termsOfService": {
        "acceptedDate": string,
        "acceptedIP": string
    },
}