import hre from "hardhat";
import { Artifact } from "hardhat/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { Vamp } from "../typechain/Vamp";
import { Signers } from "../types";
import { expect } from "chai";
import { shouldBehaveLikeVamp } from "./Vampire.behavior";
import { Dummy } from "../typechain/Dummy";
const { deployContract } = hre.waffle;

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Vamp", function () {
    beforeEach(async function () {
      const VampArtifact: Artifact = await hre.artifacts.readArtifact("Vamp");
      const DummyArtifact: Artifact = await hre.artifacts.readArtifact("Dummy");
      this.Vamp = <Vamp>await deployContract(this.signers.admin, VampArtifact);
      expect(this.Vamp);
      this.Dummy = <Dummy>await deployContract(this.signers.admin, DummyArtifact);
      expect(this.Dummy);
    });
    shouldBehaveLikeVamp();
  });
});
