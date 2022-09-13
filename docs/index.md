# Reputation systems

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [1. General](#1-general)
  - [1.1. General overview of our rep system](#11-general-overview-of-our-rep-system)
  - [1.2. Basic reputation representation model and unification problems](#12-basic-reputation-representation-model-and-unification-problems)
  - [1.3. Reputation model](#13-reputation-model)
  - [1.4. WorkFi industry](#14-workfi-industry)
  - [1.5. WorkFi Roadmap](#15-workfi-roadmap)
- [2. Market overview](#2-market-overview)
  - [2.1. Web 2](#21-web-2)
  - [2.2. Web 3](#22-web-3)
- [3. Responsibility](#3-responsibility)
  - [3.1. Responsible rates](#31-responsible-rates)
  - [3.2. Responsible invites (vouching)](#32-responsible-invites-vouching)
  - [3.3. Guarantors](#33-guarantors)
- [4. Reputation sustainability](#4-reputation-sustainability)
  - [4.1. Handling abnormal scores](#41-handling-abnormal-scores)
- [5. Rates, Attributive rates](#5-rates-attributive-rates)
  - [5.1. Labels, industries, categories](#51-labels-industries-categories)
  - [5.2. Reputation as multiple rates](#52-reputation-as-multiple-rates)
  - [5.3. Reputation use cases](#53-reputation-use-cases)
  - [5.4. Types and systems of rates](#54-types-and-systems-of-rates)
- [6. P2P crowdsourcing](#6-p2p-crowdsourcing)
  - [6.1. Verification](#61-verification)
  - [6.2. Dispute resolution](#62-dispute-resolution)
  - [6.3. Court system](#63-court-system)
- [7. Safety, anti-fraud](#7-safety-anti-fraud)
  - [7.1. Protection against artificial sway/attack of lowering the profile](#71-protection-against-artificial-swayattack-of-lowering-the-profile)
  - [7.2. Proof of Commission](#72-proof-of-commission)
- [8. Community education](#8-community-education)
  - [8.1. Soft skills](#81-soft-skills)
  - [8.2. Hard skills](#82-hard-skills)
  - [8.3. Community engagement](#83-community-engagement)
- [9. Tech](#9-tech)
  - [9.1. Architecture](#91-architecture)
  - [9.2. Interfaces](#92-interfaces)
  - [9.3. EIP-2535](#93-eip-2535)

<!-- /TOC -->

## 1. General

Based on in-depth extensive market research, we develop protocols, create tools, solutions and libraries for work processes organization to be used by related DAOs, communities, and companies. We develop and work out in detail high-standard protocols and support our protocol solutions with an implementation for EVM-compatible blockchains on smart contracts in Solidity.

The core idea behind our solutions is the reputation system.

**Reputation system** - System of highly configurable reputation system as a core and different services that relies on it.

On top of this we are in process of designing the following additional systems:

**Web3 token access** - Availability of different features depending on the user's reputation rating*

**Voting** - System of different types of voting using agent modeling and voting to satisfy community members and perform community development by creating a library of solutions for voting.

**Booking** - Booking system for various purposes, using different payment systems and for particular cases.

### 1.1. General overview of our rep system

WorkFi Tools are open source solutions to boost the WorkFi industry,
from decentralized freelance platforms to tools for complicated business processes.
This proposal focuses on one key subsystem of the WorkFi: the reputation system for counterparts.
It can also be suitable for a wide variety of other applications like decentralized Uber-like DAOs or marketplaces.
The implementation is supposed to be a set of smart-contracts for EVM-compatible blockchains like Moonbeam and others.

Our team is eager to both create Open Source solutions (which are the subject of this proposal)
and build commercial projects on top of them (which defines our long-term interest in maintaining the project).

#### 1.1.1. Project Details

![Overview](overview.jpg)

**Guarantee** - Guarantee of the fact that the invited user fulfills his obligations. This part affects both: the inviter's rating
as well as the invited user's rating.

**Responsible invites** - Responsible attitude towards who a person invites to use the platform. The invitation can be withdrawn if the invited
users do not fulfill their obligations. This part affects the inviter's rating as well.

**Responsible rates** - Responsible attitude to how the user rates input of other members of the community, understanding the consequences
of his ratings for users and for his own rating level.

**Attributive rates** - Changes in reputation indicators depending on the user's competencies (software, hard skills, area of knowledge and work).

**Rates typology** - Relevant options for categorizing the most appropriate ways to rate users in certain cases.

**Soft Skills (Community Development)** - System of protocols for giving feedback to community users according to their soft skills in the most appropriate and efficient way.

**Hard Skills (Community Development)** - System of protocols for giving feedback to community users according to their hard skills in the most appropriate and efficient way.

**Community contribution** - Community development system, which includes ways to motivate and increase the level of user involvement
and contribution to the community.

**Proof of commission** - Algorithm for verifying user actions, including resistance to scam and fraudulent actions.

**Anti fraud** - Analysis and evaluation of use cases in which users can fraudulently raise their reputation, create bots;
solution development towards what changes should be implemented in the protocol to prevent such actions.

**Reputation providers** - Interaction of a service (platform) and several reputation providers, as well as ways to aggregate information using data from several reputation providers.

**Macroeconomic parameters** - Macroeconomic regulation of reputation indicators and ways of changing reputation indicators depending on internal economic trends within services.

**Hypermarameters management** - The relationship between changes in the rating of one user and the impact of these changes on the ratings
of other users - depending on the interaction between these particular users; as well as different options for motivating and managing reputation indicators within services

**P2P verification** - System to determine which operations can be delegated for verification by the community itself
(KYC, diploma, level of knowledge, subjective assessment and rating).

**Dispute resolution** - System of involving qualified competent users to disputable cases in order to resolve conflict situations
(appeal, dispute, controversial cases).

**Court system** - A more complex and expensive conflict resolution system for serious situations - inspired by classical law. The main focus is on the values of the community.

#### 1.1.2. Tech stack

Tech stack that we are going to use is somewhat standard (with minor choices to be made in the process):
Solidity for EVM smart-contracts, some parts of OpenZeppelin, Hardhat + Moralis for quicker development,
Frontier for compatibility with Polkadot parachains, Node.js/TypeScript/TypeChain/Mocha/Chai/Jest forautotesting,
Solhint/Prettier/Husky/ESLint for good code style, presumably Laika, solidity-docgen and some other infrastructure tools.

#### 1.1.3. Principles

The reputation system is a configurable set of principles and rules embodied in a system of smart contracts written in the Solidity language.

Reputation system is designed for use in systems, services, DAOs and communities, in which participants can give each other marks for some interactions - both paid (performance of works, consultations) and unpaid. Proof of commission is applicable only for paid interactions.

Here are some of core principles:

1. Proof of Commission (antiscam)
2. Responsibility (for grates, invites, etc)
3. Rates should be attributive
4. To crowdsource as much as possible (work, information, or opinions) from community
5. True ownership and service agnostic
6. Scam Resistance
7. Reputation sustainability (f.e. handling of abnormally bad grades)

#### 1.1.4. The Macroeconomics of Reputation

<span style="color:red">
  Macroeconomic parameters and mechanics to manage rep system, Behaviors to be encouraged, Configurator, Protocol parameters affecting behavior patterns, Client of a new worker will get additional +rep, Community-scoped parameters, What can protocol or communities do by adjusting the parameters, how to check, monitor, rule, manage rep system, what leverages do we have, etc 🔥(bits in overview)
</span>

<span style="color:red">e
	TODO: Macro parameters: 1. Новые отзывы / оценки, 2. ..reputation diminishing with time (meritocracy vs aristocracy)
</span>

#### 1.1.5. Features

##### 1.1.5.1. Attributive rates

The reputation of the performer grows in the industry in which he performs the contract. If you do design, your reputation in design grows, dev grows your reputation in dev, and so on. One performer can have several skills and accordingly several reputations.

There should also be a separate, unified reputation of the customer. Conventionally, as it is implemented in taxi services, where the driver evaluates the passenger. The higher the reputation of the passenger, the better driver will come to him.

Motivations for giving grades can be divided into two notional groups: positive and negative.

**Positive**:

1. If the user puts a rating/writes a comment his reputation grows more than 100%.
2. Explanatory material that tells the importance of each grade.
3. Game mechanics. Achievement of certain levels, special achifks in the form of NFTs. As an example, consider DuoLingvo.
4. The more reviews and orders you make in a month, the lower the commission. Each month, the lower the commission begins again.
5. A scale like in P2P binance that shows completed transactions and % of reviews written/written. Could be an additional factor when choosing a customer/executor.
6. Users see reviews that previous users have left and can like them. If your review helped, you get extra reputation. The more likes the post has, the higher it is worth.
7. A reminder in your personal account or by email. "You didn't leave a review for Ilon Musk, please do, it's very important for Ilon.
8. If the performer has no reviews/ratings then the first one who put gets more reputation. A system that automatically monitors parameters and tunes them.

**Negative**:

1. As long as the performer hasn't put a grade/written a review to the customer, the performer doesn't get any money.
2. You get less reputation without a review or evaluation.
3. You can only make a certain number of deals without rating/writing a review. If you exceed this number, you are quarantined for some time.

**Cross-Service Reputation** can be implemented like ratings for movies. It is conditionally possible to load reputation from other services and show it as a widget.

For some services, you might consider a grading system in the form of smiley faces. As an example of a reaction on FB.

### 1.2. Basic reputation representation model and unification problems

<span style="color:red">
	TODO: ???
</span>

### 1.3. Reputation model

<span style="color:green">
  in progress...
</span>

**Main Terms**

The system consists of agents A1, A2, ..., who interact via transactions T1, T2, ...

Agent An can initiate an interaction with agent Am.

The interaction can be unidirectional (asymmetric) or bidirectional (symmetric). *todo: what’s the difference?*

*In some systems (watch a video and rate it with likes - no consent of both parties to interact is required, in others like Upwork - it is required)*

Each agent `An` has a function - estimate the result of the interaction `RateSubjectiveN(T1(An, Am)) -> RateNM`.

*In the case of symmetric interaction, two estimates are made:*

`RateSubjectiveN(T1(An, Am)) -> RateNM`

`RateSubjectiveM(T1(An, Am)) -> RateMN`

Each agent `A1`, `A2`, ... corresponds to `RateObj1`, `RateObj2`, ..., which integrates results of interactions directed to `A1`, `A2`, ...

There is a function that updates `RateObj` for `A` based on the results of the `T` interaction:

`RateUpdate(RateObj_M, RateMN) -> RateObj_M_updated`

**Why a reputation system is needed**

The main purpose of the reputation system is to give the most accurate prediction of the results of interactions between agents.

There is a system of `Com` interacting agents `A1`, `A2`, ...

Each agent has a regularly changing indicator of satisfaction - Contentment. As a result of the interaction at least one of the parties changes this indicator.

The quality of the Com system depends on the total increase in satisfaction ∫ (∑(Contentment_i, i, 1...n), (t, 0, Com_lifetime), dt) over the lifetime of the system.

The more agents the better.

The more interactions between them, the better.

The longer the system lives, the better.

**The higher the increase in satisfaction with the results of each of the interactions, the better**

In the general

`Interaction(A1, A2, context1, context2) ->`

`UpdateContentment1(Cont1) -> Cont1_updated,`

`UpdateContentment2(Cont2) -> Cont2_updated,`

Interactions can be context-free, containing one or two contexts.

Context `Cont_n` of the `Tmn` agent `An` interaction - special conditions for the `Tmn` interaction. For example, the text of the task.

Examples of two-context interaction:

1. a complex transaction where each party does something for the other party. For example, a service for a service
2. the acquaintance of two people; the contexts in this case are who each of the couple would like to meet

For different contexts, the result of interaction between the same agents may be different.

In order to optimize aggregate satisfaction, it is necessary to:

1. maximize the number of interactions that increase satisfaction
2. select for interactions such agents (given the current contexts), for which the total increase in satisfaction will be maximum
3. Avoid interactions that will result in lower overall satisfaction

In order to choose the interactions for which the increase in satisfaction will be maximal, it is necessary to predict the satisfaction of the agents.

`PredictContentments(A1, A2, Context1, Context2) ->`

`-> (∂Contentment1, ∂Contentment2)`

### 1.4. WorkFi industry

#### 1.4.1. WorkFi.tools mission

Our mission is to deliver open-source protocols, tools, and solutions, that will:

- accelerate the development of the WorkFi industry;
- be useful in community/DAO-related startups;
- make web3 products and services easier to implement.

#### 1.4.2. WorkFi vision

Due to the fact that workflows are now being actively built in a remote format, the demand for organizing online interaction between people is growing. The issue of organizing work in companies, among individual entrepreneurs and freelancers is raised more and more often nowadays. In this way, a whole WorkFi industry emerges. 

This industry is at the very beginning of its development, and with our initiatives, solutions, and technical support, we want this direction to thrive and expand further.

We develop thoroughly detailed open source solutions and create convenient tools which can be implemented into process organization workflows, DAO and community-related projects to be actively used by associated companies, communities and teams. Our solutions have the potential to boost the entire industry and define its boundaries. 

We see such a direction of development coming to life with a well-documented protocol-first approach, diverse use cases, scenarios, and usage patterns, where solutions and supporting tools, which we create, are used as a basis for further usage and customized development by other companies and teams.

#### 1.4.3. Multiple rep providers

True ownership is a principle that is opposite to reputation provider “dictatorship”, or an ability to provide read/write access to reputation selectively, restricting some [reputation consuming] services and allowing others (perhaps affiliated with them), and/or deleting/modifying one’s reputation bypassing the general procedure of reputation modifying for services. It also means that the reputation owner has to explicitly agree that a service is allowed to modify their reputation or some of its aspects (ideally, a service has to make it perfectly clear the rules of reputation modification).

It seems that there can be aspect ratings/points/.. (ex: trustworthiness 0.9, Solidity dev 100500, bridge building +100/-1000, .. 5⭐, 1⭐⭐, 3⭐⭐⭐, 10⭐⭐⭐⭐, 67⭐⭐⭐⭐⭐), invitations/vouchings (ex: 3 left) and invited users (their reputation should affect that of vouched user), but may be something else too.

Service agnostic means that a reputation provider should provide read-only access to all the reputation aspects to anybody, in the following form:

```
[
  {
    "name": "trustworthiness",
    todo: describe other bits
  },
  {
    "badge-name": "senior JS dev",
  },
  todo: describe the invitations/...
  ...
]
```

How to store reputation:

- presumably **non-transferrable** tokens (FT for reputation sections, NFT for badges)
- unification of hard skills:
* synonym prevention/detection and handling (there are services and reputation providers, they can call the same dev, coding, development, etc.)
* homonyms (design in different contexts can mean web, industrial and typography, it would be nice if a web designer or UX designer does not “suddenly” become a great industrial designer)
* hierarchy: dev/frontend/js/react - related things, a good react developer is a good frontend developer, but not vice versa, and in theory this should be taken into account

### 1.5. WorkFi Roadmap

<span style="color:red">
	6 months, 2 years (vision) TODO🔥
</span>

## 2. Market overview

### 2.1. Web 2

The following is the analysis of existing web2 projects and services managing reputation and p2p communication.

#### 2.1.1. Amazon

##### 2.1.1.1. Customer Reviews

You can submit reviews for items listed on Amazon. 

Customer Reviews help customers to learn more about the product and decide whether it is the right product for them.

Amazon don't allow anyone to write reviews as a form of promotion.

##### 2.1.1.2. Amazon Verified Purchase Reviews

An "Amazon Verified Purchase" review means that Amazon have verified that the person writing the review purchased or used the product on Amazon, and didn't receive the product at a big discount.

"Amazon Verified Purchase" reviews enable customers to identify reviews that have been left by other customers who have actually purchased or used the product on Amazon.

Reviews that are not marked "Amazon Verified Purchase" are valuable as well.

##### 2.1.1.3. How  Product Star Ratings are Calculated

Amazon calculates a product's star rating using machine-learned models instead of a simple average.

These models take into account factors such as how recent the rating or review is and verified purchase status. They use multiple criteria that establish the authenticity of the feedback. The system continues to learn and improve over time.

Amazon do not consider customer ratings without an Amazon Verified Purchase status in a product's overall star rating until a customer adds more details in the form of text, image, or video

##### 2.1.1.4. Amazon Vine

Amazon Vine is a program that enables a select group of Amazon customers to post opinions about new and pre-release items to help their fellow customers to make educated purchasing decisions.

Customers are invited to become Amazon Vine Voices based on the trust that they have earned in the Amazon community for writing accurate and insightful reviews. 

##### 2.1.1.5. Badges

A badge is a symbol that tells other Amazon customers something interesting about you.

You can earn badges by creating useful content on Amazon. Some badges may be temporary, and some badges may look different, depending on where you see them.

##### 2.1.1.6. **Types of Badges**

There are many different badges. Here is a brief list of our badges and what they mean.

**1 REVIEWER, TOP 10 REVIEWER, TOP 50 REVIEWER, TOP 100 REVIEWER, TOP 500 REVIEWER, TOP 1000 REVIEWER, HALL OF FAME REVIEWER**

These badges identify Amazon best reviewers. T

**TOP CONTRIBUTOR**

This badge is awarded to customers who frequently share reviews or answers related to the Interests that they're most passionate about and that other customers find interesting or helpful.

**AMAZON VERIFIED PROFILE**

This badge indicates that the identity of this contributor has been verified by Amazon.

**THE**

This badge indicates that the person to whom it was granted is "the" celebrity most people associate with that Real Name. 

**AMAZON OFFICIAL**

This is an official Amazon representative. This is a permanent badge.

****AUTHOR, ARTIST, MANUFACTURER**** These badges are given to verified representatives of items listed on Amazon, such as the author, artist, or manufacturer of a product. This is a permanent badge.

##### 2.1.1.7. **Vine Voice**

This customer is a member of Amazon [VineTM Voice](https://www.amazon.com/gp/vine/help), an invitation only program that gives Amazon reviewers advance access to not-yet-released products for the purpose of writing reviews. A review written as part of the Vine™ Voice program always includes this label: "Amazon Vine™ Review" on the initial product detail page and "Customer review from the Amazon Vine™ Program" when viewing the entire review. This is a permanent badge.

##### 2.1.1.8. Contributor Rewards

Contributor Rewards is a program that recognizes Top Contributors who contribute quality content to Spark and the Idea Lists Community.

##### 2.1.1.9. Claim Your Contributor Rewards

Rewards are determined based on the quality of content posted and the amount of customer engagement the content receives.

If you are selected for a reward, you will receive an email that includes the details of your reward amount.


#### 2.1.2. Booking.com

Booking collect reviews once a guest checks out, we send them an email asking them to review their stay with you. They have 90 days to do this.

Guests select an overall score from 1 to 10 to rate their experience at owners property. This is the only question guests are required to answer before they can submit their review. The average of these overall scores becomes owners **Guest Review Score**, which we display once you’ve received your first review.

Booking.com also ask  guests to rate owners property in these six specific areas:

- Cleanliness
- Comfort
- Value for money
- Facilities
- Location
- Staff

All of these ratings are optional, and they don’t count towards owners **Guest Review Score.**

Guests can then provide more optional ratings, but these are about different topics for different guests, such as WiFi and breakfast. These also don’t count towards your **Guest Review Score**.

Finally, Booking.com encourage guests to provide open feedback, but this is also optional. 

Since late 2019, the overall score for each review is no longer the average of the ratings the guest gave for each of the specific categories. Instead, guests now give their own score for their overall experience at your property.

This new system has completely replaced the old system, and it applies to properties and guests all over the world. 

Booking.com don’t play any role in deciding owners score themselves. Booking.com only facilitate the process of collecting  reviews from guests. Owners individual scores reflect actual guest experiences and they contribute directly to overall Guest Review Score.

Also Booking.com collect the overall score for each review separately from the ratings guests give for different categories. They do this because the six categories don’t always cover everything that a guest might consider when they rate their stay, while the overall score represents their experience as a whole. This means that it’s normal for the overall score to be different from the category ratings.

#### 2.1.3. Habr

Karma is a tool for self-regulation in the community.

> Writing a hundred useful posts and reaching a maximum karma score, you can lose them all by posting just one inappropriate comment.
> 

Note that a user can't give negative karma to other members until they reach 5 points. That is, newcomers to the system can't minus authors.

➕ After reaching 50 karma points, the user has the right to give someone else's account the status of "full member" (extends the authority). I.e., user A, having accumulated 50 points, can say that user B can "post materials immediately on the site, without prior verification by the moderators"

Negative karma slows down the user's activity. A user with karma [-5; -1] can post 1 comment in 5 minutes. A user with karma [-30; -11] once a day. The highest punishment is transfer to ReadOnly mode.

🧮 1 unit of karma = 1 vote per day, which you can give for karma or publication, or 2 votes for comments

There is a system of grades on Habra. Votes from different users are weighted differently:

> ... "Author", "Old-timer" and "Star", if a publication is positively rated, add +2 rating points to it. Holders of the "Legend" badge add +3 rating points to the publication with one vote.
> 

> does not apply when voting in minus
> 

User A can vote for user B's karma only once. In this case, he can change his decision. User A has karma = 10. User B can make karma = 11 (add 1). Then change his mind and make karma = 9 (-1 from the original). Then change his mind again and make it 11 (+1 from the original). But can't get karma to 8 (-2) or 12 (+2).

0️⃣ Once, for all time, the user may reset his karma. This may be required if the user's karma has gone into deep deficit. It's really hard to restore your karma if you're in readonly mode and can't write/comment anything... Those who voted for that user's karma before can vote for their karma again (in + and in -)

##### 2.1.3.1. Rating

> In essence, the rating is a parameter that reflects the community's interest in the user's activity on the resource.
> 

Rating is the sum of the likes, to the posts and comments of the user.

It is noteworthy that the rating can "cool down": over time, it tends to zero. That is, the most active members of the community - people who regularly publish relevant posts and comments - get to the top of the hubra.

##### 2.1.3.2. RecoveryMode

This is the mode to which a user with karma [-30; -11] gets.

In this mode, the user can write 1 post a week - the last chance to accumulate karma and get out of the "hole".

#### 2.1.4. Yandex

##### 2.1.4.1. Rating

Rating = weighted average of the last 150 user ratings: the "fresher" the rating, the greater its weight.

❗So, a low grade can be "pushed" to the end by filling more orders.

##### 2.1.4.2. Priority

This mechanism allows you to determine the person who performs the order. Whoever has a higher priority is offered the order. 

##### 2.1.4.3. Activity

Activity points are awarded for each completed order. And are removed, skipping or canceling an order. If the Activity drops too low, orders will stop coming. 

> The farther away the passenger or sender is, the more points you get for the accepted order. And the less will be charged for the pass.


#### 2.1.5. Elo

A system used to calculate points in 2-person games. The most famous application is chess.

The idea is that if a low-ranked player beats a stronger player, the weaker player gets many points. If the stronger player wins against, the weaker player, the stronger player gets a few points.

Translate to reputation: if a low-ranked player helps a higher-ranked player, he gets more points. If a contestant with a high rating helps a "newbie," he gets a few points. Payment is made in any case.

Also, a contestant with a high rating helps another contestant with a high rating - a relatively low rating increase.

#### 2.1.6. AirBnB

The object of accommodation is evaluated by category + overall score.

A guest can give a 5 for cleanliness, comfort and location and still give an overall rating of 2.

##### 2.1.6.1. Ask for confirmation (draw attention to the illogicality of the assessment)

The service retries the user if the final grade is lower than the average for the criteria. In the scenario above, the service should show a warning that the final grade is lower than the category grades. 

> … the overall ratings given by guests to hosts increased. ... 3-star reviews are down 2.8 percent and 2-star reviews are down 3.9 percent. While these numbers may seem insignificant, they make a noticeable difference in the accuracy of the review system, and hosts benefit from it.
> 

##### 2.1.6.2. Clarify exactly why the low grade is.

Using location assessment as an example.

The property owner has no influence on the placement of the property. Assessment of placement is subjective. One person likes who's house is on the outskirts, another person doesn't like it because it's far from the historic center.

> If a guest rates less than 3 stars for a location, the question is displayed: "Is the location of the lodging described inaccurately?" This increased the scores for this category by an average of 0.8%.
> 

So, when a client wants to give a low rating, the service asks if the object really *deserves* that rating.

### 2.2. Web 3

#### 2.2.1. Your Justice

- Web: https://www.yourjustice.life, https://yj.life
- Github: https://github.com/YourJustice-Live/
- Stage: Alpha
- Networks: Poligon (testnet), BSC (testnet)
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)
##### 2.2.1.1. Description

Open-source platform for reputation and near-legal relationships within communities. 

#### 2.2.2. Colony

- Web: https://colony.io
- Whitepaper: https://colony.io/whitepaper.pdf
- Github: https://github.com/joincolony

##### 2.2.2.1. Description

Due to the combined complexity of reputation scores across multiple colonies, domains, and
skills, reputation scores cannot be stored or calculated on-chain. Instead, the calculations will all
take place off-chain, the results of which will be reported to the blockchain by participating CLNY
holders — in a process resembling a proof-of-stake blockchain consensus protocol. This is called Reputation Mining. While the calculation cannot be done on-chain and a correct submission can never be proved true, an incorrect calculation can always be proved to be wrong.

The Colony maintains the reputation tree with the following information in form of key-value pair:

- address of the colony the reputation is in
- account address holding the reputation
- skill id of the reputation
- numerical value of the reputation
- unique per-leaf id (used in reputation mining)

All individual reputations are assembled into the Reputation Tree which is a Merkle-Patricia
tree of all individual reputations in a colony, as well as the total reputation of each type held by
the users in each colony. The leaves that represent these colony-wide totals are indicated by setting
user to zero. These leaves are then inserted into the tree.

All Colony Network Token holders are eligible to become miners and participate in the reputation
update process. To participate in the mining process, Colony Network Token holders must stake some of their tokens to become 'reputation miners'.

The Colony Network is an Ethereum-based protocol for creating and operating Internet Organizations. In a traditional organization, rules are defined in policy documents and enforced by a management hierarchy; in an Internet Organization, rules are defined in code and enforced by a blockchain mining process.

**The reputation system**

Reputation is a number associated with each user which attempts to capture the value of that user’s
contributions to the colony over time. Reputation is used to weight a user’s influence in decisions
related to the expertise they have demonstrated, and to determine amounts owed to a colony’s
members when rewards are disbursed. Because reputation is awarded to users by either direct or
indirect peer assessment of their actions, we argue that influence and rewards can be seen as being
(roughly) distributed by merit. Colony’s aim is that the reputation system will enable an emergent
and dynamic decision-making hierarchy in which all of the right people are in the right places.
Colony aims to be broadly meritocratic. Consequently, the majority of decisions in a trustless
colony are weighted by the relevant reputation. Unlike tokens, reputation cannot be transferred
between accounts, as it represents an appraisal of the account’s activities by their peers. Reputation must therefore be earned by direct action within the colony.

**Types of reputation**

**Reputation by domain**

Reputation is earned in this hierarchy, and a user has a reputation in all domains that exist — even if that reputation
is zero. When a user earns or loses reputation in a domain, the reputation in all parent domains
changes by the same amount. In the case of a user losing reputation, they also lose reputation in
all child domains, but in this case the child domains lose the same fraction of reputation that was
lost in the original domain. If a reputation update would result in a user’s reputation being less
than zero, their reputation is set to zero instead.

**Reputation by skill**

We anticipate domains to mostly be used as an organisational hierarchy within a colony. However,
this would not necessarily capture the type of work that a user completed to earn their reputation.
If the domain were a project, with expenditures involving both design and development work,
reputation earned by completing expenditures related to these skills would not be distinguishable.
To have a more granular account of the work a user completes to earn their reputation, a skill cloud
is also maintained.
This global cloud of skill tags is available to all colonies, and is curated and maintained by the
Metacolony. When an expenditure is created, as well as being placed in a particular domain in
the colony, may also be tagged with one or more skills from the skills cloud. When the recipient
earns reputation by claiming the payout, they will earn reputation in all skills the expenditure was
tagged with, with the reputation divided uniformly amongst the skills. This is in addition to the
reputation earned in the relevant domains.
Even though the skills cloud is universal, specific skills reputation is unique to each colony.
Earning reputation in a skill in one colony has no effect on the user’s reputation in that skill in any
other colonies.

**Reputation by colony**

A user’s total reputation in a colony is their reputation in the root domain. This is the reputation
they will be voting with in any decisions that require input from everyone in a trustless colony (i.e.
modifying colony-wide parameters). Reputation in a colony has no effect outside the colony. In
particular, reputations held in one colony have no bearing on reputations held by the same account
in another colony.

**Earning and losing reputation**

There are three ways to receive reputation in a colony.
The first is through receiving a payout via an expenditure.
The second is through the arbitration process.
The third is upon the creation of a colony and the associated bootstrapping process.
Reputation losses broadly occur as the result of arbitration, and extension contracts  makes it possible to implement mechanisms which involve reputation penalties (such as tasks
and disputes). In addition, all reputation earned by users is subject to a continual decay over time.

**Reputation change via expenditures**

Whenever an expenditure recipient receives a payout denominated in the colony’s internal token,
the recipient also receives some amount of reputation, scaled by that recipient’s payout Scalar. A
value of 1 gives reputation equivalent to the token payout, but a multiple of up to 2x is possible.
The reputation is earned in the domain (and all parent domains) of the expenditure, and divided
equally among any skills associated with that recipient.

**Reputation change as a result of arbitration**

Arbitration permission holders have the ability to emit arbitrary reputation penalties (but not
increases) in both domains and skills. While this might seem to be a significant power available
to arbitration permission holders, recall that this permission will in many cases be assigned to
extension contracts, which will mediate this ability via various mechanisms, such as the motions
system

**Bootstrapping reputation**

Since a trustless colony’s decision making procedure rests on reputation weighted voting, we are
presented with a bootstrapping problem for new colonies. When a trustless colony is new, no-one
has yet completed any work in it and so nobody will have earned any reputation. Consequently,
no motions can be made and no disputes can be resolved as no-one is able to vote. Then, once the
first expenditure is paid out, that user has a dictatorship over decisions in the same domains or
skills until another user earns similar types of reputation.
To prevent this, when a colony is created, the creator can choose accounts to have initial
reputation assigned to them in the root domain to allow the colony to bootstrap itself. The
reputation assigned to each user will be equal to the number of tokens received, i.e. if a member
receives ten tokens, they also receive ten reputation in the root domain. Given that reputation
decays over time, this initial bootstrapping will not have an impact on the long-term operation of
the colony. This is the only time that reputation can be created without an associated expenditure
being paid out. Users receiving reputation are presumably the colony founder and their colleagues,
and this starting reputation should be seen as a representation of the existing trust which exists
within the team.

We note that the same is not required when a new domain is created in a colony. We do not
wish to allow the creation of new reputation here, as this would devalue reputation already earned
elsewhere in the colony. This bootstrapping issue is resolved by instead using reputation within the
parent domain, when a child domain contains less than 10% of the reputation of its parent domain.
A domain below this threshold cannot have domains created under it.

**Reputation decay**

All reputation decays over time. Every 90 days, 4 a user’s reputation in every domain or skill decays
by a factor of 2. This decay occurs every 1 hour, rather than being a step change every 90 days

**Revenue and rewards**

A colony may sell goods and services in exchange for Ether or any ERC20-compatible tokens, and
this revenue may be sent to the colony’s address. Whenever a colony receives such payments, we say
that the colony has earned revenue. Revenue is distinct from a colony’s working capital: the latter
is the sum of all tokens held by the colony in various domains, while the former is
implicitly defined as the colony’s token holdings not yet accounted for in any of the existing pots.
There is an expectation that some fraction of any Ether or other tokens received by the colony
are paid out to their members. ‘Members’, in this context, means accounts holding both tokens
and reputation in the colony. Whenever a colony distributes a portion of revenue to its members,
we say that the colony is paying out rewards.

**Processing revenue**

Revenue accumulates as the colony receives transfers of tokens. In order to be processed, any user
can make a special claimColonyFunds transaction, indicating for which token they wish to process
accumulated revenue.
The transaction then calculates the amount of token-denominated revenue that has accumulated since the last such transaction, and transfers some proportion to the colony’s rewards pot.
The remainder is then made available to the colony as working capital. The percentage split is
configurable by the root permission via the setRewardInverse function.

##### 2.2.2.2. Our differences

- We have the similar main idea of participation in the reputation update process. But we don't "mine" the reputation. Any Token staking is not required as well.
- Colony is designed to create organizations, and all payments come to the organization as a whole, which are then redistributed among the participants depending on their reputation. Our reputation system can work both in the organization and in P2P.

#### 2.2.3. Aragon Court & Aragon Govern platform review

- Web: https://court.aragon.org, https://govern.aragon.org
- Github: https://github.com/aragon/govern, https://github.com/aragon/aragon-court, ...
- Networks: Eth (and Rinkeby), Polygon (and Mumbai), Harmony, BSC, Stardust
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)

##### 2.2.3.1. Description

The Aragon Network is an Aragon organization that provides infrastructure and services to users of the Aragon platform, and is governed by ANT holders. The existing Aragon infrastructure enables users to create and manage organizations. Each Aragon organization exists as a set of smart contracts that define the organization's stakeholders and their associated rights and privileges.

Aragon offers 'court' and 'govern' systems. The Aragon Court is a decentralized oracle protocol developed and maintained by the Aragon Network. Aragon Court can be used by organizations, including the Aragon Network itself, to resolve subjective disputes with binary outcomes.

Aragon intrudises an advanced Permission Architecture. Aragon organizations control which addresses have access to perform actions on behalf of the organization in a permission registry called the Access Control List.

Governance authority over the Court is granted to ANT holders by way of an Aragon organization. Initially, all votes will last 1 Month, require 50% Support and 1% Minimum Acceptance Quorum. Creating votes requires depositing 1000 ANT into a Proposal Agreement with the following terms:

> Proposals must be made in good faith with the intention to improve the Network's operational efficiency, quality, or breadth of service, and benefit all ANT holders in equal measure.

Aa for fees Aragon includes:

- Subscription Fee:  A subscription fee is imposed on organizations that choose to use the Court as an arbitration provider. 
- Dispute Fee: Dispute fees are captured at the time a dispute or appeal occurs and are calculated based on a flat amount multiplied by the amount of juror stake selected in the dispute or appeal round.

##### 2.2.3.2. Our differences / similarities

- We are adopting Aragon's 'Dispute list' which allows to aiew all live disputes or only the ones you are adjudicating. The the list one can explore the details, evidence, and timeline for any dispute.
- Like Aragon we a dealing with some kind of reward / dispute fee.
- We don't require to host any tokens for creating votes. In Aragon Governance authority over the Court is granted to ANT holders by way of an Aragon organizatio. Creating votes requires depositing 1000 ANT.
- Generally our 'dispute resolution' subsystem is a 'side product'. Our main focus is 'reputation'.

#### 2.2.4. Kleros Platform Overview

- Web: https://kleros.io
- GitHub: https://github.com/kleros
- Stage: Kleros 2.0
- Network: ETH
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)


##### 2.2.4.1. Description

Kleros is an open-source online dispute resolution protocol that uses blockchain and crowdsourcing for fair arbitration of disputes. The Kleros is a general and multipurpose system that can be used in a wide variety of situations. Some examples of possible applications include:

- Escrow
- Micro tasking
- Insurance
- Oracle
- Curated lists
- Social Networks

Kleros is designed to be a versatile dispute resolution platform and can function as a legal arbitration service. For example social media policy violations include spam prevention and mitigating policy breaches by requiring users to deposit money before the incident begins. Kleros can directly resolve the dispute, or if the context is not clearer, other options that persist like removing content can be specified directly in the smart contract.

Kleros offers justice as a service(JaaS). Other crypto DApps can integrate Kleros to resolve disputes among their users.

Pinakion(PNK) is the native token for Kleros. It is an ERC-20 token that has following use cases:

- Staking: Judges stake PNK tokens to get selected to arbitrate the case. Their stake is slashed in case they do not give the correct judgment.
- Governance: PNK token holders submit and vote on proposals to upgrade Kleros protocol. Each PNK token gives 1 vote to the holder.
  
##### 2.2.4.2. Our differences

- Kleros' value proposition is decentralized arbitration for dispute resolving;
  our vision is a more general as we consider dispute resolution a part of reputation system. A solution like Kleros might be used as a submodule of our system.

#### 2.2.5. DREP Overview

- Web: https://www.drep.org , https://medium.com/drep-family
- Github: https://github.com/drep-project
- Stage: is not actively maintained - last commit was in 2021
- News: https://t.me/drep_foundation_announcements

##### 2.2.5.1. Description

From the main page:

> Drep is committed to building a "connector" and "toolbox" based on blockchain technology, providing solutions with ease of use, flexibility and no impact.
> 
> Based on drep underlying public chain, drep decentralized ID system, drep reputation protocol layer and drep SDK, we can build an open data ecology on the chain and break the current situation of separation of public chain ecology.

From [docs](https://docs.drep.org/technology-advantages/reputation/):

DREP Reputation System is a comprehensive close-loop ecosystem which includes a general reputation protocol, reputation pipeline interface, reputation on-chain data storage and algorithm library, reputation reward system, reputation value account management and fake account identification mechanisms. In the ecosystem, users’ behavior is linked to their reputation which will be evaluated by multiple interacting parties. Users will also receive complete real-time updates on their reputation.

#### 2.2.6. Ontology

- Web: https://ont.io/
- Github: https://github.com/ontio
- Stage: in production

##### 2.2.6.1. Description

Ontology implements a series of blockchain based protocols, including Orange - a Reputation Protocol (a community-driven project). 

Mission, as on the main page: Bringing trust, privacy, and security to Web3 through decentralized identity and data solutions.

Ontology has a trust search engine which provides authentication and connects services for individuals. 

> At Ontology, we envision a future where your identity and data are protected through encryption. Your on and off-chain data are secured without stress or worry. With **ONT ID**, you can protect your identity and data without constant oversight or maintenance. Using ONT ID prevents malicious actors from hijacking your identity or accessing personal information. We're building a future that guarantees you total control over who can access, see, and use your online data and identity.

#### 2.2.7. Orange protocol

- Web: https://www.orangeprotocol.io
- GitHub: https://github.com/orange-protocol
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)
- Networks: Ethereum, Polygon, BSC

##### 2.2.7.1. Orange protocol description

From [overview](https://docs.orangeprotocol.io/overview):

> On-chain data is currently scattered across a myriad of decentralized applications. Many types of actions take place in the form of transactions associated with wallet addresses.
> 
> However, if we were to take that transaction data, extract and consolidate useful data points together turning them into well-defined schemas, this data can prove to be very useful in assessing an entity's on-chain identity for specific contexts. Orange is to achieve just that.
> 
> Orange is a reputation and trust minting protocol that aggregates data and Web3 reputation models to generate comprehensive reputation proofs in the form of Verifiable Credentials and NFTs.

##### 2.2.7.2. Our differences

- Orange doesn't provide means to create reputation (via voting or other means),
  it only helps with aggregating on-chain data to interpret facts and behavior as reputation aspects.
  While theoretically this can be used for WorkFi, this makes each service that reads or modifies one's reputation
  to reinvent the wheel. We believe that ready-to-use reputation aspects and procedures for their modification
  will be much more helpful for the industry

#### 2.2.8. UTU

- Web: https://utu.io
- GitHub: https://github.com/utu-protocol
- Stage: in development (updated whitepaper Aug 10, 2022). MVP: http://defi-portal.utu.io/
- Networks: Ethereum, bridged to BSC, will be bridged to Polygon, and to other chains
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)

##### 2.2.8.1. Description

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

##### 2.2.8.2. Our differences

- UTU focuses on providing 'trust' which is an important aspect of reputation but not enough for WorkFi
  as it doesn't tell anything about the skills/quality of previous work;
  other aspects like contribution to community should also be supported by a reputation system;
- another UTU's focus is privacy: whitepaper says "we want users to be able to fully control
  who gets to access their data when, for what reason, in what context etc".
  We, on the other hand, envision reputation as something publicly available (transparent),
  any person or service should have read access to it (and reputation flaws should not be hidden)


## 3. Responsibility

Responsibility is a principle that we use in the design of some modules. We need it so that users are responsible for their actions. This way we motivate them to make better (quality) decisions. We design responsible rates and responsible invites. These mechanisms should increase the overall level of the system.

### 3.1. Responsible rates

<span style="color:red">
	TODO🔥
</span>

Scores that go against the community result in a loss.

### 3.2. Responsible invites (vouching)

Once a user reaches the reputation threshold, he receives an invite. This invite can be used to invite a new user to the network.

The invited user, on start, gets a percentage of the reputation of the inviting user. This is to reflect that probably the better your referrer is, the better you are. Invited user profile shows their inviter. This way, the system indicates WHO is behind the new community member.

Referrals can both help or hurt the inviting user: if the invitee recommends themselves as a trustworthy member of the community, they get reputation increase, and the inviter gets a proportional amount of that reputation for themselves; vice versa, reputation loss is propagated as well.

### 3.3. Guarantors

**P2P Guarantor** – a community member with a sufficiently high reputation who can guarantee the quality of interactions with another community member - new or with little reputation - in exchange for a share of the profits.

Guarantor is responsible by its reputation for the assignee for the entire term of the guarantee given. In case the guarantor receives low grades, it decreases the reputation of the guarantor. In case of positive evaluations it increases. The rate of increase and decrease of the reputation of the guarantor is regulated by the set coefficients and is one of the tools for tuning the reputation macroeconomics.

**Main scenario** – solve the problem when a new member of the community has no reputation at all and because of this it can be very difficult for him to get the first orders and prove himself

**Side Scenarios**

1. The outstaff team manager vouches for the quality of all team members
2. A top-notch renowned expert audits the performer's competencies and vouches for him in the event of a successful test
3. Course instructor vouches for his students - performers on the platform, and helps them in case of problems to successfully perform tasks
4. Professional guarantors are community members who are good at identifying qualifications and predicting the quality of services provided by the performer. Possibly help with the most difficult cases to avoid negative evaluations.

**How it works**

Let's take the basic scenario as an example.

**Background**. There is some community S with a reputation system R, in which scientific experts advise each other for a fee. There is a respected member of the community with a high reputation (20K) named A. There is a new member of the community, B, who is also a high-level expert, but has just registered on the platform and his reputation is 0. A and B know each other well.

1. B asks A to act as his guarantor, and A agrees.
2. A with the UI calls the method in R: R.guarantee()

## 4. Reputation sustainability

### 4.1. Handling abnormal scores

#### 4.1.1. A client is offended by life and gives the worker a minimal rate. Dispute is not open.

If the worker receives a low score, it is quarantined. This is a mode of the score in which it is not displayed and is not accounted in the worker's overall rating (displayed by UI).

If the next 5 scores are higher than the average reputation of the user, the “bad” score is discarded – implying that participants "did not match".

If a score *lower than the average* (?) comes among the next 5 scores, the low score gets accounted. In this case (*in both cases?*), the abnormal score can be disputed.

**The problem being solved** is “spoiling” one’s rating due to miscommunication.

**An adjacent case**: a user with low rating (a not-so-decent community member) gets an abnormally high score (is that a favor or a real improvement?). It also gets quarantined and is applied if the next scores “confirm” it. Note: a dispute is unlikely in this case as both sides are not interested in it.

**Procedure details**

User A has a high rating: their scores are usually in the range 90-100 (with 100 being maximum).

UserB, based on his work/political/religious/personal considerations, gives UserA a score of 10%.

Since the average grade for A = 100+90 / 2 = 95%, the threshold for an acceptable grade would be 42%.

Since 10<42, we believe that the estimate is abnormal. We mark it as suspicious .

Start observing the 5 subsequent evaluations. If the subsequent scores are higher than (100+90-10) / 3 = 60%, consider that the low score was abnormal - discard it from the history and remove the user from quarantine.

In this case, the threshold of the acceptable score has increased - an additional incentive for UserA.

If UserA, in observation mode, gets a score lower than (100+90-10) / 3 = 60%, consider that the score from UserB may have been deserved - include it in the overall statistics.

**Early withdrawal from observation**

UserA can open DisputeResolution.

If the dispute is resolved in favor of A, the score is discarded.

If the argument is in favor of B, A's low grade is counted instantly. Observation mode is terminated.

#### 4.1.2. The user gives the performer a 1 for non-good reason. Dispute is open

The user gives the performer a low score and opens a dispute.

Then there are three options for the development of events:

- the performer is found to be at fault. The evaluation goes into the performer's reputation.
- the dispute is resolved in the side of the performer. The score is not counted in the reputation, or a high score is given (by the arbitrator's decision)
- the parties go to a settlement - we believe that the reputation of the performer and the customer does not suffer - both get A's (it is advantageous to go to a settlement)

#### 4.1.3. The contractor deliberately fails to complete the order. Dispute Resolution.

If the contractor openly walks away from the order, the arbitrator recognizes the dispute in favor of the customer. The contractor is given a low reputation score.

The contractor cannot take orders during the week.

#### 4.1.4. The performer has gone bad in life. Started to forget about everything. Depression.

In such a scenario, the reputation of the user tends to 0. Other users see the low reputation and do not accept the risk. The only way to fix reputation is to take on "cheap" orders, where customers are willing to take a risk and work with an unreliable performer.

#### 4.1.5. The ratio of the value of the order to the reputation received.

Very important is the ratio of the cost of the order to the reputation that the contractor gets. The idea is that the higher the cost of the order, the higher the risk for non-performance. A high risk should lead to a high reward.

At the same time, it is clear that a client with an "expensive" order will not go to a person with a low reputation for help.

That's how we get two leagues: the "higher" and the "premier".

The highest league, where the user is offered expensive orders. For the execution of orders, the user receives a high reputation and, at the same time, for a failed order the user will be severely punished.

"Premier" league is the lower segment - users with a low reputation get offers at a low cost. It turns out that it takes time and effort to get to the top league.

The benefit is that, with this approach, the reputation is not made up of one expensive project, but of many smaller projects that have been completed.

## 5. Rates, Attributive rates

<span style="color:red">
	🔥 (bits in overview)
</span>

### 5.1. Labels, industries, categories
TODO
<span style="color:red">
	no information
</span>

### 5.2. Reputation as multiple rates
IN PROGRESS....

<span style="color:red">
	TODO💤 soft skills, contributing to the community, hard skills, badges, numbers,
</span>

### 5.3. Reputation use cases
IN PROGRESS....
<span style="color:red">
	TODO💤
</span>

### 5.4. Types and systems of rates

<span style="color:red">
	todo: review, translate, UPDATE(Kirill)💤
</span>

**Grading system**

Grading system is a methodological technique that allows you to distribute the set of objects under study according to the degree of expression of a common property for them. Such distribution is based on subjective estimates of a given property averaged over a group of experts. In psychology and sociology, rating scales were one of the first to be used. The simplest example of such a scale is the common school grading system. The grading scale has from five to eleven intervals, which can be designated by numbers or verbally. **It is considered that a person's psychological abilities don't allow him to classify objects on more than 11 to 13 items**. The possibility of constructing a rating scale is based on the assumption that each expert is able to directly quantify the objects under study. The basic scaling procedures include:

1. England - A\*, A, B, C, D, E, F, G
2. USA -  A, B, C, D, F
3. Japan - * yuu(優): A (90-100%)
* ryou(良): B (70-<90%)
* ka(可): C (60-<70%)
* fuka(不可): F (0-<60%)
1. Europe - 10 and 5 point systems.
2. Apple Store, Google play, Yandex, UBER, BOLT, Glovo, Aliexpress, Wechat, Facebook Marketplace, Amazon - 5 point system. We can conclude that most of humanity understands the 5 point system.
3. Pain Rating Scale - 10 point with emoji.
4. In terms of usability, Amazon has the best system.
5.  Preset grades

**Scale 1-5**

**Pros:** This is a very common scale that everyone is already familiar with.

It provides a more neutral position.

**Cons:** A neutral position is not always informative.

**Scale 1-6**

**Pros:** The guest cannot choose a neutral position and must choose a positive or negative evaluation.

**Cons:** This is not a very common scale

Not all guests consider 3/6 a bad review or 4/6 a good review.

**Scale 1-10**

This scale is used by Booking.com.

**Pros:** It allows you to evaluate your staff and monitor your services

Your customer can make more detailed choices.

**Cons:** You get more survey results, which will have an average rating, because of the large scaling

Getting a 10 is not easy because the scale is very large. A 10 will mean that for guests their entire stay was delightful

Numerical scales have a serious disadvantage. The perception of such a scale is highly dependent on the respondent. A score of 5 on a scale of 1 to 10 can mean anything from good to barely acceptable to different people. Also, some people have a much harder time justifying a category choice at the far end of the scale than others. All of this leads respondents with the same opinion to choose different categories, creating a source of error in the survey. These errors, in turn, make it difficult to figure out the actual opinion that the data represent.

Very satisfied = 5

Satisfied = 4

Neutral = 3

Dissatisfied = 2

Very dissatisfied = 1

Not specified = ответ отсутствует

Beautiful = 10

Very good = 8

Good = 6

Not bad = 5

Bad = 3

The worst = 0

**Function to change the grade. The contractor is unhappy with the grade and can first negotiate directly with the customer to correct it. If this does not work, a third party is involved.**

## 6. P2P crowdsourcing

Crowdsourcing involves obtaining work, information, or opinions from a large group of people. Our focus is to use crowdsourcing for verification and dispute resolution. Both flows imply two roles: initiator - a person requesting a verification or dispute resolution and guarantors - one or multiple community members having required qualifications.

The reputation provider offers tokens and/or reputation for community members with required qualifications to guarantee that there are always some guarantors and resolvers available to avoid processing delays.

Important: under the hood, we are dealing with keys. Key-Person match is an extra topic and it is out of the scope of this document.

### 6.1. Verification

Verification is the process of establishing the truth, accuracy, or validity of something. For example - both apostilles and certifications are used by foreign governments to assess the authenticity of an official signature on a document.

Big industries or a growing startup trying to take over the market require digital identity verification to connect customers to whatever they need.

#### 6.1.1. Verification in the non community driven real world

Using online services ofter requires validation/verification. For example, using exchanges like Binance requires providing documents confirming the identity. Multiple hosting companies require to send documents for account activation. Several companies have integrated even more strict verification using video calls. There are multiple identity verification services on the market. iDenfy https://www.idenfy.com/ is one of them used for ID Document Verification, Face Recognition with 3D Liveness Detection, and is fully AML compliant. iDenfy and similar services protect companies from identity fraud.

Another common real-world example of verification is issuing a 'certificate'. For example, a university confirms the knowledge in a specific domain by issuing an official document.

#### 6.1.2. How does it work in the community driven systems.

The difference from the existing solutions is to crowdsource guarantors for the verification process instead of having paid staff responsible for verification.

Guarantors willing to verify are called verificators. A person who requests verification is called verification initializer.

A verification service provider provides a secure and reliable solution to instantly verify consumers' attributes (identity, knowledge, etc) online. The verification flow is specific to the attribute to verify and might be predefined by the certification service provider. Verificators have to follow step by step flow (if predefined) or use their own methodology to make a decision. For example, phone number verification may imply an online call or sending a confirmation SMS.

Like in a regular verification flow the most important part is the authority truth. In the community-driven systems, we achieve this by checking the reputation of a potential verificator.

A general overview of the verification is as follows:

initiator -> signed verification request -> pool of verification requests -> verificator(s) select a request -> verificaion -> initiator's attribute is verified/not verified using

#### 6.1.3. Use cases

##### 6.1.3.1. Age verification

An online service filters access to the content based on age. A common approach to verify the age is to provide documents containing the date of birth. Verificators check the documents during an online call and the initiator gets verified by getting a token (SoulBound Tokens - The Non-Transferable NFTs) which acts like an apostille or certification. It's essential that the token is non-transferrable.

##### 6.1.3.2. Knowledge or skills verification

Having a community in mind where one offers knowledge to another it's essential for a service provider to have some reputation (to have some kind of certificate). For example, a web designer should have some experience with html/css/js. The result of verification is a token (SoulBound Tokens - The Non-Transferable NFTs) which acts like a certification. It's essential that the token is non-transferrable.

#### 6.1.4. Domains and validation logic

There are two main domain groups based on the essence of what should be verified.

Binary domains:

- phone validation
- age validation
- etc

Degree / grade domains:

- skating skills
- database knowledge
- language skills
- etc

Binary domains are as simple as confirming something in a yes/no manner. This group is 'quantity' based. Quantity is relatively trivial to validate.

Grade domains are more subjective. There is potentially a big gap between the opinions of different validators.

The consequence of separating domains is the logic of verification. It's quite simple to validate a phone by calling or sending an SMS. The end decision of one specific validator is a clear yes/no. On the other hand, web technology knowledge is a more complicated case where the initiator could have some level of knowledge - html, css but no js. A natural way to evaluate cases like this is to set let's say 7 from 10 possible points. Skating skills is even more subjective topic.

For the binary domains, the yes/no of all validators should be taken into consideration. The sum gives us the end result. The quorum of validators is 3 or a bigger odd number. This minimum required number of validators is a settable value.

Example: age validation

Validator 1: yes
Validator 2: no
Validator 3: yes
Final decision: yes

For grade domains, we calculate the average as a more flexible way to grade to make it as less as possible subjective. There should be a threshold for a specific domain, let's say 5 points (0 is the min - 9 is the max). The quorum of validators is 1 or bigger. This minimum required number of validators is a settable value.

Example: EN writing skills

Threshold: 5
Validator 1: 7
Validator 2: 5
Validator 3: 6
Average: 6
Final decision: yes / 6

#### 6.1.5. How to verify technically

Based on domain:

- text (chat) verification
- audio call verification
- video call

For predefined verification flows verificators follow the validator provider's way to verify. If there is no predefined flow a verificator is free to use their own flow to verify.

#### 6.1.6. Verificator's profit

Verificators are paid in two ways (settable): increased reputation, and/or regular tokens.

There are two main scenarios on paying verificators:

- an initiator pays the verification
- community members pay some kind of membership fee which covers the verification

Verificators are interested in increased reputation because it might lead to access to some restricted, premium content of a service.

Regular tokens reward is self-explanatory.

As a result, a validation provider should always have some active verificators.

#### 6.1.7. Conflict resolution

If an initiator does not agree with the result there is a way to open a dispute resolution. Possible solutions are:

- a new verification made by another group of verificators
- a new verification with a bigger number of verificators to make subjective opinions more objective.

#### 6.1.8. Bad verificators

Under 'bad' we mean a verificator whose decision almost always doesn't match the end result. In this case, the reputation of the verificator should be decreased to avoid misuse of the verificator's right. Another solution is to limit temporary access to the verification pool by hitting some threshold (settable value).

#### 6.1.9. How to become a verificator. Cold start.

The main requirement to a verificator is a dufficient reputation in the specific domain. It automatically implies that a verificator should be verified firstly thus there should be some 'cold start' verificators at start time. This could be a settable value (list) by reputation service provider.

#### 6.1.10. General implementation details

The initializer places a signed request as proof of the kay ownership. The request contains at least:

- The type: what exactly should be verified - age / skating skills

As for date/time there are tree possible silution
- an initiator places the desired date/time
- validators opens time slots free for verification
- initiator and verificators meet separate agreement about date/time 

Verificators with a reputation above the threshold for the specific type (domain) should be able to list requests in the pool and confirm the participation by signing.

At the specific time a call is initiated and verificators verify what shoul be verified.

An initializer gets a Non-Transferable token.

Verificatoes gets reputation and/or regular tokens.

#### 6.1.11. How an external service uses a reputation service provider

A service should be able request the desired information in form of: "is the owner of the key under 18"?

### 6.2. Dispute resolution

In general a dispute resolution is the process of resolving a dispute or conflict between different parties. Crucially, dispute resolution can be a way of solving a conflict without having to go to court. 

There are some advantages to using dispute resolution instead of going to court. Dispute resolution can:

- solve your problem faster
- cost less
- avoid the stress of going to court
- help preserve your relationship with the other party
- be confidential
- be flexible and provide a range of outcomes
- help achieve mutual agreement

Dispute resolution is not suitable for:

- some types of dispute, for example domestic abuse
- issues needing urgent court action, such as to prevent you losing something
- the outcome needs to be legally binding
- the other party is unwilling to take part in dispute resolution

#### 6.2.1. Dispute resolution logic

Using a common communications ways like

- text
- audio
- call

a resolver should take in consideration meaning two parts of a dispute. To avoid any conflicts it's better do make two independent calls. Based on the information a resolver tries to solve a dispute. The goal is not to decide who is right but to find a suitable solution for both parts.

#### 6.2.2. Duspute resolution between community members

In a community it's hard to 'hold' payment for a service, if payment is already performed. The real instrument to enforce better communication is reputation. Thus if part 1 offered some services to part 2 and part 2 won't pay we don't really have an intrument to enforce the payment.

What we can do is adjusting reputation in case of conflicts.

##### 6.2.2.1. Form of resolution

Locked balance is unlocked for specific part.

#### 6.2.3. Dispute resulution between comunity member and a service provider


##### 6.2.3.1. Form of resolution

Example: A commutiony memner doesn't agree with validation of his EN writing skills. (negative outcome)

Final decision to confirm or not to confirm EN writing skills.

### 6.3. Court system

#### 6.3.1. Overview of the court system (judiciary)

Nowadays, more and more traditional processes are moving online. 
Probably a small number of non-digitized processes remain. With the advent of blockchain technology, we can be 100% sure of the existence of certain events in time, which is supported by irrefutable evidence stored in a distributed ledger. 

Proof-of-stake technologies, which have gained popularity, can significantly reduce the cost of recording and storing blocks in the chain, making the technology available for mass implementation in wide areas of life. One area we want to address is dispute resolution. Why don't people stop arguing? If we consider a person as a class, we will see that a class has a certain set of biological, social, psychological and many other properties. Each instance of the class, that is, each person, has individual values for these properties, and these values are constantly mutating in time, in interaction with other people, means of obtaining information, and many more conditions. Therefore, people's views on the same things, events or processes can be objectively radically different. There is another aspect of human nature that is important for us - this is the human Ego and one of its main manifestations - the Ego absolutely needs to be right and prove his case by any available means and at any cost, even at the highest cost - with his life.

#### 6.3.2. What we have to do

If it is impossible to agree, the parties can choose a system for resolving their dispute, which they will trust. In this case, the verdict issued by the judicial system will be accepted by the Ego with minimal criticism. 

Important triggers of system trust:

- The inability of one of the parties to directly or indirectly influence the decision-making process.
- Compliance of the decision with applicable laws, agreements and principles accepted by both parties.
- Lack of interest.
- Transparency of all processes.
- Minimizing human error in decision making.

#### 6.3.3. The Role of the Judge

Members of the community who meet the following criteria will be accepted as judges:

- positive rating;
- staked assets;
- passed tests on knowledge of the laws and principles of the community and became examination test court tasks.

In the future, it is possible to introduce the institution of judging, in which at first the participant becomes an applicant, solves legal cases in parallel and gains points in order to become a judge.

#### 6.3.4. Decision-making mechanism

The judge receives a request that the system has randomly selected him as a judge. The judge accepts the request and the case materials become available to him. The claim of one of the parties and the arguments of the other party, the evidence of each of the parties is also available, including the testimony of witnesses registered in the system.

The judge, guided by the norms and laws in force in the community, makes a decision by accepting one of the available options: satisfy the claim, partially satisfy, refuse.

To minimize the likelihood of human error, the decision is made in parallel by several judges, an odd number. The judges do not see the decisions of other judges on this case.

#### 6.3.5. Court case flow

1. The participant creates a case, choosing the industry, the subject of the dispute, the amount of the claim, if there is (any):
2. Describes the situation in detail.
3. The attached data of the opponent (opponents).
4. The attached evidence links in ipfs.
5. The attached data of witnesses in the system.
6. The sent case (the system sends requests to witnesses and opponents).
7. Next, witnesses and opponents have access to the case materials and time to describe their version of the case and attach evidence. The specific timing of the processes passage is up to a discretion of the community, but implies the presence of common sense.
8. The collecting of the necessary evidence and the expiration of the deadline. The case is attached to randomly selected judges.
9. Judges, within the time determined by the community, based on the laws of the community and the materials presented, make decisions on the case.
10. The final decision on the case is determined automatically based on the majority decisions of the judges.
11. One of the participants in the case may file an appeal
12. In this case, the process is repeated in paragraphs 8-10.
13. In case of an identical appeal decision, the decision is automatically approved.
14. In case of the opposite decision of the appeal, the process is repeated in the third panel of judges. The decision of the third composition is considered final.

#### 6.3.6. Hierarchy of laws
 
- Decisions of judges should not contradict the laws of the community, but only expand its properties without redefining its essence.
- The community forms laws independently as a pen-source system.
- Vote for the adoption of certain amendments and new laws.
- Judicial decisions will not be changed if the laws is changed.


## 7. Safety, anti-fraud

### 7.1. Protection against artificial sway/attack of lowering the profile

**Case:** 10 users register on the network, create orders for $1 and they are all fulfilled by user X. For this he gets a high score from everyone.

**Case:** the user gets a batch of ones in a row - an organized attack on the profile.

If the user receives an abnormal score (below half of the current average reputation), the score is frozen and the user is quarantined.

If the dispute has not been opened by either party, the score is discarded.

### 7.2. Proof of Commission

Proof of Commission principle (in P2P reputation systems): in order to earn 1 unit of reputation, you need to spend 1 USD in the form of commission and get a positive score as a result of paid P2P interaction.

This principle does not define the recipient of the commission - it can be a community fund, a reserve pool, a service commission. However, the commission payer cannot be the sole and direct beneficiary of that commission.

This principle is necessary to avoid reputation bumping (cheating).

## 8. Community education

### 8.1. Soft skills

**User categorization principles within educational part**

- We consider categorizing users by their soft skills level, which means that people with highly developed soft skills within the community interact with people with a related similar soft skills level.
  * Comment: It makes less sense to categorize users by their level of hard skills within a community, since a company or an individual may need a specialist with both: high and low levels of certain hard skills.
- We develop the protocol in such a way that people always have opportunities and ways to improve their soft skills. The educational process itself is aimed at improving soft skills and enhancing the entire community quality. Thus, our main goal is not to categorize users, but to motivate them to improve the level of their soft skills.
  * Comment: This is especially important for users with highly developed hard skills.
- Ethical problems categorization solutions

<span style="color:green">
	coming soon...
</span>

After a certain type of interaction within a service or a platform, users receive feedback on the interaction. 

**Feedback** is delivered in 2 ways: 

- Public feedback is delivered on blockchain.
- Private feedback is delivered off chain and can be sent via a form in a web App or a service.

Feedback is delivered on particular qualities and internals, which are notionally stated as **problems**.

There are 3 levels of **problems** which we consider as a part of **feedback**:

- **Hard skills** can be defined via feedback within a service or a platform. For instance, if a user presents lower quality of skills than stated, we mark him with a lower position in the service (e.g senior engineer delivers services on the level of a middle or a junior specialist, and we mark him respectively).
- **Soft skills** are a set of skills, valuable in any type of interactions, and related to a particular area of services presented by a user. Soft skills include respectful communication, time-management, accuracy, etc. 
- **Community engagement**, which means any P2P transactions and interactions, level of involvement in community processes, feedback to other users, and other certain actions that suit a particular community.

The main purpose of education is to improve the skills of individuals within the entire community, therefore enhancing the quality of communication throughout the community.

If a user presents high hard skills or community contribution, and low soft skills, education is focused on soft skills improvement. This will demand high community contribution and involvement of other users.

Within P2P interactions users can leave **general feedback**, which includes overall experience rating, and **specific feedback** that targets particular skills and qualities of another user.

- In case of **general negative feedback** we strive to improve overall skill set of a user
- On a **specific negative feedback** we educate a user with targeted skills

To improve communication within the community and to work with specific users on their soft skills, we can involve **Soft skills Managers**.

**Soft skills manager** can be both: an algorithm within a service as well as a person in a community who is responsible for qualitative communication and improving soft skills of other users.

In order to educate and improve soft skills of users, soft skills manager takes the following actions:

- primarily **informs** a user about problems that occur in the process of interaction, which includes defining the problem, suggesting solutions and actions for problem skills improvement and outlining expectations towards specific rating indicators;
- **verifies that the user is informed**. This can be done via P2P private conversation, direct messages, or tests on a specific topic;
- **suggests particular actions** and recommendations on improving specific soft skills, possible to implement with metrics, that the user needs to meet in a particular time; 
- **observes and controls the dynamics** of the metrics, and reacts depending on the dynamics.

With good situation development, the **user reacts positively** to the education process, successfully completes tests and improves his rating in the system.

If **the user reacts negatively** to the feedback provided, his actions within a service may be frozen until he passes certain tests and completes tasks. If these measures don't work, the user may be eliminated from the community.

When educating users we can encounter a number of obstacles that may occur:

- There are users who are not a “teachable fit”, and can not or do not want to be educated or guided towards their soft skills development. In this case such users continue to interact with other users with similar soft skills levels. 
- Negative feedback can be negatively perceived by users. If a user reacts negatively, and therefore can not or does not want to improve his soft skills level, he continues to interact with other users with similar soft skills levels. 
- In the case of SCUM we attract specialists for dispute resolution processes to provide solutions and ways to resolve a conflict or a disputable situation. Based on the chosen strategy within the dispute resolution process, users may be advised to take a number of mandatory actions. In case of refusal, users can be eliminated from the community.
  * In addition, at the protocol level, we have anti-scammers solutions implemented. For example, freezing payments until the results are agreed by the other party.

In the process of education and communication quality improvement, we use a number of approaches and algorithms which serve to enhance the overall quality of the community:

- Provide users with **information and feedback** on their actions, provide articles and supporting materials on a targeted topic, to improve problem areas and rating dynamics.
- **Connect people with people with the same problems**. For example a user who is predominantly late will be a fair fit to a person with the same soft skill problem, rather than with the one who is always on-time. This approach serves to be both: sustainable and educational.
- Personal **targeted work with a user**, which includes providing details on the community expectations and increasing user’s motivation to increase specific rating parameters.
- P2P Mentoring system is a type of more prolonged and targeted P2P work with a particular user to improve user’s skills and rating.
  

**P2P mentors** are motivated to take part in such community communication and involve in community enhancing due to motivational aspects, which include **financial rewards**, and maintaining and boosting their **reputational metrics**.

<div style="color:green">
	coming soon...<br>
  - P2P mentors interactions development<br>
  -- Criteria and protocols to choose a mentor<br>
  -- Possible options on mentor sessions parameters
</div>

**Automation of processes**

Feedback algorithms within a service or a community can be automated by community members’ contribution and operate in the following way:

- After any transaction or interaction users will have an option to leave feedback labels as targeted rates on certain parameters and skills (e.g emojis labeling 🔥😁⏱👹);
- Basing on users’ feedback we calculate soft skills parameters to collect and sum related data’
- Basing on the calculated parameters the user is directed towards the most suitable strategy according to his rating;
- Auto control of further actions and dynamics of user's behavior, which comes with the next action taken within the service.
### 8.2. Hard skills

<span style="color:green">
	coming soon...
</span>

### 8.3. Community engagement

<span style="color:green">
	coming soon...
</span>

## 9. Tech

<span style="color:red">
	(Dima, Kirill)
</span>

### 9.1. Architecture

<span style="color:red">
	(Dima, Kirill)
</span>

### 9.2. Interfaces

<span style="color:red">
	(Dima, Kirill)
</span>

### 9.3. EIP-2535

<span style="color:red">
	(Dima, Kirill)
</span>
