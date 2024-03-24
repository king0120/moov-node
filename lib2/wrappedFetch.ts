import {Buffer} from 'node:buffer';
import * as dotenv from 'dotenv'

dotenv.config()

const baseUrl = "https://api.moov.io";
export const wrappedFetchBase = async (url: string, options?: RequestInit) => {
    const publicKey = process.env.MOOV_PUBLIC_KEY;
    const secretKey = process.env.MOOV_SECRET_KEY;
    const accountId = process.env.MOOV_ACCOUNT_ID;
    console.log({
        publicKey,
        secretKey,
        accountId
    })
    if (!publicKey || !secretKey || !accountId) {
        throw new Error('Missing credentials');
    }
    if (options?.headers?.['Authorization']) {
        throw new Error('Custom authorization header is not allowed');
    }
    url = url.startsWith('/') ? url.slice(1) : url;
    return await fetch(`${baseUrl}/${url}`, {
        ...options,
        headers: {
            ...options?.headers,
            'Authorization': 'Basic ' + Buffer.from(publicKey + ":" + secretKey).toString('base64')
        }
    })
}

export const wrappedFetch = async (url: string, options?: RequestInit) => {
    const res = await wrappedFetchBase(url, options)
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    return res.json()
}

