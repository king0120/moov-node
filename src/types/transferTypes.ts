import {Address} from "./index";

export type CardDetails = {
    // An optional override of the default card statement descriptor for a single transfer
    dynamicDescriptor: string;
    // Enum: [recurring unscheduled] Describes how the card transaction was initiated
    merchantInitiatedType: "recurring" | "unscheduled" | null;
}

export type PaymentMethodAccount = {
    // Payment method identifier
    accountID: string;
    // Email associated with the payment method
    email: string;
    // Display name associated with the payment method
    displayName: string;
}

export type BankAccount = {
    // Bank Account identifier
    bankAccountID: string;
    // Fingerprint of the bank account
    fingerprint: string;
    // Bank account status
    status: "new" | "verified" | "verificationFailed" | "pending" | "errored";
    // Name of the account holder
    holderName: string;
    // Type of holder on a funding source
    holderType: "individual" | "business";
    // Name of the bank
    bankName: string;
    // Bank account type
    bankAccountType: "checking" | "savings" | "unknown";
    // Bank account routing number
    routingNumber: string;
    // Last four digits of the bank account number
    lastFourAccountNumber: string;
}

export type Wallet = {
    // Wallet identifier
    walletID: string;
}

export type CardExpiration = {
    // 2 characters
    month: string;
    // 2 characters
    year: string;
}

export type CardVerification = {
    // Card Verification Value status
    cvv: "noMatch" | "match" | "notChecked" | "unavailable";
    // Address status
    addressLine1: "noMatch" | "match" | "notChecked" | "unavailable";
    // Postal code status
    postalCode: "noMatch" | "match" | "notChecked" | "unavailable";
}

export type Card = {
    // Card identifier
    cardID: string;
    // Fingerprint of the card
    fingerprint: string;
    // Card brand
    brand: "American Express" | "Discover" | "MasterCard" | "Visa";
    // Card type
    cardType: "debit" | "credit" | "prepaid" | "unknown";
    // Last four digits of the card number
    lastFourCardNumber: string;
    // Bank Identification Number
    bin: string;
    // The card's expiration date
    expiration: CardExpiration;
    // The cardholder's name
    holderName: string;
    // The billing address associated with the card
    billingAddress: Address;
    // The results of submitting cardholder data to a card network for verification
    cardVerification: CardVerification;
}

export type ACHCode = {
    // Ach return code (for example, R01)
    code: string;
    // The network's reason for the return or correction (for example, insufficient funds)
    reason: string;
    // Explanation of the return code and reason
    description: string;
}

export type ACHDetails = {
    // ACH rail status
    status: "initiated" | "originated" | "corrected" | "returned" | "completed";
    // Tracking number that can be used by payment recipient to trace the payment with their external financial institution
    traceNumber: string;
    // ACH return information per Nacha specification
    return?: ACHCode;
    // ACH notification of change information per Nacha specification
    correction?: ACHCode;
}

export type PaymentMethod = {
    // Payment method identifier
    paymentMethodID: string;
    // Allowed payment method types
    paymentMethodType: "moov-wallet" | "ach-debit-fund" | "ach-debit-collect" | "ach-credit-standard" | "ach-credit-same-day" | "rtp-credit" | "card-payment";
    // Account information associated with the payment method
    account: PaymentMethodAccount;
    // Optional bank account object when payment method type is one of `ach-debit-fund`, `ach-debit-collect`, `ach-credit-standard`, or `ach-credit-same-day`
    bankAccount?: BankAccount;
    // Optional card object when payment method type is one of `card-payment` or `apple-pay`
    card?: Card;
    // Optional wallet object when payment method type is `moov-wallet`
    wallet?: Wallet;
    // Information about ACH transfers and status details
    achDetails?: ACHDetails;
    // Statement descriptor and recurring flag for card payments
    cardDetails?: CardDetails;
}

export type Amount = {
    // Integer quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
    value: number;
    // 3 letter ISO 4217 currency code
    currency: string;
}

export type Refund = {
    // Refund identifier
    refundID: string;
    // Date-time the refund was created on
    createdOn: string;
    // Date-time the refund was updated on
    updatedOn: string;
    // Refund status
    status: "created" | "pending" | "completed" | "failed";
    // Refund amount
    amount: Amount;
}

export type Transfer = {
    // Transfer identifier
    transferID: string;
    // Deprecated (now createdOn)
    createdAt: string;
    // Date-time the transfer was created on
    createdOn: string;
    // Transfer status
    status: "created" | "pending" | "completed" | "failed" | "reversed";
    // `paymentMethodID` or `transferID`
    source: PaymentMethod;
    // `paymentMethodID`
    destination: PaymentMethod;
    // Transfer amount
    amount: Amount;
    // Transfer description (128 characters max)
    description: string;
    // Arbitrary key-value pairs
    metadata: object;
    // The total refunded amount
    refundedAmount?: Amount;
    // Array of refunds associated with the transfer
    refunds: Refund[];
    // Total or markup fee
    facilitatorFee: object;
    // Integer quantity of Moov fee in USD, so $0.11 would be 11
    moovFee: number;
    // The precise fee charged - supports up to 9 decimals
    moovFeeDecimal: string;
}

export type TransferCreate = {
    // `paymentMethodID` or `transferID`
    source: PaymentMethod;
    // `paymentMethodID`
    destination: PaymentMethod;
    // Transfer amount represented by an integer value and its currency
    amount: Amount;
    // Total or markup fee
    facilitatorFee: object;
    // Transfer description (128 characters max)
    description: string;
    // Arbitrary key-value pairs
    metadata: object;
}

export type TransferResponse = {
    // Transfer identifier
    transferID: string;
}

export type TransferListCriteria = {
    // Optional list of account IDs to filter sources and destinations
    accountIDs?: string[];
    // Optional transfer status by which to filter the transfers
    status?: string;
    // Optional date-time which inclusively filters all transfers created after this starting date-time
    startDateTime?: string;
    // Optional date-time which exclusively filters all transfers created before this date-time
    endDateTime?: string;
    // Optional parameter to limit the number of results in the query
    count?: number;
    // Optional number of items to offset before starting to collect the result set
    skip?: number;
}

export type TransferOptionsCriteria = {
    // `accountID` or `paymentMethodID`
    source?: {
        // `accountID` associated with the transfer source
        accountID?: string;
        // `paymentMethodID` associated with the transfer source
        paymentMethodID?: string;
    };
    // `accountID` or `paymentMethodID`
    destination?: {
        // `accountID` associated with the transfer destination
        accountID?: string;
        // `paymentMethodID` associated with the transfer destination
        paymentMethodID?: string;
    };
    // Transfer amount represented by an integer value and its currency
    amount: Amount;
}

export type TransferOptions = {
    // `paymentMethodID` associated with a transfer
    paymentMethodID: string;
    // Allowed payment method types
    paymentMethodType: "moov-wallet" | "ach-debit-fund" | "ach-debit-collect" | "ach-credit-standard" | "ach-credit-same-day" | "rtp-credit" | "card-payment";
    // Populated when `paymentMethodType` is `moov-wallet`
    wallet: Wallet;
    // Populated when `paymentMethodType` is one of the ACH or FTP variations
    bankAccount: BankAccount;
    // Populated when `paymentMethodType` is `card-payment`
    card: Card;
}

export type AvailableTransferOptions = {
    // Array of available payment methods for the source of a transfer
    sourceOptions: TransferOptions[];
    // Array of available payment methods for the destination of a transfer
    destinationOptions: TransferOptions[];
}
