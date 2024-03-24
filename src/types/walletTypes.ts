import { Amount } from "./transferTypes";

export type Wallet = {
    // UUID v4
    walletID: string;
    // Balance based on all completed transactions against the wallet.
    availableBalance: Amount;
}

export enum WALLET_TRANSACTION_TYPE {
    ACH_REVERSAL = "ach-reversal",
    CARD_PAYMENT = "card-payment",
    CASH_OUT = "cash-out",
    DISPUTE = "dispute",
    DISPUTE_REVERSAL = "dispute-reversal",
    FACILITATOR_FEE = "facilitator-fee",
    ISSUING_REFUND = "issuing-refund",
    ISSUING_TRANSACTION = "issuing-transaction",
    ISSUING_TRANSACTION_ADJUSTMENT = "issuing-transaction-adjustment",
    ISSUING_AUTH_RELEASE = "issuing-auth-release",
    PAYMENT = "payment",
    PAYOUT = "payout",
    REFUND = "refund",
    REFUND_FAILURE = "refund-failure",
    TOP_UP = "top-up",
    WALLET_TRANSFER = "wallet-transfer",
}

export enum WALLET_TRANSACTION_SOURCE_TYPE {
    TRANSFER = "transfer",
    DISPUTE = "dispute",
    ISSUING_TRANSACTION = "issuing-transaction",
}

export enum WALLET_TRANSACTION_STATUS {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
}

export type WalletTransaction = {
    // UUID v4
    walletID: string;
    // UUID v4
    transactionID: string;
    // wallet transaction type.
    transactionType: WALLET_TRANSACTION_TYPE;
    // where the transaction originated.
    sourceType: WALLET_TRANSACTION_SOURCE_TYPE;
    // ID of the source Moov object to which this transaction is related. Can be one of [walletID](/api/#tag/Wallets/operation/getWalletForAccount), [cardID](/api/#tag/Cards/operation/getCard), or [bankAccountID](/api/#tag/Bank-accounts/operation/getBank).
    sourceID: string;
    // wallet transaction status.
    status: WALLET_TRANSACTION_STATUS;
    // Detailed description of the transaction.
    memo: string;
    // Date transaction was created.
    createdOn: string;
    // Date transaction was completed.
    completedOn?: string;
    // 3-letter ISO 4217 currency code.
    currency: string;
    // The total transaction amount. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
    grossAmount: number;
    // Total fees paid for the transaction. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
    fee: number;
    // Net amount is the gross amount less fees paid, and the amount that affects the wallet's balance. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
    netAmount: number;
    // The wallet's total available balance after recording a completed transaction. The value is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
    availableBalance?: number;
}

export type WalletTransactionListCriteria = {
    // Only return transactions of this type.
    transactionType?: WALLET_TRANSACTION_TYPE;
    // Only return transactions of this source type.
    sourceType?: WALLET_TRANSACTION_SOURCE_TYPE;
    // Only return transactions that were part of this transfer ID.
    sourceID?: string;
    // Only return transactions in this state.
    status?: WALLET_TRANSACTION_STATUS;
    // Only return transactions created on or after this datetime.
    createdStartDateTime?: string;
    // Only return transactions created before this datetime.
    createdEndDateTime?: string;
    // Only return transactions completed on or after this datetime.
    completedStartDateTime?: string;
    // Only return transactions completed before this datetime.
    completedEndDateTime?: string;
    // Maximum number of transactions to return in results
    count?: number;
    // Number of transactions to skip before collection results
    skip?: number;
}