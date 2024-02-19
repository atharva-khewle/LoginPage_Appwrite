import { Account, Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d10108cbfd38eab76f');

export const account = new Account(client);
export { ID } from 'appwrite';