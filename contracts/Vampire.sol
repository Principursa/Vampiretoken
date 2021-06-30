// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract Vamp is ERC20, Ownable {
    uint256 public number = 5;
    mapping(address => uint256) public Shibas;

    constructor() ERC20("VAMP", "Vampire") {
        console.log("Deploying Vamp contract");

        _mint(msg.sender, 1000 * 10**decimals());
    }

    modifier requireShiba(address shiba) {
        require(Shibas[shiba] != 0, "Address does not exist in mapping");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function AddToken(address token, uint256 exchangeRate) public {
        Shibas[token] = exchangeRate;
    }

    function findShiba(address token) public view returns (string memory) {
        if (Shibas[token] != 0) {
            return "Token exists";
        } else {
            return "Token not found";
        }
    }

    function burnShibas(address payable token, uint256 amount) public requireShiba(token) {
        require(amount > 0, "Zero is not a valid amount");
        IERC20 shiba = IERC20(token);
        uint256 allowance = shiba.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        shiba.transferFrom(msg.sender, address(this), amount);
        uint256 exchangeRate = Shibas[token];
        uint256 rewardRate = amount / exchangeRate;
        mint(msg.sender, rewardRate);
    }

    function testFunc(uint256 num) public {
        number = num;
    }

    function testReturn() public view returns (uint256) {
        return number;
    }
}
