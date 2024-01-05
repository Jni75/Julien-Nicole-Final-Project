# DevHub by Jni

## Move Package

Use SuiBase to install the development environment https://suibase.io/how-to/install.html#requirements

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

Test the package: 

    cd SuiDevHub
    dsui move test

Publish the package: 

    cd SuiDevHub
    dsui client publish --gas-budget 2000000000 .

## Frontend

### Installation

Install node modules: 

    cd SuiDevHubFrontEnd
    npm i

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

### Start

Start the project:

    cd SuiDevHubFrontEnd
    npm run dev

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