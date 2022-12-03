# LENDA

## Description

This repository contains the smart contracts source code for Lenda Lending Protocol. The repository uses Hardhat as development environment for compilation, testing and deployment tasks.

Lenda is a simple but powerful decentralized NFT lending protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized fashion, using NFTs as collateral.

## Use cases

Lenda offers users a way to draw capital against their non-fungible collateral

# Setting up

**# Get the latest snapshot**
git clone https://github.com/okekefrancis112/Lenda.git

**# Copy .env.example to .env**
cp .env.variable.env variable.env

**# Install dependencies**
yarn install

**# Then simply start your app**
yarn run dev

# List of Packages

**Dependencies are managed through package.json**

## Contributing

**Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated\*\* \*\*

1.  Fork the Project

2.  Create your Feature Branch (\*\***git checkout -b feature/AmazingFeature\***\*)\*\*

3.  Commit your Changes (\*\***git commit -m 'Add some AmazingFeature'\***\*)\*\*

4.  Push to the Branch (\*\***git push origin feature/AmazingFeature\***\*)\*\*

5.  Open a Pull Request\*\*

## Roadmap

**See the for a list of proposed features (and known issues).** [open issues](https://github.com/okekefrancis112/Lenda/issues)

## Team

> @Kayzee
> @CodeBlooded
> @OC
> @AspireDev
> @Dave

## Contract Architecture

**We detail the core contracts in the Lenda protocol.**

### Lendpool

This contract holds logic enable NFT owners create a loan, repay a loan

https://mumbai.polygonscan.com/address/0x5e3886c7fbc5e06B1506357108cF8888d07B41a2#code

### DepositorToken (Lenda)

This contract holds logic of the depositor token

https://mumbai.polygonscan.com/address/0x20Cbc4f9070010e03C53Ae863D9a083f65Ed97C9#code

### BorrowerToken (BMatic)

This contract holds the logic of the token is pegged to the amount a borrower borrowed with the interest accrued. Borrower must repay with an equal amount of Bmatic to acquire back their collateral

### Yield

This contract holds logic used to incentivize users, 0.4LND is minted per seconds which is shared among all farmers that locked their DMatic token. Farmers can check the possible amount of LND they will receive base on their DMatic locked

https://mumbai.polygonscan.com/address/0x3B6871FC9BfBf0b53eB7f4FDC78059b54c4e0525#code

### Reserve

This contract holds the logic responsible for holding matic deposit of depositors/lenders

### PriceOracle

This contract holds logic which is used to get the onchain data of NFT floor price across all NFT platforms. To deduce Lenda NFT worth

### NftCollateral storage

This contract is responsible for holding borrowers collateral

## List of contract addresses of allowed NFTs

https://mumbai.polygonscan.com/address/0xB72705c99DF57aE0B4aedD0B20a69D809db9136E "cryptopunks"
https://mumbai.polygonscan.com/address/0xB50285433aAda7261A8F518E25128Ee0ED1DFcA2 "Azuki"
https://mumbai.polygonscan.com/address/0x6730E0C8910218d64DEf48Dc0434f41CAe2F3630 "BoredApeYachtClub"
https://mumbai.polygonscan.com/address/0x2243DD81C21ad104DBe6D3e12CfC9e3db38A4932 "CloneX"
https://mumbai.polygonscan.com/address/0xf150f26D794e3d1129dD4c2AF356Da1a76dDeDaE "Cool Cats"
https://mumbai.polygonscan.com/address/0xd17bFB32Fe23e731f4Aa23D87686aA29c01aCCC6 "Cryptoadz"
https://mumbai.polygonscan.com/address/0xde0b1D6d5c39f9b64C439dB6B0F8B116Ea9F818f "Doodles"
https://mumbai.polygonscan.com/address/0xcEE4593b3Abd20D75B421F34D93e45F838311C28 "MutantApeYachtClub"
https://mumbai.polygonscan.com/address/0x4a0039c8D8C54A25Ebc718e278613921E938720D "VeeFriends"
https://mumbai.polygonscan.com/address/0xE35546d6418f206DE55eC67b4BCEF010322B8C50 "World of Women"
