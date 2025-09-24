import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from './blockchain';

// ABI for AgriChainMarketplace contract
const MARKETPLACE_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "listingId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "buyProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "listingId",
        "type": "uint256"
      }
    ],
    "name": "listings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "listingId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "remainingQuantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "expiryTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "listingId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "supplier",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalPrice",
        "type": "uint256"
      }
    ],
    "name": "ProductSold",
    "type": "event"
  }
];

// ABI for AgriChainToken contract
const TOKEN_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

/**
 * Buy a product from the marketplace
 * @param listingId - The listing ID to buy from
 * @param quantity - Quantity to buy
 * @param userAddress - Buyer's wallet address
 * @returns Transaction hash
 */
export async function buyProduct(
  listingId: number,
  quantity: number,
  userAddress: string
): Promise<string> {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    console.log('🛒 Starting buy product process...');
    console.log('Listing ID:', listingId);
    console.log('Quantity:', quantity);
    console.log('User address:', userAddress);

    // Get provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    
    console.log('Current network chain ID:', network.chainId.toString());
    console.log('Expected chain ID: 97 (BSC Testnet)');

    // Check if we're on the correct network
    if (network.chainId !== BigInt(97)) {
      throw new Error('Please switch to BSC Testnet');
    }

    // Get marketplace contract
    const marketplaceContract = new ethers.Contract(
      BLOCKCHAIN_CONFIG.MARKETPLACE_ADDRESS,
      MARKETPLACE_ABI,
      signer
    );

    // Get token contract
    const tokenContract = new ethers.Contract(
      BLOCKCHAIN_CONFIG.TOKEN_ADDRESS,
      TOKEN_ABI,
      signer
    );

    // Get listing details
    console.log('📋 Getting listing details...');
    const listing = await marketplaceContract.listings(listingId);
    console.log('Listing details:', {
      listingId: listing[0].toString(),
      tokenId: listing[1].toString(),
      supplier: listing[2],
      price: listing[3].toString(),
      quantity: listing[4].toString(),
      remainingQuantity: listing[5].toString(),
      expiryTime: listing[6].toString(),
      isActive: listing[7]
    });

    // Check if listing exists and is active
    if (!listing[7]) {
      throw new Error(`Listing ${listingId} does not exist or is not active`);
    }

    // Check if listing is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (Number(listing[6]) < currentTime) {
      throw new Error(`Listing ${listingId} has expired`);
    }

    // Check if there's enough quantity
    if (BigInt(listing[5]) < BigInt(quantity)) {
      throw new Error(`Insufficient quantity. Available: ${listing[5]}, Requested: ${quantity}`);
    }

    // Calculate total price
    const totalPrice = listing[3] * BigInt(quantity);
    console.log('💰 Total price:', totalPrice.toString());

    // Check buyer's token balance
    const buyerBalance = await tokenContract.balanceOf(userAddress);
    console.log('💳 Buyer balance:', buyerBalance.toString());
    
    if (buyerBalance < totalPrice) {
      throw new Error(`Insufficient token balance. You have ${ethers.formatEther(buyerBalance)} tokens, need ${ethers.formatEther(totalPrice)} tokens`);
    }

    // Approve tokens for marketplace
    console.log('✅ Approving tokens for marketplace...');
    const approveTx = await tokenContract.approve(BLOCKCHAIN_CONFIG.MARKETPLACE_ADDRESS, totalPrice);
    await approveTx.wait();
    console.log('✅ Tokens approved');

    // Buy product
    console.log('🛒 Buying product...');
    const buyTx = await marketplaceContract.buyProduct(listingId, quantity);
    console.log('📝 Buy transaction sent:', buyTx.hash);

    // Wait for transaction confirmation
    const receipt = await buyTx.wait();
    console.log('✅ Buy transaction confirmed:', receipt.hash);

    // Check for ProductSold event
    const event = receipt.logs.find((log: any) => {
      try {
        const parsed = marketplaceContract.interface.parseLog(log);
        return parsed?.name === 'ProductSold';
      } catch {
        return false;
      }
    });

    if (event) {
      const parsedEvent = marketplaceContract.interface.parseLog(event);
      console.log('🎉 ProductSold event:', parsedEvent?.args);
    }

    return receipt.hash;

  } catch (error) {
    console.error('❌ Error buying product:', error);
    throw error;
  }
}

/**
 * Get listing details from marketplace
 * @param listingId - The listing ID
 * @returns Listing details
 */
export async function getListingDetails(listingId: number) {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const marketplaceContract = new ethers.Contract(
      BLOCKCHAIN_CONFIG.MARKETPLACE_ADDRESS,
      MARKETPLACE_ABI,
      provider
    );

    const listing = await marketplaceContract.listings(listingId);
    
    return {
      listingId: listing[0].toString(),
      tokenId: listing[1].toString(),
      supplier: listing[2],
      price: listing[3].toString(),
      quantity: listing[4].toString(),
      remainingQuantity: listing[5].toString(),
      expiryTime: listing[6].toString(),
      isActive: listing[7]
    };
  } catch (error) {
    console.error('❌ Error getting listing details:', error);
    throw error;
  }
}

/**
 * Find active listing ID by token ID
 * @param tokenId - The NFT token ID
 * @returns Active listing ID or null if not found
 */
export async function findListingIdByTokenId(tokenId: number): Promise<number | null> {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    console.log('🔍 Searching for listing with token ID:', tokenId);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const marketplaceContract = new ethers.Contract(
      BLOCKCHAIN_CONFIG.MARKETPLACE_ADDRESS,
      MARKETPLACE_ABI,
      provider
    );

    // Search through listings (assuming max 100 listings for now)
    for (let listingId = 1; listingId <= 100; listingId++) {
      try {
        const listing = await marketplaceContract.listings(listingId);
        
        // Check if this listing matches our token ID and is active
        if (listing[1].toString() === tokenId.toString() && listing[7] === true) {
          console.log('✅ Found active listing:', {
            listingId,
            tokenId: listing[1].toString(),
            isActive: listing[7],
            price: listing[3].toString(),
            remainingQuantity: listing[5].toString()
          });
          return listingId;
        }
      } catch (error) {
        // Listing doesn't exist, continue searching
        continue;
      }
    }

    console.log('❌ No active listing found for token ID:', tokenId);
    return null;
  } catch (error) {
    console.error('❌ Error finding listing by token ID:', error);
    throw error;
  }
}
