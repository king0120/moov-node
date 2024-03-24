import {wrappedFetch} from "../utils/wrappedFetch";
import {check, checkString} from "../utils/checks";
import {Err} from "../utils/errors";

export type CARD_BRAND = 'American Express' | 'Discover' | 'MasterCard' | 'Visa'
export type CARD_TYPE = 'credit' | 'debit' | 'prepaid' | 'unknown'
export type CARD_VERIFICATION_STATUS = 'noMatch' | 'match' | 'notChecked' | 'unavailable'
export type CardExpiration = {
    month: string;
    year: string;
}
export type CardBillingAddress = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
}
export type CardVerificationStatuses = {
    cvv: 'noMatch' | 'match' | 'notChecked' | 'unavailable';
    addressLine1: 'noMatch' | 'match' | 'notChecked' | 'unavailable';
    postalCode: 'noMatch' | 'match' | 'notChecked' | 'unavailable';
}

export type Card = {
    cardID: string;
    fingerprint: string;
    brand: CARD_BRAND;
    cardType: CARD_TYPE;
    lastFourCardNumber: string;
    bin: string;
    expiration: CardExpiration;
    holderName: string;
    billingAddress: CardBillingAddress;
    cardVerification: CardVerificationStatuses;
    issuer: string;
    issuerCountry: string;
}
export type LinkCard = {
    cardNumber: string;
    expiration: CardExpiration;
    cardCvv: string;
    holderName: string;
    billingAddress: CardBillingAddress;
}

export const cards = {
    async get(accountID: string, cardID: string): Promise<Card> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(cardID).or(Err.MISSING_CARD_ID);
        return wrappedFetch(`accounts/${accountID}/cards/${cardID}`);
    },
    async list(accountID: string): Promise<Card[]> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        return wrappedFetch(`accounts/${accountID}/cards`);
    },
    async link(accountID: string, card: LinkCard): Promise<Card> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        check(card).or(Err.MISSING_CARD);
        return wrappedFetch(`accounts/${accountID}/cards`, {
            method: "POST",
            body: JSON.stringify(card),
        });
    },
    async disable(accountID: string, cardID: string): Promise<void> {
        checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
        checkString(cardID).or(Err.MISSING_CARD_ID);
        return wrappedFetch(`accounts/${accountID}/cards/${cardID}`, {
            method: "DELETE",
        });
    }
}