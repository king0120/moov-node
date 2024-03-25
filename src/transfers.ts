import {randomUUID} from "crypto";
import {wrappedFetch} from "./utils/wrappedFetch";
import {check, checkString} from "./utils/checks";
import {Err} from "./utils/errors";
import {
    AvailableTransferOptions,
    Refund,
    Transfer,
    TransferCreate,
    TransferListCriteria,
    TransferOptionsCriteria,
    TransferResponse
} from "./types/transferTypes";

export const transfers = {
    /**
     * Creates a transfer to move money from a source to a destination.
     *
     * The `TRANSFERS_WRITE` scope enum is required when making a request from the browser.
     */
    async create(transfer: TransferCreate, idempotencyKey?: string): Promise<TransferResponse> {
        check(transfer).or(Err.MISSING_TRANSFER);
        idempotencyKey = idempotencyKey || randomUUID();
        return wrappedFetch(`transfers`, {
            method: "POST",
            headers: {
                "x-idempotency-key": idempotencyKey,
            },
            body: JSON.stringify(transfer),
        });
    },
    /**
     * Lists transfers that match the given criteria.
     *
     * The `TRANSFERS_READ` scope enum is required when making a request from the browser.
     */
    async list(criteria: TransferListCriteria): Promise<Transfer[]> {
        const options = {
            url: "transfers",
            method: "GET",
        };
        const params = new URLSearchParams();
        if (criteria) {
            if (criteria.accountIDs) {
                params.append("accountIDs", criteria.accountIDs.join(","));
            }
            if (criteria.status) {
                params.append("status", criteria.status);
            }
            if (criteria.startDateTime) {
                params.append("startDateTime", criteria.startDateTime);
            }
            if (criteria.endDateTime) {
                params.append("endDateTime", criteria.endDateTime);
            }
            if (criteria.count) {
                params.append("count", criteria.count.toString());
            }
            if (criteria.skip) {
                params.append("skip", criteria.skip.toString());
            }
        }
        return wrappedFetch(`transfers?${params.toString()}`, options);
    },
    /**
     * Gets the details of a transfer.
     *
     * The `TRANSFERS_READ` scope enum is required when making a request from the browser.
     */
    async get(transferID: string): Promise<Transfer> {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        return wrappedFetch(`transfers/${transferID}`);
    },
    /**
     * Update the metadata on a transfer.
     *
     * The `TRANSFERS_WRITE` scope enum is required when making a request from the browser.
     */
    async updateMetadata(transferID: string, metadata: Record<string, string>): Promise<Transfer> {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        return wrappedFetch(`transfers/${transferID}`, {
            method: "PATCH",
            body: JSON.stringify({metadata}),
        });
    },
    /**
     * Gets the available payment options for a transfer.
     *
     * The `TRANSFERS_READ` scope enum is required when making a request from the browser.
     */
    async getTransferOptions(transferOptionsCriteria: TransferOptionsCriteria): Promise<AvailableTransferOptions> {
        check(transferOptionsCriteria).or(Err.MISSING_TRANSFER_OPTION_CRITERIA);
        return wrappedFetch(`transfer-options`, {
            method: "POST",
            body: JSON.stringify(transferOptionsCriteria),
        });
    },
    /**
     * Initiate a refund for a card transfer.
     *
     * The `TRANSFERS_WRITE` scope enum is required when making a request from the browser.
     */
    async refund(transferID: string, idempotencyKey: string, refund?: { amount: number }): Promise<TransferResponse> {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);

        idempotencyKey = idempotencyKey || randomUUID();
        return wrappedFetch(`transfers/${transferID}/refunds`, {
            method: "POST",
            headers: {
                "x-idempotency-key": idempotencyKey,
            },
            body: JSON.stringify(refund),
        });
    },
    /**
     * List refunds for a card transfer.
     *
     * The `TRANSFERS_READ` scope enum is required when making a request from the browser.
     */
    async listRefunds(transferID: string): Promise<Refund[]> {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        return wrappedFetch(`transfers/${transferID}/refunds`);
    },
    /**
     * Get details of a specific refund.
     *
     * The `TRANSFERS_READ` scope enum is required when making a request from the browser.
     */
    async getRefund(transferID: string, refundID: string): Promise<Refund> {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        checkString(refundID).or(Err.MISSING_REFUND_ID);
        return wrappedFetch(`transfers/${transferID}/refunds/${refundID}`);
    }
}