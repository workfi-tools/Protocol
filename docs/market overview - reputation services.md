# Overview of market participants

## Your Justice Platform Overview

- Web: https://www.yourjustice.life/, https://yj.life
- Github: https://github.com/YourJustice-Live/
- Stage: Alpha
- Networks: Poligon (testnet), BSC (testnet)
### Description

Open-source platform for reputation and near-legal relationships within communities. 

## Aragon Court & Aragon Govern platform review

- Web: https://court.aragon.org https://govern.aragon.org
- Github: https://github.com/aragon/govern, https://github.com/aragon/aragon-court, ...
- Networks: Eth (and Rinkeby), Polygon (and Mumbai), Harmony, BSC, Stardust

## Kleros Platform Overview

- Web: https://kleros.io
- GitHub: https://github.com/kleros
- Stage: Kleros 2.0
- Network: ETH

## DREP Overview

- Web: https://www.drep.org , https://medium.com/drep-family
- Github: https://github.com/drep-project
- Stage: is not actively maintained - last commit was in 2021
## Ontology

- Web: https://ont.io/
- Github: https://github.com/ontio
- Stage: in production

### Description

Ontology implements a series of blockchain based protocols, including Orange - a Reputation Protocol (a community-driven project). 

Mission, as on the main page: Bringing trust, privacy, and security to Web3 through decentralized identity and data solutions.

Ontology has a trust search engine which provides authentication and connects services for individuals. 

> At Ontology, we envision a future where your identity and data are protected through encryption. Your on and off-chain data are secured without stress or worry. With **ONT ID**, you can protect your identity and data without constant oversight or maintenance. Using ONT ID prevents malicious actors from hijacking your identity or accessing personal information. We're building a future that guarantees you total control over who can access, see, and use your online data and identity.

### Orange protocol

- Web: https://www.orangeprotocol.io
- GitHub: https://github.com/orange-protocol
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)
- Networks: Ethereum, Polygon, BSC

### Orange protocol description

From [overview](https://docs.orangeprotocol.io/overview):

> On-chain data is currently scattered across a myriad of decentralized applications. Many types of actions take place in the form of transactions associated with wallet addresses.
> 
> However, if we were to take that transaction data, extract and consolidate useful data points together turning them into well-defined schemas, this data can prove to be very useful in assessing an entity's on-chain identity for specific contexts. Orange is to achieve just that.
> 
> Orange is a reputation and trust minting protocol that aggregates data and Web3 reputation models to generate comprehensive reputation proofs in the form of Verifiable Credentials and NFTs.

### Our differences

- Orange doesn't provide means to create reputation (via voting or other means),
  it only helps with aggregating on-chain data to interpret facts and behavior as reputation aspects.
  While theoretically this can be used for WorkFi, this makes each service that reads or modifies one's reputation
  to reinvent the wheel. We believe that ready-to-use reputation aspects and procedures for their modification
  will be much more helpful for the industry

## UTU

- Web: https://utu.io
- GitHub: https://github.com/utu-protocol
- Stage: in development (updated whitepaper Aug 10, 2022). MVP: http://defi-portal.utu.io/
- Networks: Ethereum, bridged to BSC, will be bridged to Polygon, and to other chains
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)

### Description

From main page:

> UTU’s mission is to become the trust infrastructure of the entire internet, replacing anonymous star ratings, reviews, and scores as the de facto trust mechanisms of our digital lives.

From UTU Protocol Whitepaper V4:

> UTU was born to help people take these five actions: Connect, Send, Swap, Stake, & Borrow. We have removed most of the clutter about Web 2 use cases and reframed UTU around the core problems it solves for:
> - Connect: Is this Dapp going to drain my wallet?
> - Send: Is this the right address? Do I need to do a test transaction?
> - Swap: Is the real token? Should I really buy this?
> - Stake: Will I get my funds back? And the promised yield?
> - Borrow: Is the borrower going to pay back?

From the protocol page:

> How the UTU Protocol Works:
> - You should earn from the reviews you create and the data you share. UTU pays you for creating trustworthy reviews and ratings and for sharing your data with apps that you use.
> - Fake and inaccurate reviews can lead to poor purchase decisions. The UTU protocol leverages blockchain to ensure that reviews can’t be manipulated.
> - Big tech companies capture and use your data without you even knowing it. With UTU, you have full control over the data you share.

UTU uses an own fungible, non-transferable token (UTU Trust Token) for reputation count.

### Our differences

- UTU focuses on providing 'trust' which is an important aspect of reputation but not enough for WorkFi
  as it doesn't tell anything about the skills/quality of previous work;
  other aspects like contribution to community should also be supported by a reputation system;
- another UTU's focus is privacy: whitepaper says "we want users to be able to fully control
  who gets to access their data when, for what reason, in what context etc".
  We, on the other hand, envision reputation as something publicly available (transparent),
  any person or service should have read access to it (and reputation flaws should not be hidden)

