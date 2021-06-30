import { Contract } from "@ethersproject/contracts";
// We require the Hardhat Runtime Environment explicitly here. This is optional but useful for running the
// script in a standalone fashion through `node <script>`. When running the script with `hardhat run <script>`,
// you'll find the Hardhat Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

import { Vamp__factory } from "../typechain";

async function main(): Promise<void> {
  const Vamp: Vamp__factory = await ethers.getContractFactory("Vamp");
  const vamp: Contract = await Vamp.deploy();
  await vamp.deployed();
  console.log("Vamp deployed to ", vamp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
