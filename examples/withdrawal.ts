import {
  UserFactory,
  BLOCKCHAIN_WS_URL_DEFAULT,
  CLIENT_API_URL_DEFAULT,
} from "../libs/user";
import * as dotenv from "dotenv";
import path from "path";

const rootPath = path.resolve();
dotenv.config({ path: path.join(rootPath, ".env") });

// Script config for ganache
const ETHEREUM_PRIVATE_KEY_DEFAULT =
  "0x4775af73d6dc84a0ae76f8726bda4b9ecf187c377229cb39e1afa7a18236a69e"; // address 0x9C8B2276D490141Ae1440Da660E470E7C0349C63
const TOKEN_ADDRESS_DEFAULT = "0x9b7bD670D87C3Dd5C808ba627c75ba7E88aD066f"; // ERC20Mock contract address in ganache

// Script config for goerli
// TBC

const options = {
  blockchainWsUrl: BLOCKCHAIN_WS_URL_DEFAULT,
  clientApiUrl: CLIENT_API_URL_DEFAULT,
  ethereumPrivateKey: ETHEREUM_PRIVATE_KEY_DEFAULT,
  nightfallMnemonic:
    "salt depart hamster salon mechanic nephew play ship coyote divide wire price",
};

// Script
const main = async () => {
  let user;
  try {
    user = await UserFactory.create(options);

    const tokenAddress = TOKEN_ADDRESS_DEFAULT;
    const tokenStandard = "ERC20";
    const value = "0.0001";
    const recipientAddress = "0x9C8B2276D490141Ae1440Da660E470E7C0349C63";
    const receipts = await user.makeWithdrawal({
      tokenAddress,
      tokenStandard,
      value,
      recipientAddress,
    });
    console.log(receipts);
    console.log(
      "Nightfall withdrawal tx hashes ::",
      user.nightfallWithdrawalTxHashes,
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    user.close();
    console.log("Bye bye");
  }
};

main();
