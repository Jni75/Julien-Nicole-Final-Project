# DevHub by Jni

Welcome to the **DevHub DApp By Jni** project repository! This decentralized application (DApp) leverages blockchain technology to implement an devhub platform on the Sui network. Developers can add their contact details so that recruiters can contact them.

## Table of Contents

- [DevHub by Jni](#devhub-by-jni)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Smart Contracts](#smart-contracts)
  - [Frontend](#frontend)
    - [Configuration](#configuration)
    - [Presentation](#presentation)
      - [Show all developers card](#show-all-developers-card)
      - [Add card](#add-card)
      - [Edit card](#edit-card)
  - [Known Issues](#known-issues)

## Overview

The **DevHub DApp By Jni** provides a user-friendly interface to help recruiters find developers.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

1. Node.js: Ensure Node.js is installed. Download it from [nodejs.org](https://nodejs.org/).
2. Sui: Ensure Sui is installed. Download it from [Suibase.io](https://suibase.io/how-to/install.html)

### Installation

1. Clone the repository:

```bash
  git clone https://github.com/Jni75/Julien-Nicole-Final-Project.git
```

2. Navigate to the project directory:

```bash
  cd SuiDevHubFrontEnd
```

3. Install required npm packages:

```bash
 npm install
```

## Usage

1. Publish the package if devnet has been reset (see [Smart Contracts](#smart-contracts))

2. Start the development server:

```bash
 npm run dev
```

3. Open your web browser and navigate to `http://localhost:5000` to access the DApp.

4. Connect your SUI wallet to the DApp.

5. Browse developer list, add card, and edit your contact details.
   
## Smart Contracts

Start the devnet server: 

    devnet start

Retrieve the local address: 

    dsui client active-address

Show gas balance: 

    dsui client gas

Get some coin if needed

Build the package: 

    cd SuiDevHub
    dsui move build

![Move build](/assets/move-build.png "Move build")

Test the package: 

    cd SuiDevHub
    dsui move test

![Move test](/assets/move-test.png "Move test")

Publish the package: 

    cd SuiDevHub
    dsui client publish --gas-budget 2000000000 .

## Frontend

### Configuration

Edit package.json file to change the default port (5000):

```json
  "scripts": {
    "dev": "next dev -p 5000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
```

Set CONTRACT_ADDRESS, DEVHUB_ADDRESS & DEVHUB_OBJECT_TABLE_ADDRESS in constants.ts file:

```typescript
/**
 * Package address
 */
export const CONTRACT_ADDRESS = "0x3f6010f62157e688d5d4658e52837a10b80bffcf954a2057474d6624e9bd8246"

/**
 * DevHub address
 */
export const DEVHUB_ADDRESS = "0xe440ba4fc8d2478f012f795b3b8aaa440e97ab266418a3bd7d19774f8bf4dbba"

/**
 * DevHub Object Table address
 */
export const DEVHUB_OBJECT_TABLE_ADDRESS = "0x4f6f1da230c5b26e8b31d8392b4505476b7fc0eea73065aa6f0a903feb09b1b0"

export const NETWORK = 'devnet'
```

### Presentation

#### Show all developers card

![Front end](/assets/frontend.png "Front end")

#### Add card
User must connect a wallet to add a card

![Add card](/assets/add-card.png "Add card")

#### Edit card

Owner can edit his cards

![Edit card](/assets/edit-card.png "Edit card")

## Known Issues

- Automatic connection to Wallet does not work on NextJs due to use of localStorage
- Web socket limitation: implementation should be server-side