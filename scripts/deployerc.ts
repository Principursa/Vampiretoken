import { Contract } from "@ethersproject/contracts";
// We require the Hardhat Runtime Environment explicitly here. This is optional but useful for running the
// script in a standalone fashion through `node <script>`. When running the script with `hardhat run <script>`,
// you'll find the Hardhat Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

import { Dummy__factory } from "../typechain";

async function main(): Promise<void> {
  const Dummy: Dummy__factory = await ethers.getContractFactory("Dummy");
  const dummy: Contract = await Dummy.deploy();
  await dummy.deployed();

  console.log("Dummy token deployed to: ", dummy.address);
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
