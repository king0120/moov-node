import {accounts} from "./domains/accounts";

accounts.list(process.env.MOOV_ACCOUNT_ID, {}).then(console.log).catch(console.error);