export const Err = {
    // 1. Keep these errors alphabetized
    // 2. Do not use variable names -- use phrases (e.g. "bank account ID" not "bankAccountID")
    // 3. Duplicate the voice and tone used by existing errors when you add a new one
    // 4. Do not capitialize or use punctuation -- these errors are for developers
    MISSING_ACCOUNT_ID: "account ID is required",
    MISSING_AMOUNTS: "amounts are required",
    MISSING_API_KEY_CREDENTIALS: "credentials are required",
    MISSING_BANK_ACCOUNT_HOLDER_NAME: "holder name is required",
    MISSING_BANK_ACCOUNT_HOLDER_TYPE: "holder type is required",
    MISSING_BANK_ACCOUNT_ID: "bank account ID is required",
    MISSING_BANK_ACCOUNT_NUMBER: "bank account number is required",
    MISSING_BANK_ACCOUNT_ROUTING_NUMBER: "routing number is required",
    MISSING_BANK_ACCOUNT_ROUTING_NUMBER_LENGTH: "routing number must be 9 digits",
    MISSING_BANK_PAYLOAD:
        "a bank account, Plaid token, or MX authorization code is required",
    MISSING_CAPABILITIES: "capabilities are required",
    MISSING_CAPABILITY: "capability is required",
    MISSING_CARD: "card information is required",
    MISSING_CARD_ID: "card ID is required",
    MISSING_COUNTRIES: "countries are required",
    MISSING_CRITERIA: "search criteria is required",
    MISSING_DOMAIN: "domain is required and must be a valid URL",
    MISSING_EMAIL: "email is required",
    MISSING_ENRICH_ADDRESS_SEARCH:
        "partial or complete address to search is required",
    MISSING_INSTITUTION_NAME_OR_ROUTING:
        "financial institution's name or routing number to search is required",
    MISSING_PAYMENT_METHOD_ID: "payment method ID is required",
    MISSING_PUBLIC_KEY: "public key is required",
    MISSING_REFUND_ID: "refund ID is required",
    MISSING_REPRESENTATIVE: "representative details are required",
    MISSING_REPRESENTATIVE_ID: "representative ID is required",
    MISSING_SCOPES: "one or more scopes are required",
    MISSING_SECRET_KEY: "secret key is required",
    MISSING_TRANSFER: "transfer details are required",
    MISSING_TRANSFER_ID: "transfer ID is required",
    MISSING_TRANSFER_OPTION_CRITERIA: "transfer option criteria is required",
    MISSING_UNIQUE_ID: "unique ID is required",
    MISSING_WALLET_ID: "wallet ID is required",
    MISSING_WALLET_TRANSACTION_ID: "wallet transaction ID is required",
};
