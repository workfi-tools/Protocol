# Reputation systems
    
## Glossary

<span style="color:red">
	TODO: move terms here
</span>

## General overview of our rep system

<span style="color:red">
	TODO🔥: create a scheme (diagram) of the whole: https://miro.com/app/board/uXjVPbuauSc=/ 
</span>

### Principles

The reputation system is a configurable set of principles and rules embodied in a system of smart contracts written in the Solidity language.

Reputation system is designed for use in systems, services, DAOs and communities, in which participants can give each other marks for some interactions - both paid (performance of works, consultations) and unpaid. Proof of commission is applicable only for paid interactions.

Here are some of core principles:

1. Proof of Commission
2. Responsibility
	1. Responsible rates
	2. Responsible invites
	3. Guarantors
3. Attributive rates
4. P2P crowdsourcing
	1. Verification
	2. Dispute resolution
	3. Court system
5. True ownership and service agnostic
6. Scam Resistance
7. Handling of abnormally bad grades

#### The Macroeconomics of Reputation

##### Usecases

<span style="color:red">
	TODO🔥
</span>

##### Features

###### Attributive rates

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

**Macro parameters:**

<span style="color:red">e
	TODO: 1. Новые отзывы / оценки, 2. ..reputation diminishing with time (meritocracy vs aristocracy)
</span>

### Basic reputation representation model and unification problems

<span style="color:red">
	TODO: ???
</span>

## Reputation model

**Main Terms**

The system consists of agents A1, A2, ..., who interact via transactions T1, T2, ...

Agent An can initiate an interaction with agent Am.

The interaction can be unidirectional (asymmetric) or bidirectional (symmetric). *todo: what’s the difference?*

*В некоторых системах (посмотреть видос и оценить лайком – не требуется согласия обеих сторон на взаимодействие, в других типа Upwork – требуется). Рассмотреть лайки, p2p*

У каждого агента An есть функция – оценить результат взаимодействия RateSubjectiveN(T1(An, Am)) -> RateNM.

*В случае симметричного взаимодействия производятся две оценки:*

RateSubjectiveN(T1(An, Am)) -> RateNM

RateSubjectiveM(T1(An, Am)) -> RateMN

Каждому агенту A1, A2, ... соответствует RateObj1, RateObj2, ..., который интегрирует результаты взаимодействий, направленных к A1, A2, ...

Существует функция, которая обновляет RateObj для A по результатам взаимодействия T:

RateUpdate(RateObj_M, RateMN) -> RateObj_M_updated

1. Существует репутационная система Rep

2. Predict(T(Am, An)) ->

Есть система Rep, предсказыва

Существую

По результатам каждого взаимодействия агенты

**Why a reputation system is needed**

Основная цель репутационной системы – давать наиболее точное предсказание результатов взаимодействия между агентами

Существует система Com взаимодействующих агентов A1, A2, ...

Каждый агент имеет регулярно меняющийся показатель удовлетворенности – Contentment. В результате взаимодействия как минимум у одной из сторон этот показатель изменяется.

Система Com тем лучше, чем выше суммарный прирост удовлетворенностей ∫ (∑(Contentment_i, i, 1..n), (t, 0, Com_lifetime), dt) за все время существования системы.

Чем больше агентов, тем лучше

Чем больше взаимодействий между ними, тем лучше

Чем дольше живет система, тем лучше

**The higher the increase in satisfaction with the results of each of the interactions, the better**

В общем случае

Interaction(A1, A2, context1, context2) ->

UpdateContentment1(Cont1) -> Cont1_updated,

UpdateContentment2(Cont2) -> Cont2_updated,

Взаимодействия могут быть безконтекстными, содержать один или два контекста.

Контекст Cont_n взаимодействия Tmn агента An – особые условия для взаимодействия Tmn. Например, текст задания.

Примеры двухконтекстного взаимодействия:

1. сложная сделка, где каждая из сторон делает что-то для   другой стороны. Например, услуга на услугу.
2. знакомство двух людей; контексты в этом случае – то, с   кем бы хотел познакомиться каждый из пары

Для разных контекстов результат взаимодействия между одними и теми же агентами может быть разным.

Для того, чтобы оптимизировать суммарную удовлетворенность, необходимо:

1. максимизировать количество взаимодействий, увеличивающих удовлетворенность
2. подбирать для взаимодействий таких агентов (в условии текущих контекстов), для которых суммарный прирост удовлетворенностей будет максимальным
3. Избегать тех взаимодействий, в результате которых общая удовлетворенность понизится

