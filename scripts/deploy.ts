// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  let [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  console.log("deployer address", await owner.getAddress());
  console.log("deployer balance", await owner.getBalance());
  const NFT = await ethers.getContractFactory("OCP");
  const instance = await NFT.deploy();
  await instance.deployed();
  console.log('OCP', instance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
