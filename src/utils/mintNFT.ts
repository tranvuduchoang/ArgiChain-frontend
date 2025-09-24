import { ethers } from 'ethers';

// ABI for AgriChainNFT contract
const AGRICHAIN_NFT_ABI = [
  "function mintProductNFT(uint256 amount, string memory name, string memory description, string memory category, uint256 price, uint256 quantity, string memory unit, bool isOrganic, uint256 harvestDate, string memory location, string memory metadata) external",
  "function isAuthorizedSupplier(address supplier) external view returns (bool)",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
  "event ProductNFTMinted(uint256 indexed tokenId, address indexed supplier, uint256 amount, string productName, string metadata)"
];

// Contract address (will be updated after deployment)
const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_AGRICHAIN_NFT_ADDRESS || '0x739ECFc4a3C66e1E0b14B4581C5dA3341586a4E4';

/**
 * Mint NFT from user's wallet (user signs the transaction)
 */
export async function mintProductNFT(
  contractAddress: string,
  userAddress: string,
  amount: number,
  name: string,
  description: string,
  category: string,
  price: number,
  quantity: number,
  unit: string,
  isOrganic: boolean,
  harvestDate: number,
  location: string,
  metadata: string
): Promise<string> {
  try {
    console.log('🎨 Starting NFT mint process...');
    console.log('User address:', userAddress);
    console.log('Amount:', amount);
    console.log('Name:', name);

    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }

    // Get provider and signer from MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const currentUser = await signer.getAddress();

    console.log('Current user from MetaMask:', currentUser);
    console.log('Target user address:', userAddress);

    // Verify the connected user matches the target user
    if (currentUser.toLowerCase() !== userAddress.toLowerCase()) {
      throw new Error('Connected wallet does not match the target user address');
    }

    // Get contract instance
    const nftContract = new ethers.Contract(contractAddress, AGRICHAIN_NFT_ABI, signer);

    // Check if user is authorized supplier
    const isAuthorized = await nftContract.isAuthorizedSupplier(userAddress);
    console.log('Is authorized supplier:', isAuthorized);

    if (!isAuthorized) {
      throw new Error('User is not an authorized supplier. Please contact admin to authorize your wallet.');
    }

    // Convert price to wei (assuming 18 decimals)
    const priceInWei = ethers.parseEther(price.toString());
    console.log('Price in wei:', priceInWei.toString());

    // Mint NFT
    const tx = await nftContract.mintProductNFT(
      amount,
      name,
      description,
      category,
      priceInWei,
      quantity,
      unit,
      isOrganic,
      harvestDate,
      location,
      metadata
    );

    console.log('Mint transaction sent:', tx.hash);

    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log('Mint transaction confirmed:', receipt.hash);
    console.log('Receipt object:', receipt);

    // Ensure we return the hash
    const hash = receipt.hash;
    console.log('Returning hash:', hash);
    
    if (!hash) {
      throw new Error('Transaction hash is undefined in receipt');
    }

    return hash;

  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}

/**
 * Check if user is authorized supplier
 */
export async function checkSupplierAuthorization(
  userAddress: string,
  contractAddress: string
): Promise<boolean> {
  try {
    if (typeof window.ethereum === 'undefined') {
      console.log('❌ MetaMask not installed');
      return false;
    }

    console.log('🔍 Checking supplier authorization...');
    console.log('User address:', userAddress);
    console.log('Contract address:', contractAddress);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Check network
    const network = await provider.getNetwork();
    console.log('Current network chain ID:', network.chainId.toString());
    console.log('Expected chain ID: 97 (BSC Testnet)');
    
    // Check if contract exists
    const code = await provider.getCode(contractAddress);
    console.log('Contract code length:', code.length);
    console.log('Contract exists:', code !== "0x");
    
    if (code === "0x") {
      console.log('❌ Contract does not exist at this address!');
      return false;
    }

    const nftContract = new ethers.Contract(contractAddress, AGRICHAIN_NFT_ABI, signer);

    const isAuthorized = await nftContract.isAuthorizedSupplier(userAddress);
    console.log('✅ Is authorized supplier:', isAuthorized);
    return isAuthorized;
  } catch (error) {
    console.error('❌ Error checking supplier authorization:', error);
    return false;
  }
}