Для того, чтобы выбирать взаимодействия, для которых прирост удовлетворенностей будет максимальным, необходимо предсказывать удовлетворенности агентов.

PredictContentments(A1, A2, Context1, Context2) ->

-> (∂Contentment1, ∂Contentment2)

## WorkFi industry

### Multiple rep providers

<span style="color:red">
	YAKOV 100% made something, maybe in Miro? Or somwhere in Notion
</span>

### DAO + us

<span style="color:red">
	TODO💤
</span>

### Web2 + us

<span style="color:red">
	TODO💤
</span>

### WorkFi vision

<span style="color:red">
	TODO a little text (we’ve got some text somewhere)
</span>

## WorkFi Roadmap

<span style="color:red">
	6 months, 2 years (vision) TODO🔥
</span>

# Market overview

## Your Justice

- Web: https://www.yourjustice.life, https://yj.life
- Github: https://github.com/YourJustice-Live/
- Stage: Alpha
- Networks: Poligon (testnet), BSC (testnet)
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)
### Description

Open-source platform for reputation and near-legal relationships within communities. 

## Colony

- Web: https://colony.io
- Whitepaper: https://colony.io/whitepaper.pdf (reputation: chapter 5)
- Github: https://github.com/joincolony

## Aragon Court & Aragon Govern platform review

- Web: https://court.aragon.org, https://govern.aragon.org
- Github: https://github.com/aragon/govern, https://github.com/aragon/aragon-court, ...
- Networks: Eth (and Rinkeby), Polygon (and Mumbai), Harmony, BSC, Stardust
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)

## Kleros Platform Overview

- Web: https://kleros.io
- GitHub: https://github.com/kleros
- Stage: Kleros 2.0
- Network: ETH
- Substrate/Polkadot/Kusama ecosystem availability: may work on EVM parachains (not targeting them)

### Our differences

- Kleros' value proposition is decentralized arbitration for dispute resolving;
  our vision is a more general as we consider dispute resolution a part of reputation system.
  A solution like Kleros might be used as a submodule of our system.

## DREP Overview

- Web: https://www.drep.org , https://medium.com/drep-family
- Github: https://github.com/drep-project
- Stage: is not actively maintained - last commit was in 2021
- News: https://t.me/drep_foundation_announcements

### Description

From the main page:

> Drep is committed to building a "connector" and "toolbox" based on blockchain technology, providing solutions with ease of use, flexibility and no impact.
> 
> Based on drep underlying public chain, drep decentralized ID system, drep reputation protocol layer and drep SDK, we can build an open data ecology on the chain and break the current situation of separation of public chain ecology.

