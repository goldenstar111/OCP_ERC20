// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  let [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  // We get the contract to deploy

  const instance = await ethers.getContractAt("BonsaiNFT", "0x3B6AD64cA42BB1Ebd53439DB937f57347439377c");
  // await instance.mint(ethers.BigNumber.from(20));
  console.log("Mint Complete")
  let totalMatch;
  let i=0;
  do {
    totalMatch = await instance.matchListLength(await owner.getAddress());
    console.log("Total Match Count", totalMatch.toNumber());
    let res = await instance.matchList(await owner.getAddress(), i);
    console.log("Match Pair", res[0].toNumber(), res[1].toNumber());
    i++;
    if(res[0].toNumber() != res[1].toNumber()) {
      console.log("breed", res[0].toNumber(), res[1].toNumber());
      await instance.breed(res[0], res[1]);
      await sleep(15000);
      console.log("breed complete");
      i = 0;
    }
  } while (totalMatch.toNumber() > 0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
