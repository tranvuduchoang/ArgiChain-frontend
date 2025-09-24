import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from './blockchain';

// ABI for AgriChainMarketplace contract
const MARKETPLACE_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
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
        "name": "expiryTime",
        "type": "uint256"
      }
    ],
    "name": "listProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "supplier",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
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
        "name": "expiryTime",
        "type": "uint256"
      }
    ],
    "name": "ProductListed",
    "type": "event"
  }
];

// ABI for AgriChainNFT contract
const NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

/**
 * Automatically create listing for minted NFT
 * @param tokenId - The NFT token ID
 * @param price - Price per unit in wei
 * @param quantity - Quantity to list
 * @param expiryDays - Expiry time in days (default: 30)
 * @param userAddress - Supplier's wallet address
 * @returns Listing ID and transaction hash
 */
export async function createAutoListing(
  tokenId: number,
  price: string,
  quantity: number,
  expiryDays: number = 30,
  userAddress: string
): Promise<{ listingId: number; transactionHash: string }> {
  try {
    console.log('🏪 Starting auto listing creation...');
    console.log('Token ID:', tokenId);
    console.log('Price:', price);
    console.log('Quantity:', quantity);
    console.log('Expiry days:', expiryDays);
    console.log('User address:', userAddress);

    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

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

    // Get contracts
    const marketplaceContract = new ethers.Contract(
      BLOCKCHAIN_CONFIG.MARKETPLACE_ADDRESS,
      MARKETPLACE_ABI,
      signer
    );

    const nftContractForApproval = new ethers.Contract(
      BLOCKCHAIN_CONFIG.NFT_ADDRESS,
      NFT_ABI,
      signer
    );

    // Step 1: Approve marketplace to transfer NFTs
    console.log('🔐 Approving marketplace for NFT transfers...');
    const approveTx = await nftContractForApproval.setApprovalForAll(BLOCKCHAIN_CONFIG.MARKETPLACE_ADDRESS, true);
    await approveTx.wait();
    console.log('✅ Marketplace approved for NFT transfers');

    // Step 2: Verify NFT balance before creating listing
    console.log('🔍 Verifying NFT balance...');
    const nftContractForBalance = new ethers.Contract(
      BLOCKCHAIN_CONFIG.NFT_ADDRESS,
      [
        "function balanceOf(address account, uint256 id) external view returns (uint256)"
      ],
      provider
    );
    
    const nftBalance = await nftContractForBalance.balanceOf(userAddress, tokenId);
    console.log('NFT balance for token ID', tokenId, ':', nftBalance.toString());
    
    if (nftBalance < BigInt(quantity)) {
      throw new Error(`Insufficient NFT balance. You have ${nftBalance.toString()} NFTs, trying to list ${quantity}`);
    }

    // Step 3: Create listing
    console.log('📝 Creating listing...');
    const priceInWei = ethers.parseEther(price);
    const expiryTime = Math.floor(Date.now() / 1000) + (expiryDays * 24 * 60 * 60);
    
    console.log('Listing parameters:', {
      tokenId,
      price: price,
      priceInWei: priceInWei.toString(),
      quantity,
      expiryTime,
      expiryDate: new Date(expiryTime * 1000).toISOString()
    });
    
    const listTx = await marketplaceContract.listProduct(
      tokenId,
      priceInWei,
      quantity,
      expiryTime
    );

    console.log('📝 Listing transaction sent:', listTx.hash);

    // Wait for transaction confirmation
    const receipt = await listTx.wait();
    console.log('✅ Listing transaction confirmed:', receipt.hash);

    // Get listing ID from event
    const event = receipt.logs.find((log: any) => {
      try {
        const parsed = marketplaceContract.interface.parseLog(log);
        return parsed?.name === 'ProductListed';
      } catch {
        return false;
      }
    });

    if (!event) {
      throw new Error('ProductListed event not found in transaction receipt');
    }

    const parsedEvent = marketplaceContract.interface.parseLog(event);
    const listingId = Number(parsedEvent?.args[0]);
    
    console.log('🎉 Listing created successfully!');
    console.log('Listing ID:', listingId);
    console.log('Token ID:', parsedEvent?.args[1].toString());
    console.log('Price:', ethers.formatEther(parsedEvent?.args[3]), 'AGRI');
    console.log('Quantity:', parsedEvent?.args[4].toString());
    console.log('Expiry:', new Date(Number(parsedEvent?.args[5]) * 1000).toISOString());

    return {
      listingId,
      transactionHash: receipt.hash
    };

  } catch (error) {
    console.error('❌ Error creating auto listing:', error);
    throw error;
  }
}

/**
 * Check if marketplace is approved to transfer NFTs
 * @param userAddress - User's wallet address
 * @returns True if approved
 */
export async function isMarketplaceApproved(userAddress: string): Promise<boolean> {
  try {
    if (typeof window.ethereum === 'undefined') {
      return false;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const nftContract = new ethers.Contract(
      BLOCKCHAIN_CONFIG.NFT_ADDRESS,
      [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
      provider
    );

    const isApproved = await nftContract.isApprovedForAll(
      userAddress,
      BLOCKCHAIN_CONFIG.MARKETPLACE_ADDRESS
    );

    return isApproved;
  } catch (error) {
    console.error('Error checking marketplace approval:', error);
    return false;
  }
}
