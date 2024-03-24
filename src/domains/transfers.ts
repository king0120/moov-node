import {randomUUID} from "crypto";
import {wrappedFetch} from "../utils/wrappedFetch";
import {check, checkString} from "../utils/checks";
import {Err} from "../utils/errors";

export const transfers = {
    async create(transfer, idempotencyKey) {
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
    async list(criteria) {
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
    async get(transferID) {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        return wrappedFetch(`transfers/${transferID}`);
    },
    async updateMetadata(transferID, metadata) {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        return wrappedFetch(`transfers/${transferID}`, {
            method: "PATCH",
            body: JSON.stringify({metadata}),
        });
    },
    async getTransferOptions(transferOptionsCriteria) {
        check(transferOptionsCriteria).or(Err.MISSING_TRANSFER_OPTION_CRITERIA);
        return wrappedFetch(`transfer-options`, {
            method: "POST",
            body: JSON.stringify(transferOptionsCriteria),
        });
    },
    async refund(transferID, idempotencyKey, refund) {
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
    async listRefunds(transferID) {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        return wrappedFetch(`transfers/${transferID}/refunds`);
    },
    async getRefund(transferID, refundID) {
        checkString(transferID).or(Err.MISSING_TRANSFER_ID);
        checkString(refundID).or(Err.MISSING_REFUND_ID);
        return wrappedFetch(`transfers/${transferID}/refunds/${refundID}`);
    }
}