From [docs](https://docs.drep.org/technology-advantages/reputation/):

DREP Reputation System is a comprehensive close-loop ecosystem which includes a general reputation protocol, reputation pipeline interface, reputation on-chain data storage and algorithm library, reputation reward system, reputation value account management and fake account identification mechanisms. In the ecosystem, users’ behavior is linked to their reputation which will be evaluated by multiple interacting parties. Users will also receive complete real-time updates on their reputation.

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


## Web3

<span style="color:red">
	🔥 Dima, same link, products
</span>

## Web2

<span style="color:red">
	https://www.notion.so/Reputation-417beb517212403c8eb08290846933a6
</span>

# Responsibility

<span style="color:red">
	🔥 (bits in overview)
</span>

## Responsible rates

<span style="color:red">
	(оценки, идущие вразрез с сообществом, приводят к rep.loss; cases for review-audits like in SO?): TODO: text
</span>

## Responsible invites (vouching)

Once a user reaches the reputation threshold, he receives an invite. This invite can be used to invite a new user to the network.

The invited user, on start, gets a percentage of the reputation of the inviting user. This is to reflect that probably the better your referrer is, the better you are. Invited user profile shows their inviter. This way, the system indicates WHO is behind the new community member.

Referrals can both help or hurt the inviting user: if the invitee recommends themselves as a trustworthy member of the community, they get reputation increase, and the inviter gets a proportional amount of that reputation for themselves; vice versa, reputation loss is propagated as well.

## Guarantors

<span style="color:red">
	todo: review, translate
</span>

# Rates, Attributive rates

<span style="color:red">
	🔥 (bits in overview)
</span>

## Labels, industries, categories

<span style="color:red">
	no information
</span>

## Reputation as multiple rates

<span style="color:red">
	TODO💤 soft skills, contributing to the community, hard skills, badges, numbers,
</span>

## Reputation use cases

<span style="color:red">
	TODO💤
</span>

## Types and systems of rates 

<span style="color:red">
	todo: review, translate, UPDATE(Kirill)💤
</span>

**Grading system**

ШКАЛА ОЦЕНОК — методический прием, позволяющий распределить совокупность изучаемых объектов по степени выраженности общего для них свойства. Такое распределение основывается на оценках субъективных данного свойства, усредненных по группе экспертов. В психологии и социологии шкалы оценок стали применяться одними из первых. Простейший пример такой шкалы — обычная школьная система баллов. Шкала оценок имеет от пяти до одиннадцати интервалов, кои можно обозначить числами или же вербально. **Считается, что психологические возможности человека не позволяют ему классифицировать объекты более чем по 11 — 13 позициям**. Возможность построения шкалы оценок базируется на предположении, что каждый эксперт способен непосредственно давать количественные оценки изучаемым объектам. К основным процедурам шкалирования относятся:

1. Англия - A\*, A, B, C, D, E, F, G
2. Америка -  A, B, C, D, F
3. Япония - * yuu(優): A (90-100%)
* ryou(良): B (70-<90%)
* ka(可): C (60-<70%)
* fuka(不可): F (0-<60%)
4. Европа - 10 бальные и 5 бальные системы
5. Apple Store, Google play, Yandex, UBER, BOLT, Glovo, Aliexpress, Wechat, Facebook Marketplace, Amazon - 5 бальная система. Можно сделать вывод, что большей части человечества понятна 5 бальная система.
6. Шкала оценки боли - 10 бальная с эмодзи.
7. С точки зрения юзабилити самый лучшая система у Amazon.
8. Предустановленные оценки

**Scale 1-5**

**Pros:** Это очень распространенная шкала, с которой все уже знакомы.

Она предоставляет более нейтральную позицию

**Cons:** Нейтральная позиция не всегда информативна.

**Scale 1-6**

**Pros:** Гость не может выбрать нейтральную позицию и должен выбрать положительную или отрицательную оценку

**Cons:** Это не очень распространенная шкала

Не все гости считают 3/6 плохим отзывом или 4/6 - хорошим.

**Scale 1-10**

Эта шкала используется Booking.com.

**Pros:** Она позволяет оценить Ваш персонал и контролировать Ваши услуги

Ваш клиент может сделать более подробный выбор

**Cons:** Вы получаете больше результатов опросов, которые будут иметь средний рейтинг, из-за большого масштабирования

Получить 10 непросто, так как масштабирование очень велико. 10 будет означать, что для гостей все их пребывание было восхитительным

У числовых шкал есть серьезный недостаток. Восприятие такой шкалы сильно зависит от респондента. Оценка 5 по шкале от 1 до 10 для разных людей может означать что угодно —от хорошего до едва допустимого. Кроме того, некоторым людям гораздо сложнее обосновать выбор категории на дальнем конце шкалы, чем другим. Все это приводит к тому, что респонденты с одним и тем же мнением могут выбирать разные категории, создавая в опросе источник ошибок. Эти ошибки, в свою очередь, затрудняют выяснение действительного мнения, которое представляют полученные данные.

Очень довольны = 5

Довольны = 4

Нейтральное отношение = 3

Недовольны = 2

Очень недовольны = 1

Не указано = ответ отсутствует

Прекрасно = 10

Очень хорошо = 8

Хорошо = 6

Неплохо = 5

Плохо = 3

Хуже всего = 0

**Функция изменить оценку. Исполнитель недоволен оценкой и чтобы повысить ее может в начале договориться с заказчиком напрямую, чтобы ее исправить. Если не получается договориться, то уже привлекаются 3-е лица.**

# P2P crowdsourcing

Crowdsourcing involves obtaining work, information, or opinions from a large group of people. Our focus is to use crowdsourcing for verification and dispute resolution. Both flows imply two roles: initiator - a person requesting a verification or dispute resolution and guarantors - one or multiple community members having required qualifications.

The reputation provider offers tokens and/or reputation for community members with required qualifications to guarantee that there are always some guarantors and resolvers available to avoid processing delays.

Important: under the hood, we are dealing with keys. Key-Person match is an extra topic and it is out of the scope of this document.

## Verification

Verification is the process of establishing the truth, accuracy, or validity of something. For example - both apostilles and certifications are used by foreign governments to assess the authenticity of an official signature on a document.

Big industries or a growing startup trying to take over the market require digital identity verification to connect customers to whatever they need.

### Verification in the non community driven real world

Using online services ofter requires validation/verification. For example, using exchanges like Binance requires providing documents confirming the identity. Multiple hosting companies require to send documents for account activation. Several companies have integrated even more strict verification using video calls. There are multiple identity verification services on the market. iDenfy https://www.idenfy.com/ is one of them used for ID Document Verification, Face Recognition with 3D Liveness Detection, and is fully AML compliant. iDenfy and similar services protect companies from identity fraud.

Another common real-world example of verification is issuing a 'certificate'. For example, a university confirms the knowledge in a specific domain by issuing an official document.

### How does it work in the community driven systems.

The difference from the existing solutions is to crowdsource guarantors for the verification process instead of having paid staff responsible for verification.

Guarantors willing to verify are called verificators. A person who requests verification is called verification initializer.

A verification service provider provides a secure and reliable solution to instantly verify consumers' attributes (identity, knowledge, etc) online. The verification flow is specific to the attribute to verify and might be predefined by the certification service provider. Verificators have to follow step by step flow (if predefined) or use their own methodology to make a decision. For example, phone number verification may imply an online call or sending a confirmation SMS.

Like in a regular verification flow the most important part is the authority truth. In the community-driven systems, we achieve this by checking the reputation of a potential verificator.

A general overview of the verification is as follows:

initiator -> signed verification request -> pool of verification requests -> verificator(s) select a request -> verificaion -> initiator's attribute is verified/not verified using

### Use cases

#### Age verification

An online service filters access to the content based on age. A common approach to verify the age is to provide documents containing the date of birth. Verificators check the documents during an online call and the initiator gets verified by getting a token (SoulBound Tokens - The Non-Transferable NFTs) which acts like an apostille or certification. It's essential that the token is non-transferrable.

#### Knowledge or skills verification

Having a community in mind where one offers knowledge to another it's essential for a service provider to have some reputation (to have some kind of certificate). For example, a web designer should have some experience with html/css/js. The result of verification is a token (SoulBound Tokens - The Non-Transferable NFTs) which acts like a certification. It's essential that the token is non-transferrable.

### Domains and validation logic

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

### How to verify technically

Based on domain:

- text (chat) verification
- audio call verification
- video call

For predefined verification flows verificators follow the validator provider's way to verify. If there is no predefined flow a verificator is free to use their own flow to verify.

### Verificator's profit

Verificators are paid in two ways (settable): increased reputation, and/or regular tokens.

There are two main scenarios on paying verificators:

- an initiator pays the verification
- community members pay some kind of membership fee which covers the verification

Verificators are interested in increased reputation because it might lead to access to some restricted, premium content of a service.

Regular tokens reward is self-explanatory.

As a result, a validation provider should always have some active verificators.

### Conflict resolution

If an initiator does not agree with the result there is a way to open a dispute resolution. Possible solutions are:

- a new verification made by another group of verificators
- a new verification with a bigger number of verificators to make subjective opinions more objective.

### Bad verificators

Under 'bad' we mean a verificator whose decision almost always doesn't match the end result. In this case, the reputation of the verificator should be decreased to avoid misuse of the verificator's right. Another solution is to limit temporary access to the verification pool by hitting some threshold (settable value).

### How to become a verificator. Cold start.

The main requirement to a verificator is a dufficient reputation in the specific domain. It automatically implies that a verificator should be verified firstly thus there should be some 'cold start' verificators at start time. This could be a settable value (list) by reputation service provider.

### General implementation details

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

### How an external service uses a reputation service provider

A service should be able request the desired information in form of: "is the owner of the key under 18"?

## Dispute resolution

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

### Dispute resolution logic

Using a common communications ways like

- text
- audio
- call

a resolver should take in consideration meaning two parts of a dispute. To avoid any conflicts it's better do make two independent calls. Based on the information a resolver tries to solve a dispute. The goal is not to decide who is right but to find a suitable solution for both parts.

### Duspute resolution between community members

In a community it's hard to 'hold' payment for a service, if payment is already performed. The real instrument to enforce better communication is reputation. Thus if part 1 offered some services to part 2 and part 2 won't pay we don't really have an intrument to enforce the payment.

What we can do is adjusting reputation in case of conflicts.

#### Form of resolution

Locked balance is unlocked for specific part.

### Dispute resulution between comunity member and a service provider


#### Form of resolution

Example: A commutiony memner doesn't agree with validation of his EN writing skills. (negative outcome)

Final decision to confirm or not to confirm EN writing skills.

## Court system

### Обзор судебной системы 

В настоящее время все больше традиционных процессов уходит в онлайн. Наверное осталось небольшое количество не оцифрованных процессов. 
С появлением технологии блокчейн мы можем быть на 100% уверенными в существовании определённых событий во времени, что подкрепляется неопровержимыми доказательствами, хранящимися в распределённой реестре. 
Набравшие популярность технологии proof-of-stake позволяют значительно сократить стоимость записи и хранения блоков в цепочке, делая доступным технологию для массового внедрения в широкие области жизнедеятельности. 
Одной из областей, к которой мы хотим обратиться - это решение споров. 
Почему люди не перестанут спорить? Если мы рассмотрим человека как класс, то увидим, что у класса есть определённый набор биологических, социальных, психологических и множества других свойств. Каждый экземпляр класса, то есть каждый человек, обладает индивидуальными значениями этих свойств, и эти значения постоянно мутируют во времени, во взаимодействии с другими людьми, средствами получения информации и еще множество условий. 
Поэтому взгляды людей на одни и те же вещи, события или процессы могут обьективно координально отличаться. 
Есть ещё один важный для нас аспект человеческой природы - это человеческое Эго и одно из главных его проявлений - Эгу крайне необходимо быть правым и доказывать свою правоту любыми доступными способами и любой ценой, даже самой высшей ценой -  своей жизнью. 

### Что с этим делать?

При невозможности договориться стороны могут выбрать систему разрешения их спора, которой будут доверять.
В этом случае вердикт, вынесенный судебной системой будет принят Эго с минимальной критикой.
Важные триггеры доверия к системе:
-	Невозможность одной из сторон прямо или косвенно влиять на процесс принятия решения.
-	 Соответствие решения с действующими законами,  соглашениями и принципами, принятыми обеими сторонами. 
-	Отсутствие заинтересованности. 
-	Прозрачность всех процессов.
-	Минимизация человеческих ошибок при принятии решения.

### Роль судьи

На роль судьи будут приниматься участники сообщества, отвечающие следующим критериям:
-	положительный рейтинг;
-	застейканные активы;
-	прошедшие тесты на знание законов и принципов сообщества и ставшие экзаменационные тестовые судебные задания.

В дальнейшем можно внедрить институт судейства, в котором сначала участник становится претендентом, решает параллельно судебные кейсы и набирает баллы для того чтобы стать судьёй.

### Механизм принятия решений.

Судье приходит запрос, что система рандомным образом выбрала его в роли судьи. Судья принимает запрос и ему становятся доступны материалы дела. Иск одной из сторон и доводы другой стороны, также доступны доказательства каждой из сторон, в том числе показания свидетелей, зарегистрированных в системе.

Судья, руководствуясь действующими в сообществе нормами и законами принимает решение акцептуя один из доступных вариантов: удовлетворить иск, удовлетворить частично, отказать.

Для минимизации вероятности человеческой ошибки решение принимается параллельно несколькими судьями, нечетным числом.
Судьям не видны решения, других судей по этому кейсу.

### Флоу судебного дела

1.	Участник создаёт кейс, выбирая отрасль, предмет спора, размер искового требования при наличии.
2.	Описывает подробно ситуацию.
3.	Прикрепляется данные опонента (опонентов). 
4.	Прикрепляет ссылки на доказательства в ipfs.  
5.	Прикрепляет данные свидетелей в системе.
6.	После отправки кейса, система рассылает запросы свидетелям и оппонентам.
7.	Далее у свидетелей и оппонентов есть доступ к материалам кейса и время на то чтобы описать свою версию дела и прикрепить доказательства. Конкретные сроки прохождения процессов на усмотрение сообщества, но подразумевают присутствие здравого смысла.
8.	После  сбора необходимых доказательств и прошествии срока. Кейс прикрепляется к рандомно выбранным судьям.
9.	Судьи, в течение определённого сообществом времени, на основании законов сообщества и изложенных материалов, принимают решения по делу.
10.	Окончательное решение по делу определяется автоматически на основании большинства решений судей.
11.	Один из участников дела может подать в апеляцию
12.	В таком случае процесс повторяется в п.8-10.
13.	В случае идентичного решения апелляции решение автоматически утверждается.
14.	При противоположном решении апелляции процесс повторяется в третьем составе судей. Решение третьего состава считается окончательным.
15. Иерархия законов  
Решения судей не должны противоречить законам сообщества, а только расширять его свойства, не переопределяя его суть.
Сообщество формирует законы самостоятельно как пенсорс систему.
Голосует за принятие тех или иных поправок и новых законов.
Судебные решения, при изменении законов не изменяются.


# Safety, anti-fraud

<span style="color:red">
	attack resistance?
</span>

## Proof of Commission

<span style="color:red">
	MOVE FROM MIRO, KIR
</span>

Proof of Commission principle (in P2P reputation systems): in order to earn 1 unit of reputation, you need to spend 1 USD in the form of commission and get a positive score as a result of paid P2P interaction.

This principle does not define the recipient of the commission - it can be a community fund, a reserve pool, a service commission. However, the commission payer cannot be the sole and direct beneficiary of that commission.

This principle is necessary to avoid reputation bumping (cheating).

## Different usecases

<span style="color:red">
	TODO💤
</span>

# Macroeconomic parameters and mechanics to manage rep system

<span style="color:red">
	how to check, monitor, rule, manage rep system, what leverages do we have, etc 🔥(bits in overview)
</span>

## Behaviors to be encouraged

<span style="color:red">
	TODO: ???
</span>

## Configurator

<span style="color:red">
	TODO: ???
</span>

## Protocol parameters affecting behavior patterns

### Client of a new worker will get additional +rep

<span style="color:red">
	TODO: ???
</span>

### Community-scoped parameters

<span style="color:red">
	TODO: ???
</span>

## What can protocol or communities do by adjusting the parameters

<span style="color:red">
	TODO: ???
</span>

# Tech

<span style="color:red">
	(Dima, Kirill)
</span>

## Architecture

<span style="color:red">
	(Dima, Kirill)
</span>

## Interfaces

<span style="color:red">
	(Dima, Kirill)
</span>

## EIP-2535

<span style="color:red">
	(Dima, Kirill)
</span>

# Some content

## P2P Guarantors

**P2P Guarantor** – член сообщества с достаточно высокой репутацией, который может гарантировать качество  взаимодействий с другим членом сообщества – новым или с малым количеством репутации – в обмен на часть прибыли.

Guarantor отвечает своей репутацией за поручаемого на весь срок предоставляемой гарантии. В случае, если получивший гарантию получает низкие оценки, это уменьшает репутацию гарантора. В случае положительных оценок – повышает. Скорость повышения и понижения репутации давшего гарантию регулируется устанавливаемыми коэффициентами и является одним из инструмента тюнинга макроэкономики репутации.

**Main scenario –** решить проблему, когда новый участник сообщества совсем не имеет репутации и из-за этого ему может быть очень сложно получить первые заказы и проявить себя

**Side Scenarios**

1. Менеджер аутстафф команды ручается за качество всех членов команды
2. Высококлассный известный эксперт проводит аудит компетенций исполнителя и ручается за него в случае успешного тестирования
3. Преподаватель курсов ручается за своих учеников – исполнителей на платформе, и помогает им в случае проблем успешно выполнять задания
4. Профессиональные гаранторы – члены сообщества, которые умеют хорошо определять квалификации и прогнозировать качество предоставляемых услуг исполнителем. Возможно, помогают с самыми сложными случаями для избежания отрицательных оценок.

**How it works**

Рассмотрим на примере основного сценария.

**Background**. Существует некоторое сообщество S с репутационной системой R, в котором научные эксперты оказывают друг другу консультации на платной основе. Есть уважаемый член сообщества с высокой репутацией (20K) по имени A. Есть новый член сообщества – B, который тоже является высококлассным специалистом, однако на платформе только зарегистрировался и его репутация – 0. A и B хорошо знакомы.

1. B просит A выступить его гарантором, и A соглашается.
2. A с помощью UI вызывает метод в R: R.guarantee(

## Protection against artificial sway/attack of lowering the profile?

**Case:** в сети регистрируется 10 пользователей, создают заказы на $1 и их все выполняет пользователь Х. За это он получает от всех высокую оценку.

**Case:** пользователь получает порцию единичек подряд – организованная атака на профиль.

Если пользователь получает аномальную оценку (ниже половины текущей усредненной репутации), оценка замораживается, пользователь ставится на карантин.

Если диспут не был открыт ни одной из сторон, оценка отбрасывается.

## Handling abnormal scores

### A client is offended by life and gives the worker a minimal rate. Dispute is not open.

If the worker receives a low score, it is quarantined. This is a mode of the score in which it is not displayed and is not accounted in the worker's overall rating (displayed by UI).

If the next 5 scores are higher than the average reputation of the user, the “bad” score is discarded – implying that participants "did not match".

If a score *lower than the average* (?) comes among the next 5 scores, the low score gets accounted. In this case (*in both cases?*), the abnormal score can be disputed.

**The problem being solved** is “spoiling” one’s rating due to miscommunication.

**An adjacent case**: a user with low rating (a not-so-decent community member) gets an abnormally high score (is that a favor or a real improvement?). It also gets quarantined and is applied if the next scores “confirm” it. Note: a dispute is unlikely in this case as both sides are not interested in it.

**Procedure details**

User A has a high rating: their scores are usually in the range 90-100 (with 100 being maximum).

ПользовательВ, исходя из своих рабочих/политических/религиозных/личных соображений, ставит ПользА оценку в 10%.

Поскольку, усредненная оценка для А = 100+90 / 2 = 95%, пороговым значением допустимой оценки будет 42%.

Т.к. 10<42, считаем, что оценка аномальная. Ставим ее "на карандаш".

Начинаем наблюдать 5 последующих оценок. В случае, если последующие оценки выше (100+90-10) / 3 = 60%, считаем, что низкая оценка была аномальной – отбрасываем ее из истории и снимаем пользователя с карантина.

В данном случае, пороговое значение допустимой оценки увеличилось – дополнительный стимул ПользователюА.

Если пользовательА, в режиме наблюдения, получает оценку ниже (100+90-10) / 3 = 60%, считаем, что оценка от ПользователяВ могла быть заслуженной - включаем в общую статистику.

**Early withdrawal from observation**

ПользовательА может открыть DisputeResolution.

Если спор решается в сторону А, оценка отбрасывается.

Если спор в пользу В, низкая оценка А засчитывается моментально. Режим наблюдения прекращается.

### Пользователь обижен на жизнь и ставит исполнителю 1. Открыт диспут

Пользователь ставит исполнителю низкий балл и открывает диспут.

Далее есть 3 варианта развития событий:

- исполнитель признается виноватым. Оценка попадает в репутацию исполнителя.

- диспут решается в сторону исполнителя. Оценка не учитывается в репутации, либо ставится высокая оценка (по решению арбитра)

- стороны идет на мировую - считаем, что репутация исполнителя и заказчика не страдает - оба получают пятерки (выгодно идти на мировую)

### Исполнитель сознательно факапит заказ. Диспут резолюшн.

Если исполнитель открыто уходит от выполнения заказа, арбитр признает диспут в пользу заказчика. Исполнителю ставится низкая оценка в репутацию.

Исполнитель не может брать заказы в течение недели.

### Исполнитель испортился по жизни. Стал забивать на все. Депрессия.

В таком сценарии, репутация пользователя стремится к 0. Другие пользователи видят низкую репутацию и не соглашаются рисковать. Единственный способ исправить репутацию - браться за "дешевые" заказы, где заказчики готовы рискнуть и поработать с ненадежным исполнителем.

### 5. Соотношение стоимости заказа и полученной репутации.

Очень важное – соотношение стоимости заказа и репутации, которую получает исполнитель. Идея в том, что чем выше стоимость заказа, тем выше риск за неисполнение обязательств. Высокий риск должен вести к высокому вознаграждению.

Вместе с тем, понятно, что клиент с "дорогим" заказом не пойдет ха помощью к человеку с низкой репутацией.

Так мы получаем две лиги: "высшую" и "премьер".

Высшая лига, где пользователю предлагаются дорогие заказы. За исполнение заказов, пользователь получает высокую репутацию и, вместе с тем, за проваленный заказ пользователь будет жестко наказан.

"Премьер" лига – нижний сегмент – пользователи с невысокой репутации получают предложения на невысокую стоимость. Получается, что требуется время и усилие, чтобы добраться до высшей лиги.

Профит в том, что, при таком подходе, репутация складывается не из одного дорого проекта, а из множества выполненных проектов поменьше

