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
  let [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
  // We get the contract to deploy
  console.log("owner: ",await owner.getAddress());
  console.log("addr1: ",await addr1.getAddress());
  console.log("addr2: ",await addr2.getAddress());
  console.log("addr3: ",await addr3.getAddress());

  const provider = ethers.getDefaultProvider();
  const _block = await ethers.provider.getBlock(23348547)
  console.log("timestamp", _block.timestamp)
  // const instance = await ethers.getContractAt("OCP", "0x1c4C0575a6837700B73C19E436EE1dD3b7CC7eBc");
  // await instance.mint(ethers.BigNumber.from(20));
  // console.log("Mint Complete")

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
