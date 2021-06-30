import { expect } from "chai";
import { BigNumber } from "ethers";

export function shouldBehaveLikeVamp(): void {
  it("should return the new number once it's changed", async function () {
    expect(await this.Vamp.connect(this.signers.admin).testReturn()).to.equal(5);

    await this.Vamp.testFunc(10);
    expect(await this.Vamp.connect(this.signers.admin).testReturn()).to.equal(10);
  });
  it("should return the proper number of minted tokens", async function () {
    const tokens = await this.Vamp.connect(this.signers.admin).balanceOf(this.signers.admin.address);

    expect(tokens).to.equal(await this.Vamp.connect(this.signers.admin).balanceOf(this.signers.admin.address));
  });
  it("should return the given shiba address #AddToken", async function () {
    await this.Vamp.AddToken("0x8256b990df5fe8fd4b23b205ff2f2893c0fbf60d", 1);
    const response = await this.Vamp.findShiba("0x8256b990df5fe8fd4b23b205ff2f2893c0fbf60d");

    expect(response).to.equal("Token exists");
  });
  it("should NOT return the given shiba address #findShiba", async function () {
    const response = await this.Vamp.findShiba("0x8256b990df5fe8fd4b23b205ff2f2893c0fbf60d");
    expect(response).to.equal("Token not found");
  });
  it("should transfer shibas", async function () {
    await this.Vamp.AddToken(this.Dummy.address, 1);

    await this.Dummy.connect(this.signers.admin).approve(this.Vamp.address, 1000);
    await this.Vamp.connect(this.signers.admin).burnShibas(this.Dummy.address, 1000);
    expect(this.Dummy.balanceOf(this.Vamp.address)).to.not.equal(0);
    //expect(this.Dummy.allowance(this.signers.admin.address,this.Vamp.address)).to.not.equal(0)
  });
  it("should transfer shibas and give sender rewards", async function () {
    await this.Vamp.AddToken(this.Dummy.address, 1);

    await this.Dummy.connect(this.signers.admin).approve(this.Vamp.address, 1000);
    await this.Vamp.connect(this.signers.admin).burnShibas(this.Dummy.address, 1000);
    expect(this.Vamp.balanceOf(this.signers.admin.address)).to.not.equal(0);

    //expect(this.Dummy.allowance(this.signers.admin.address,this.Vamp.address)).to.not.equal(0)
  });
}
