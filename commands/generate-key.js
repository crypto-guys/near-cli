const KeyPair = require('near-api-js').KeyPair;
const exitOnError = require('../utils/exit-on-error');
const implicitAccountId = require('../utils/implicit-accountid');
const connect = require('../utils/connect');

module.exports = {
    command: 'generate-key [account-id]',
    desc: 'generate key or show key from Ledger',
    builder: (yargs) => yargs,
    handler: exitOnError(generateKey)
};

async function generateKey(options) {
    const near = await connect(options);

    if (options.usingLedger) {
        if (options.accountId) {
            console.log('WARN: Account id is provided but ignored in case of using Ledger.');
        }
        const publicKey = await options.signer.getPublicKey();
        // NOTE: Command above already prints public key.
        console.log(`Implicit account: ${implicitAccountId(publicKey.toString())}`);
        // TODO: query all accounts with this public key here.
        // TODO: check if implicit account exist, and if the key doen't match already.
        return;
    }

<<<<<<< HEAD
        // If key doesn't exist, create one and store in the keyStore.
        // Otherwise, it's expected that both key and accountId are already provided in arguments.
        if (!argv.publicKey) {
            const keyPair = KeyPair.fromRandom('ed25519');
            argv.publicKey = keyPair.publicKey.toString();
            argv.accountId = argv.accountId || implicitAccountId(argv.publicKey);
            await keyStore.setKey(argv.networkId, argv.accountId, keyPair);
        } else if (argv.seedPhrase) {
            const seededKeyPair = await argv.signer.keyStore.getKey(argv.networkId, argv.accountId);
            await keyStore.setKey(argv.networkId, argv.accountId, seededKeyPair);
        }
            
        console.log(`Key pair with ${argv.publicKey} public key for an account "${argv.accountId}"`);
    })
};
=======
    const { deps: { keyStore } } = near.config;
    const existingKey = await keyStore.getKey(options.networkId, options.accountId);
    if (existingKey) {
        console.log(`Account has existing key pair with ${existingKey.publicKey} public key`);
        return;
    }

    // If key doesn't exist, create one and store in the keyStore.
    // Otherwise, it's expected that both key and accountId are already provided in arguments.
    if (!options.publicKey) {
        const keyPair = KeyPair.fromRandom('ed25519');
        options.publicKey = keyPair.publicKey.toString();
        options.accountId = options.accountId || implicitAccountId(options.publicKey);
        await keyStore.setKey(options.networkId, options.accountId, keyPair);
    }
            
    console.log(`Key pair with ${options.publicKey} public key for an account "${options.accountId}"`);
    
}
>>>>>>> asking with more commands
