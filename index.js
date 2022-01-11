const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");  // Required modules

global.TextEncoder = require("util").TextEncoder;       // Reference Error removed!

const newPair = new Keypair();  // New Keys generated for Wallet
console.log(newPair);

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;     // Array

const getWalletBalance = async () => {      // Fetch Balance
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");    // Connect to devnet
        const myWallet = await Keypair.fromSecretKey(secretKey);    // Access Wallet

        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );

        console.log(`=> For wallet address ${publicKey}`);
        console.log(`Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL} SOL`);
        
    } catch (err) {
        console.log(err);
    }
};


const airDropSol = async () => {       // AirDrop
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");        // Connection object
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);

        console.log(`-- Airdropping 2 SOL --`)     // Max 250 SOL/transaction

        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
        
    } catch (err) {
        console.log(err);
    }
};


const driverFunction = async () => {        // Testing
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}


driverFunction();