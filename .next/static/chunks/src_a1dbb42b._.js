(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/mintNFT.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "checkSupplierAuthorization": ()=>checkSupplierAuthorization,
    "mintProductNFT": ()=>mintProductNFT
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
;
// ABI for AgriChainNFT contract
const AGRICHAIN_NFT_ABI = [
    "function mintProductNFT(uint256 amount, string memory name, string memory description, string memory category, uint256 price, uint256 quantity, string memory unit, bool isOrganic, uint256 harvestDate, string memory location, string memory metadata) external",
    "function isAuthorizedSupplier(address supplier) external view returns (bool)",
    "function balanceOf(address account, uint256 id) external view returns (uint256)",
    "event ProductNFTMinted(uint256 indexed tokenId, address indexed supplier, uint256 amount, string productName, string metadata)"
];
// Contract address (will be updated after deployment)
const NFT_CONTRACT_ADDRESS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_AGRICHAIN_NFT_ADDRESS || '0x739ECFc4a3C66e1E0b14B4581C5dA3341586a4E4';
async function mintProductNFT(contractAddress, userAddress, amount, name, description, category, price, quantity, unit, isOrganic, harvestDate, location, metadata) {
    try {
        console.log('🎨 Starting NFT mint process...');
        console.log('User address:', userAddress);
        console.log('Amount:', amount);
        console.log('Name:', name);
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        // Get provider and signer from MetaMask
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const currentUser = await signer.getAddress();
        console.log('Current user from MetaMask:', currentUser);
        console.log('Target user address:', userAddress);
        // Verify the connected user matches the target user
        if (currentUser.toLowerCase() !== userAddress.toLowerCase()) {
            throw new Error('Connected wallet does not match the target user address');
        }
        // Get contract instance
        const nftContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(contractAddress, AGRICHAIN_NFT_ABI, signer);
        // Check if user is authorized supplier
        const isAuthorized = await nftContract.isAuthorizedSupplier(userAddress);
        console.log('Is authorized supplier:', isAuthorized);
        if (!isAuthorized) {
            throw new Error('User is not an authorized supplier. Please contact admin to authorize your wallet.');
        }
        // Convert price to wei (assuming 18 decimals)
        const priceInWei = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseEther(price.toString());
        console.log('Price in wei:', priceInWei.toString());
        // Mint NFT
        const tx = await nftContract.mintProductNFT(amount, name, description, category, priceInWei, quantity, unit, isOrganic, harvestDate, location, metadata);
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
async function checkSupplierAuthorization(userAddress, contractAddress) {
    try {
        if (typeof window.ethereum === 'undefined') {
            console.log('❌ MetaMask not installed');
            return false;
        }
        console.log('🔍 Checking supplier authorization...');
        console.log('User address:', userAddress);
        console.log('Contract address:', contractAddress);
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
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
        const nftContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(contractAddress, AGRICHAIN_NFT_ABI, signer);
        const isAuthorized = await nftContract.isAuthorizedSupplier(userAddress);
        console.log('✅ Is authorized supplier:', isAuthorized);
        return isAuthorized;
    } catch (error) {
        console.error('❌ Error checking supplier authorization:', error);
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/supplier/mint-nft/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/WalletContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTranslation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNetworkCurrency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useNetworkCurrency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/blockchain.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mintNFT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mintNFT.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
const MintNFTPageContent = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { account, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    const { currency } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNetworkCurrency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNetworkCurrency"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [supplierData, setSupplierData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mintData, setMintData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        quantity: 1,
        metadataUri: '',
        name: '',
        description: '',
        image: '',
        tokenId: 1,
        contractAddress: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKCHAIN_CONFIG"].NFT_ADDRESS,
        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKCHAIN_CONFIG"].CHAIN_ID
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MintNFTPageContent.useEffect": ()=>{
            if (!isConnected || !account) {
                router.push('/');
                return;
            }
            const productId = searchParams.get('productId');
            if (!productId) {
                router.push('/supplier/dashboard');
                return;
            }
            // Force switch to BSC Testnet
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["switchToBSC"])().catch(console.error);
            loadProductData(productId);
            checkSupplierStatus();
        }
    }["MintNFTPageContent.useEffect"], [
        isConnected,
        account,
        searchParams,
        router
    ]);
    const loadProductData = async (productId)=>{
        try {
            const response = await fetch("http://localhost:5000/api/products/".concat(productId));
            if (response.ok) {
                const productData = await response.json();
                setProduct(productData);
                setMintData((prev)=>{
                    var _productData_images;
                    return {
                        ...prev,
                        name: productData.name,
                        description: productData.description,
                        image: ((_productData_images = productData.images) === null || _productData_images === void 0 ? void 0 : _productData_images[0]) || ''
                    };
                });
            }
        } catch (error) {
            console.error('Error loading product:', error);
        }
    };
    const checkSupplierStatus = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/api/suppliers?walletAddress=".concat(account));
            if (response.ok) {
                const suppliers = await response.json();
                if (suppliers && suppliers.length > 0) {
                    setSupplierData(suppliers[0]);
                } else {
                    router.push('/createsupplier');
                }
            }
        } catch (error) {
            console.error('Error checking supplier status:', error);
        }
    };
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setMintData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleMintNFT = async (e)=>{
        e.preventDefault();
        if (!isConnected || !account || !product || !supplierData) {
            setError('Vui lòng kết nối ví và đảm bảo bạn là nhà cung cấp');
            return;
        }
        setLoading(true);
        setError('');
        try {
            // Step 1: Prepare mint parameters
            const prepareResponse = await fetch("http://localhost:5000/api/products/".concat(product.id, "/mint/prepare"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: parseInt(mintData.quantity.toString()),
                    metadataUri: mintData.metadataUri || "https://agrichain.com/metadata/".concat(product.id)
                })
            });
            if (!prepareResponse.ok) {
                const errorData = await prepareResponse.json();
                throw new Error(errorData.error || "".concat(t("common.error"), " khi chuẩn bị mint"));
            }
            const mintParams = await prepareResponse.json();
            // Update mintData with data from prepare response
            setMintData((prev)=>({
                    ...prev,
                    tokenId: mintParams.tokenId || 1,
                    contractAddress: mintParams.contractAddress || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKCHAIN_CONFIG"].NFT_ADDRESS,
                    chainId: mintParams.chainId || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKCHAIN_CONFIG"].CHAIN_ID
                }));
            // Step 2: Mint NFT on blockchain
            setSuccess('Đang mint NFT... Vui lòng chờ xác nhận giao dịch blockchain.');
            // Always use the latest contract address from blockchain config
            const contractAddress = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKCHAIN_CONFIG"].NFT_ADDRESS;
            console.log('Using contract address:', contractAddress);
            const tokenId = mintParams.tokenId || 1;
            const quantity = parseInt(mintData.quantity.toString());
            // Check if user is authorized supplier
            const isAuthorized = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mintNFT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkSupplierAuthorization"])(account, contractAddress);
            if (!isAuthorized) {
                throw new Error('Bạn chưa được ủy quyền để mint NFT. Vui lòng liên hệ admin để được ủy quyền.');
            }
            let transactionHash;
            try {
                // Call blockchain mint function using mintProductNFT
                transactionHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mintNFT$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mintProductNFT"])(contractAddress, account, quantity, mintData.name, mintData.description, product.category, product.pricePerUnit, product.totalSupply, product.unit, product.isOrganic || false, product.harvestDate ? new Date(product.harvestDate).getTime() / 1000 : Math.floor(Date.now() / 1000), product.location || 'Unknown', mintData.metadataUri || "https://agrichain.com/metadata/".concat(product.id));
                console.log('Transaction hash received:', transactionHash);
                if (!transactionHash) {
                    throw new Error('Transaction hash is undefined. Mint may have failed.');
                }
                setSuccess("Giao dịch đã được gửi! Hash: ".concat(transactionHash, ". Đang chờ xác nhận..."));
                // Wait for transaction confirmation
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitForTransaction"])(transactionHash, 1);
                setSuccess("NFT đã được mint thành công! Hash: ".concat(transactionHash));
            } catch (mintError) {
                console.error('Error during mint process:', mintError);
                throw new Error("Lỗi khi mint NFT: ".concat(mintError instanceof Error ? mintError.message : 'Unknown error'));
            }
            // Step 3: Confirm mint in backend
            const confirmResponse = await fetch("http://localhost:5000/api/products/".concat(product.id, "/mint/confirm"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenId: tokenId,
                    contractAddress: contractAddress,
                    transactionHash: transactionHash,
                    mintedQuantity: quantity,
                    chainId: mintParams.chainId || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLOCKCHAIN_CONFIG"].CHAIN_ID,
                    toAddress: account
                })
            });
            if (!confirmResponse.ok) {
                const errorData = await confirmResponse.json();
                throw new Error(errorData.error || "".concat(t("common.error"), " khi xác nhận mint"));
            }
            const result = await confirmResponse.json();
            const finalTxHash = result.transactionHash || transactionHash;
            setSuccess("Mint NFT thành công! Transaction hash: ".concat(finalTxHash));
            // Redirect to dashboard after 3 seconds
            setTimeout(()=>{
                router.push('/supplier/dashboard');
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : t("common.error"));
        } finally{
            setLoading(false);
        }
    };
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-gray-900 mb-4",
                        children: "Vui lòng kết nối ví"
                    }, void 0, false, {
                        fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6",
                        children: "Bạn cần kết nối ví để mint NFT"
                    }, void 0, false, {
                        fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push('/'),
                        className: "bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors",
                        children: "Về trang chủ"
                    }, void 0, false, {
                        fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                lineNumber: 228,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
            lineNumber: 227,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-gray-900 mb-4",
                    children: t("mintNFT.loading")
                }, void 0, false, {
                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                    lineNumber: 250,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                lineNumber: 249,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
            lineNumber: 248,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.back(),
                            className: "flex items-center text-gray-600 hover:text-gray-900 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 20,
                                    className: "mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Quay lại"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900 mb-2",
                            children: t("mintNFT.title")
                        }, void 0, false, {
                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                            lineNumber: 270,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: t("mintNFT.subtitle")
                        }, void 0, false, {
                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: -20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-gray-900 mb-4",
                                    children: t("mintNFT.productInfo")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: t("mintNFT.productName")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-900",
                                                    children: product.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Mô tả"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600",
                                                    children: product.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: "Giá"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: [
                                                                product.pricePerUnit,
                                                                " ",
                                                                product.currency
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 301,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: "Tổng số lượng"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-900",
                                                            children: [
                                                                product.totalSupply,
                                                                " ",
                                                                product.unit
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Danh mục"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-900",
                                                    children: product.category
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        product.tags && product.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Tags"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: product.tags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full",
                                                            children: tag
                                                        }, index, false, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 316,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            className: "bg-white rounded-lg shadow-md p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-gray-900 mb-4",
                                    children: t("mintNFT.title")
                                }, void 0, false, {
                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                    lineNumber: 336,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleMintNFT,
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                                            size: 16,
                                                            className: "inline mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        t("mintNFT.quantity"),
                                                        " *"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    name: "quantity",
                                                    value: mintData.quantity,
                                                    onChange: handleInputChange,
                                                    required: true,
                                                    min: "1",
                                                    max: product.totalSupply,
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mt-1",
                                                    children: [
                                                        "Tối đa: ",
                                                        product.totalSupply,
                                                        " NFT"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                            size: 16,
                                                            className: "inline mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Metadata URI (tùy chọn)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    name: "metadataUri",
                                                    value: mintData.metadataUri,
                                                    onChange: handleInputChange,
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                                                    placeholder: "https://agrichain.com/metadata/123"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "Tên NFT *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "name",
                                                    value: mintData.name,
                                                    onChange: handleInputChange,
                                                    required: true,
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "Mô tả NFT *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    name: "description",
                                                    value: mintData.description,
                                                    onChange: handleInputChange,
                                                    required: true,
                                                    rows: 3,
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                            size: 16,
                                                            className: "inline mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Hình ảnh NFT *"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    name: "image",
                                                    value: mintData.image,
                                                    onChange: handleInputChange,
                                                    required: true,
                                                    className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500",
                                                    placeholder: "https://example.com/nft-image.jpg"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 407,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 p-4 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-medium text-gray-900 mb-2",
                                                    children: "Chi phí mint"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 425,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-gray-900",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Gas fee (ước tính):"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                                    lineNumber: 428,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "0.001 ",
                                                                        currency
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                                    lineNumber: 429,
                                                                    columnNumber: 22
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 427,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between font-medium text-gray-900",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Tổng cộng:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                                    lineNumber: 432,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "0.001 ",
                                                                        currency
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 22
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                            lineNumber: 431,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 424,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 440,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            className: "bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md",
                                            children: success
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-end space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>router.back(),
                                                    className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors",
                                                    children: "Hủy"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: loading,
                                                    className: "px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors",
                                                    children: loading ? t("mintNFT.minting") : t("mintNFT.mint")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                            lineNumber: 460,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
            lineNumber: 260,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MintNFTPageContent, "xkBlcEfojV+0bqpiFoVNrLjLpXg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useNetworkCurrency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNetworkCurrency"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = MintNFTPageContent;
const MintNFTPage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
            lineNumber: 486,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MintNFTPageContent, {}, void 0, false, {
            fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
            lineNumber: 487,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/supplier/mint-nft/page.tsx",
        lineNumber: 486,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = MintNFTPage;
const __TURBOPACK__default__export__ = MintNFTPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "MintNFTPageContent");
__turbopack_context__.k.register(_c1, "MintNFTPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_a1dbb42b._.js.map