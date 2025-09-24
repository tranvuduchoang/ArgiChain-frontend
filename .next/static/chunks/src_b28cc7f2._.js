(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/blockchain.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Blockchain configuration for AgriChain
__turbopack_context__.s({
    "BLOCKCHAIN_CONFIG": ()=>BLOCKCHAIN_CONFIG,
    "connectWallet": ()=>connectWallet,
    "formatBalance": ()=>formatBalance,
    "getAccountBalance": ()=>getAccountBalance,
    "getCurrentAccount": ()=>getCurrentAccount,
    "getTransactionReceipt": ()=>getTransactionReceipt,
    "isWalletConnected": ()=>isWalletConnected,
    "mintNFT": ()=>mintNFT,
    "switchToBSC": ()=>switchToBSC,
    "waitForTransaction": ()=>waitForTransaction
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BLOCKCHAIN_CONFIG = {
    // BSC Testnet
    CHAIN_ID: 97,
    CHAIN_NAME: 'BSC Testnet',
    RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    EXPLORER_URL: 'https://testnet.bscscan.com',
    // Contract addresses (from .env)
    TOKEN_ADDRESS: (("TURBOPACK compile-time truthy", 1) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_AGRICHAIN_TOKEN_ADDRESS : "TURBOPACK unreachable") || '0x0a5123a377A87321975578ED3C8D3336eF67F28a',
    NFT_ADDRESS: (("TURBOPACK compile-time truthy", 1) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_AGRICHAIN_NFT_ADDRESS : "TURBOPACK unreachable") || '0x739ECFc4a3C66e1E0b14B4581C5dA3341586a4E4',
    MARKETPLACE_ADDRESS: (("TURBOPACK compile-time truthy", 1) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_AGRICHAIN_MARKETPLACE_ADDRESS : "TURBOPACK unreachable") || '0xf88559b87f94FF07c6c4297E7D04ab10573e9d62',
    // Network configuration
    NETWORK_CONFIG: {
        chainId: '0x61',
        chainName: 'BSC Testnet',
        nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18
        },
        rpcUrls: [
            'https://data-seed-prebsc-1-s1.binance.org:8545'
        ],
        blockExplorerUrls: [
            'https://testnet.bscscan.com'
        ]
    }
};
const connectWallet = async ()=>{
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            // Switch to BSC testnet
            await switchToBSC();
            return accounts[0];
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            throw error;
        }
    } else {
        throw new Error('MetaMask is not installed');
    }
};
const switchToBSC = async ()=>{
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
                {
                    chainId: BLOCKCHAIN_CONFIG.NETWORK_CONFIG.chainId
                }
            ]
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        BLOCKCHAIN_CONFIG.NETWORK_CONFIG
                    ]
                });
            } catch (addError) {
                console.error('Error adding BSC Testnet network:', addError);
                throw addError;
            }
        } else {
            throw switchError;
        }
    }
};
const isWalletConnected = async ()=>{
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });
        return accounts.length > 0;
    }
    return false;
};
const getCurrentAccount = async ()=>{
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });
        return accounts[0] || null;
    }
    return null;
};
const getAccountBalance = async (address)=>{
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Import ethers dynamically
            const { ethers } = await __turbopack_context__.r("[project]/node_modules/ethers/lib.esm/index.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
            // Get provider from MetaMask
            const provider = new ethers.BrowserProvider(window.ethereum);
            // Get balance
            const balance = await provider.getBalance(address);
            return balance.toString();
        } catch (error) {
            console.error('Error getting balance:', error);
            return '0';
        }
    }
    return '0';
};
const formatBalance = (balance)=>{
    try {
        // Manual calculation for now
        const wei = BigInt(balance);
        const bnb = Number(wei) / Math.pow(10, 18);
        return bnb.toFixed(4);
    } catch (error) {
        console.error('Error formatting balance:', error);
        return '0.0000';
    }
};
const mintNFT = async function(contractAddress, to, tokenId, quantity) {
    let data = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : '0x';
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
    }
    try {
        // Import ethers dynamically
        const { ethers } = await __turbopack_context__.r("[project]/node_modules/ethers/lib.esm/index.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
        // Get provider from MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        // Get contract ABI (simplified for ERC1155 mint)
        const contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "mint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        // Create contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        // Call mint function
        const tx = await contract.mint(to, tokenId, quantity, data, {
            gasLimit: 500000
        });
        return tx.hash;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
};
const getTransactionReceipt = async (txHash)=>{
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
    }
    try {
        // Import ethers dynamically
        const { ethers } = await __turbopack_context__.r("[project]/node_modules/ethers/lib.esm/index.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
        // Get provider from MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Get transaction receipt
        const receipt = await provider.getTransactionReceipt(txHash);
        return receipt;
    } catch (error) {
        console.error('Error getting transaction receipt:', error);
        throw error;
    }
};
const waitForTransaction = async function(txHash) {
    let confirmations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    try {
        // Import ethers dynamically
        const { ethers } = await __turbopack_context__.r("[project]/node_modules/ethers/lib.esm/index.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
        // Get provider from MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Wait for transaction confirmation
        const receipt = await provider.waitForTransaction(txHash, confirmations);
        if (receipt && receipt.status === 1) {
            return receipt;
        } else {
            throw new Error('Transaction failed');
        }
    } catch (error) {
        console.error('Error waiting for transaction:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/contexts/WalletContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WalletProvider": ()=>WalletProvider,
    "useWallet": ()=>useWallet
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/blockchain.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const WalletContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useWallet = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
_s(useWallet, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const WalletProvider = (param)=>{
    let { children } = param;
    _s1();
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('0');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Check wallet connection on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>{
            checkWalletConnection();
        }
    }["WalletProvider.useEffect"], []);
    // Listen for account changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletProvider.useEffect": ()=>{
            if (typeof window.ethereum !== 'undefined') {
                const handleAccountsChanged = {
                    "WalletProvider.useEffect.handleAccountsChanged": (accounts)=>{
                        if (accounts.length === 0) {
                            // User disconnected wallet
                            setIsConnected(false);
                            setAccount(null);
                            setBalance('0');
                        } else {
                            // User switched accounts
                            setAccount(accounts[0]);
                            updateBalance(accounts[0]);
                        }
                    }
                }["WalletProvider.useEffect.handleAccountsChanged"];
                const handleChainChanged = {
                    "WalletProvider.useEffect.handleChainChanged": ()=>{
                        // Reload page when chain changes
                        window.location.reload();
                    }
                }["WalletProvider.useEffect.handleChainChanged"];
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);
                return ({
                    "WalletProvider.useEffect": ()=>{
                        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                        window.ethereum.removeListener('chainChanged', handleChainChanged);
                    }
                })["WalletProvider.useEffect"];
            }
        }
    }["WalletProvider.useEffect"], []);
    const checkWalletConnection = async ()=>{
        try {
            const connected = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWalletConnected"])();
            if (connected) {
                const currentAccount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentAccount"])();
                if (currentAccount) {
                    setIsConnected(true);
                    setAccount(currentAccount);
                    await updateBalance(currentAccount);
                }
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    };
    const updateBalance = async (address)=>{
        try {
            const balanceWei = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountBalance"])(address);
            const formattedBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBalance"])(balanceWei);
            setBalance(formattedBalance);
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    };
    const connect = async ()=>{
        setIsLoading(true);
        try {
            const connectedAccount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$blockchain$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectWallet"])();
            setIsConnected(true);
            setAccount(connectedAccount);
            await updateBalance(connectedAccount);
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const disconnect = ()=>{
        setIsConnected(false);
        setAccount(null);
        setBalance('0');
    };
    const value = {
        isConnected,
        account,
        balance,
        connect,
        disconnect,
        isLoading
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/WalletContext.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(WalletProvider, "Vqb6+GwWTjryO43stkB3qwpWeHU=");
_c = WalletProvider;
var _c;
__turbopack_context__.k.register(_c, "WalletProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/contexts/I18nContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "I18nProvider": ()=>I18nProvider,
    "useI18n": ()=>useI18n
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Simple translation function - in production, you'd use a proper i18n library
const translations = {
    vi: {
        'navigation.home': 'Trang chủ',
        'navigation.marketplace': 'Marketplace',
        'navigation.suppliers': 'Nhà cung cấp',
        'navigation.profile': 'Hồ sơ cá nhân',
        'navigation.purchasedProducts': 'Những sản phẩm đã mua',
        'auth.connectWallet': 'Kết nối ví',
        'auth.disconnectWallet': 'Ngắt kết nối',
        'auth.becomeSupplier': 'Trở thành nhà cung cấp',
        'auth.yourSupplier': 'Nhà cung cấp của bạn',
        'common.dashboard': 'Bảng điều khiển',
        'common.connecting': 'Đang kết nối...',
        'common.loading': 'Đang tải...',
        'common.error': 'Có lỗi xảy ra',
        'common.retry': 'Thử lại',
        'common.save': 'Lưu',
        'common.cancel': 'Hủy',
        'common.confirm': 'Xác nhận',
        'common.back': 'Quay lại',
        'common.next': 'Tiếp theo',
        'common.previous': 'Trước đó',
        'common.close': 'Đóng',
        'common.edit': 'Chỉnh sửa',
        'common.delete': 'Xóa',
        'common.search': 'Tìm kiếm',
        'common.filter': 'Lọc',
        'common.sort': 'Sắp xếp',
        'common.refresh': 'Làm mới',
        'common.copy': 'Sao chép',
        'common.share': 'Chia sẻ',
        'common.download': 'Tải xuống',
        'common.upload': 'Tải lên',
        'common.select': 'Chọn',
        'common.all': 'Tất cả',
        'common.none': 'Không có',
        'common.yes': 'Có',
        'common.no': 'Không',
        'common.ok': 'OK',
        'common.success': 'Thành công',
        'common.warning': 'Cảnh báo',
        'common.info': 'Thông tin',
        'common.required': 'Bắt buộc',
        'common.optional': 'Tùy chọn',
        'marketplace.title': 'Marketplace',
        'marketplace.subtitle': 'Khám phá các lô nông sản đã được token hóa và giao dịch bằng crypto minh bạch',
        'marketplace.searchPlaceholder': 'Tìm kiếm theo tên sản phẩm, supplier, tag...',
        'marketplace.inStock': 'Còn hàng',
        'marketplace.mintedNFT': 'Đã mint NFT',
        'marketplace.placeOrder': 'Đặt hàng',
        'marketplace.viewDetails': 'Xem chi tiết',
        'marketplace.noProducts': 'Không tìm thấy sản phẩm phù hợp',
        'marketplace.showingProducts': 'Hiển thị {{count}} / {{total}} sản phẩm',
        'suppliers.title': 'Nhà cung cấp',
        'suppliers.subtitle': 'Khám phá các nhà cung cấp nông sản uy tín và chất lượng',
        'suppliers.searchPlaceholder': 'Tìm kiếm nhà cung cấp...',
        'suppliers.viewDetails': 'Xem chi tiết',
        'suppliers.totalSuppliers': 'Tổng nhà cung cấp',
        'suppliers.totalProducts': 'Tổng sản phẩm',
        'suppliers.averageRating': 'Đánh giá trung bình',
        'suppliers.noSuppliers': 'Không tìm thấy nhà cung cấp phù hợp',
        'suppliers.products': 'sản phẩm',
        'dashboard.title': 'Supplier Dashboard',
        'dashboard.subtitle': 'Quản lý sản phẩm và theo dõi hiệu suất bán hàng',
        'dashboard.walletAddress': 'Địa chỉ ví',
        'dashboard.createProduct': 'Tạo sản phẩm',
        'dashboard.totalSales': 'Tổng bán hàng',
        'dashboard.revenue': 'Doanh thu (MATIC)',
        'dashboard.inventory': 'Tồn kho',
        'dashboard.averageRating': 'Đánh giá TB',
        'dashboard.recentProducts': 'Sản phẩm gần đây',
        'dashboard.viewAll': 'Xem tất cả',
        'dashboard.quickActions': 'Thao tác nhanh',
        'dashboard.addNewProduct': 'Thêm sản phẩm mới',
        'dashboard.mintNFT': 'Mint NFT cho sản phẩm',
        'dashboard.viewOrders': 'Xem tất cả đơn hàng',
        'dashboard.viewRevenue': 'Xem báo cáo doanh thu',
        'dashboard.noProducts': 'Chưa có sản phẩm nào',
        'dashboard.remaining': 'còn lại',
        'products.manage': 'Quản lý sản phẩm',
        'products.manageAndMint': 'Quản lý và mint NFT cho sản phẩm của bạn',
        'products.createNew': 'Tạo sản phẩm mới',
        'products.noProducts': 'Chưa có sản phẩm nào',
        'products.createFirst': 'Hãy tạo sản phẩm đầu tiên của bạn',
        'products.productName': 'Tên sản phẩm',
        'products.productInfo': 'Thông tin sản phẩm',
        'products.loading': 'Đang tải sản phẩm...',
        'products.needWallet': 'Bạn cần kết nối ví để xem sản phẩm',
        'purchased.title': 'Những sản phẩm đã mua',
        'purchased.connectWallet': 'Vui lòng kết nối ví để xem danh sách sản phẩm đã mua',
        'purchased.noProducts': 'Bạn chưa mua bất kì sản phẩm nào',
        'purchased.findProducts': 'Tìm sản phẩm mong muốn',
        'purchased.confirmDelivery': 'Xác nhận đã nhận hàng',
        'purchased.deliveryConfirmed': 'Xác nhận giao hàng thành công! NFT đã được burn.',
        'purchased.deliveryError': 'Lỗi khi xác nhận giao hàng. Vui lòng thử lại.',
        'purchased.supplier': 'Nhà cung cấp',
        'purchased.quantity': 'Số lượng',
        'purchased.totalPrice': 'Tổng giá',
        'purchased.orderDate': 'Ngày đặt hàng',
        'purchased.status': 'Trạng thái',
        'purchased.delivered': 'Đã giao hàng',
        'purchased.pending': 'Chờ giao hàng',
        'purchased.reviews': 'Đánh giá sản phẩm',
        'createProduct.title': 'Tạo sản phẩm mới',
        'createProduct.subtitle': 'Tạo sản phẩm và mint NFT để bán trên marketplace',
        'createProduct.needWallet': 'Bạn cần kết nối ví để tạo sản phẩm',
        'createProduct.productName': 'Tên sản phẩm',
        'createProduct.productDescription': 'Mô tả sản phẩm',
        'createProduct.category': 'Danh mục',
        'createProduct.selectCategory': 'Chọn danh mục',
        'createProduct.tags': 'Tags (phân cách bằng dấu phẩy)',
        'createProduct.pricePerUnit': 'Giá mỗi đơn vị',
        'createProduct.currency': 'Đơn vị tiền tệ',
        'createProduct.totalQuantity': 'Số lượng tổng',
        'createProduct.unit': 'Đơn vị đo',
        'createProduct.imageUrl': 'Hình ảnh URL (tùy chọn)',
        'createProduct.organic': 'Sản phẩm hữu cơ',
        'createProduct.creating': 'Đang tạo...',
        'createProduct.create': 'Tạo sản phẩm',
        'createProduct.success': 'Tạo sản phẩm thành công! Bạn có thể mint NFT cho sản phẩm này.',
        'createProduct.error': 'Lỗi khi tạo sản phẩm',
        'createProduct.vegetables': 'Rau củ',
        'createProduct.fruits': 'Trái cây',
        'createProduct.grains': 'Ngũ cốc',
        'createProduct.meat': 'Thịt cá',
        'createProduct.beverages': 'Đồ uống',
        'createProduct.other': 'Khác',
        'createProduct.tagsPlaceholder': 'hữu cơ, tươi, sạch',
        'createProduct.piece': 'cái',
        'createProduct.box': 'hộp',
        'mintNFT.title': 'Mint NFT cho sản phẩm',
        'mintNFT.subtitle': 'Tạo NFT để bán sản phẩm trên marketplace',
        'mintNFT.loading': 'Đang tải thông tin sản phẩm...',
        'mintNFT.productInfo': 'Thông tin sản phẩm',
        'mintNFT.productName': 'Tên sản phẩm',
        'mintNFT.quantity': 'Số lượng mint',
        'mintNFT.mint': 'Mint NFT',
        'mintNFT.minting': 'Đang mint...',
        'mintNFT.success': 'Mint NFT thành công! Transaction hash:',
        'mintNFT.error': 'Lỗi khi mint NFT',
        'mintNFT.prepareError': 'Lỗi khi chuẩn bị mint',
        'mintNFT.confirmError': 'Lỗi khi xác nhận mint',
        'supplier.noProducts': 'Chưa có sản phẩm nào.',
        'marketplace.reviews': 'Đánh giá sản phẩm',
        'marketplace.noReviews': 'Chưa có đánh giá nào.',
        'createSupplier.businessName': 'Tên doanh nghiệp',
        'createSupplier.businessNamePlaceholder': 'Nhập tên doanh nghiệp',
        'createSupplier.description': 'Mô tả',
        'createSupplier.descriptionPlaceholder': 'Mô tả về doanh nghiệp và sản phẩm của bạn',
        'createSupplier.location': 'Địa điểm',
        'createSupplier.locationPlaceholder': 'Ví dụ: Đà Lạt, Lâm Đồng',
        'createSupplier.create': 'Tạo nhà cung cấp',
        'createSupplier.creating': 'Đang tạo...',
        'createSupplier.success': 'Tạo nhà cung cấp thành công!',
        'createSupplier.error': 'Lỗi khi tạo nhà cung cấp',
        'review.submit': 'Gửi đánh giá',
        'review.submitSuccess': 'Gửi đánh giá thành công!',
        'review.submitError': 'Gửi đánh giá thất bại',
        'review.type': 'Loại đánh giá',
        'review.product': 'Sản phẩm',
        'review.supplier': 'Nhà cung cấp',
        'review.id': 'ID',
        'review.rating': 'Đánh giá (1-5 sao)',
        'review.comment': 'Bình luận',
        'review.submitButton': 'Gửi đánh giá',
        'review.submitting': 'Đang gửi...',
        'loyalty.title': 'Chương trình Loyalty',
        'loyalty.fetchError': 'Không thể lấy điểm loyalty',
        'loyalty.redeemSuccess': 'Đổi điểm thành công! Nhận được',
        'loyalty.redeemError': 'Đổi điểm thất bại',
        'loyalty.tokens': 'TOKEN',
        'order.title': 'Đặt hàng',
        'order.quantity': 'Số lượng',
        'order.shippingAddress': 'Địa chỉ nhận hàng',
        'order.confirm': 'Xác nhận đặt hàng',
        'order.remaining': 'Còn lại',
        'order.cannotBuyOwn': 'Bạn không thể mua sản phẩm của chính mình!',
        'home.welcome': 'Chào mừng đến với',
        'home.subtitle': 'Tương lai của thương mại nông nghiệp đã đến. Kết nối trực tiếp với nông dân, mua sản phẩm tươi bằng crypto, và trải nghiệm sức mạnh của công nghệ blockchain.',
        'home.getStarted': 'Bắt đầu',
        'home.exploreMarketplace': 'Khám phá Marketplace',
        'home.whyChoose': 'Tại sao chọn AgriChain?',
        'home.whyChooseSubtitle': 'Trải nghiệm lợi ích của thương mại nông nghiệp phi tập trung',
        'home.freshProducts': 'Sản phẩm nông nghiệp tươi',
        'home.freshProductsDesc': 'Kết nối trực tiếp giữa nông dân và người tiêu dùng, đảm bảo sản phẩm tươi và chất lượng.',
        'home.blockchainSecurity': 'Bảo mật Blockchain',
        'home.blockchainSecurityDesc': 'Giao dịch minh bạch và an toàn sử dụng công nghệ blockchain Polygon.',
        'home.trustedSuppliers': 'Nhà cung cấp đáng tin cậy',
        'home.trustedSuppliersDesc': 'Nông dân và nhà cung cấp đã được xác minh với thông tin sản phẩm minh bạch.',
        'home.fastTransactions': 'Giao dịch nhanh chóng',
        'home.fastTransactionsDesc': 'Thanh toán crypto nhanh chóng và hiệu quả với xác nhận tức thì.',
        'home.inNumbers': 'AgriChain trong con số',
        'home.growingCommunity': 'Cộng đồng nông dân và người tiêu dùng đang phát triển',
        'home.verifiedSuppliers': 'Nhà cung cấp đã xác minh',
        'home.productsListed': 'Sản phẩm đã niêm yết',
        'home.happyCustomers': 'Khách hàng hài lòng',
        'home.transactionSuccess': 'Thành công giao dịch',
        'home.howItWorks': 'Cách thức hoạt động',
        'home.howItWorksSubtitle': 'Các bước đơn giản để bắt đầu giao dịch sản phẩm nông nghiệp',
        'home.connectWallet': 'Kết nối ví',
        'home.connectWalletDesc': 'Kết nối ví MetaMask của bạn để truy cập marketplace',
        'home.browseProducts': 'Duyệt sản phẩm',
        'home.browseProductsDesc': 'Khám phá sản phẩm nông nghiệp tươi từ các nhà cung cấp đã xác minh',
        'home.buyCollect': 'Mua & Thu thập',
        'home.buyCollectDesc': 'Mua bằng crypto và thu thập sản phẩm của bạn',
        'home.readyToStart': 'Sẵn sàng bắt đầu?',
        'home.readyToStartDesc': 'Tham gia cùng hàng nghìn nông dân và người tiêu dùng đã sử dụng AgriChain',
        'home.startTrading': 'Bắt đầu giao dịch ngay'
    },
    en: {
        'navigation.home': 'Home',
        'navigation.marketplace': 'Marketplace',
        'navigation.suppliers': 'Suppliers',
        'navigation.profile': 'Personal Profile',
        'navigation.purchasedProducts': 'Purchased Products',
        'auth.connectWallet': 'Connect Wallet',
        'auth.disconnectWallet': 'Disconnect',
        'auth.becomeSupplier': 'Become Supplier',
        'auth.yourSupplier': 'Your Supplier',
        'common.dashboard': 'Dashboard',
        'common.connecting': 'Connecting...',
        'common.loading': 'Loading...',
        'common.error': 'An error occurred',
        'common.retry': 'Retry',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.confirm': 'Confirm',
        'common.back': 'Back',
        'common.next': 'Next',
        'common.previous': 'Previous',
        'common.close': 'Close',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.sort': 'Sort',
        'common.refresh': 'Refresh',
        'common.copy': 'Copy',
        'common.share': 'Share',
        'common.download': 'Download',
        'common.upload': 'Upload',
        'common.select': 'Select',
        'common.all': 'All',
        'common.none': 'None',
        'common.yes': 'Yes',
        'common.no': 'No',
        'common.ok': 'OK',
        'common.success': 'Success',
        'common.warning': 'Warning',
        'common.info': 'Information',
        'common.required': 'Required',
        'common.optional': 'Optional',
        'marketplace.title': 'Marketplace',
        'marketplace.subtitle': 'Discover tokenized agricultural products and trade with transparent crypto transactions',
        'marketplace.searchPlaceholder': 'Search by product name, supplier, tag...',
        'marketplace.inStock': 'In Stock',
        'marketplace.mintedNFT': 'Minted NFT',
        'marketplace.placeOrder': 'Place Order',
        'marketplace.viewDetails': 'View Details',
        'marketplace.noProducts': 'No products found matching your criteria',
        'marketplace.showingProducts': 'Showing {{count}} / {{total}} products',
        'suppliers.title': 'Suppliers',
        'suppliers.subtitle': 'Discover trusted and quality agricultural suppliers',
        'suppliers.searchPlaceholder': 'Search suppliers...',
        'suppliers.viewDetails': 'View Details',
        'suppliers.totalSuppliers': 'Total Suppliers',
        'suppliers.totalProducts': 'Total Products',
        'suppliers.averageRating': 'Average Rating',
        'suppliers.noSuppliers': 'No suppliers found matching your criteria',
        'suppliers.products': 'products',
        'dashboard.title': 'Supplier Dashboard',
        'dashboard.subtitle': 'Manage products and track sales performance',
        'dashboard.walletAddress': 'Wallet Address',
        'dashboard.createProduct': 'Create Product',
        'dashboard.totalSales': 'Total Sales',
        'dashboard.revenue': 'Revenue (MATIC)',
        'dashboard.inventory': 'Inventory',
        'dashboard.averageRating': 'Average Rating',
        'dashboard.recentProducts': 'Recent Products',
        'dashboard.viewAll': 'View All',
        'dashboard.quickActions': 'Quick Actions',
        'dashboard.addNewProduct': 'Add New Product',
        'dashboard.mintNFT': 'Mint NFT for Product',
        'dashboard.viewOrders': 'View All Orders',
        'dashboard.viewRevenue': 'View Revenue Report',
        'dashboard.noProducts': 'No products yet',
        'dashboard.remaining': 'remaining',
        'products.manage': 'Manage Products',
        'products.manageAndMint': 'Manage and mint NFT for your products',
        'products.createNew': 'Create New Product',
        'products.noProducts': 'No products yet',
        'products.createFirst': 'Create your first product',
        'products.productName': 'Product Name',
        'products.productInfo': 'Product Information',
        'products.loading': 'Loading products...',
        'products.needWallet': 'You need to connect wallet to view products',
        'purchased.title': 'Purchased Products',
        'purchased.connectWallet': 'Please connect wallet to view purchased products',
        'purchased.noProducts': 'You haven\'t bought any products yet',
        'purchased.findProducts': 'Find Desired Products',
        'purchased.confirmDelivery': 'Confirm Delivery Received',
        'purchased.deliveryConfirmed': 'Delivery confirmed successfully! NFT has been burned.',
        'purchased.deliveryError': 'Error confirming delivery. Please try again.',
        'purchased.supplier': 'Supplier',
        'purchased.quantity': 'Quantity',
        'purchased.totalPrice': 'Total Price',
        'purchased.orderDate': 'Order Date',
        'purchased.status': 'Status',
        'purchased.delivered': 'Delivered',
        'purchased.pending': 'Pending',
        'purchased.reviews': 'Product Reviews',
        'createProduct.title': 'Create New Product',
        'createProduct.subtitle': 'Create product and mint NFT to sell on marketplace',
        'createProduct.needWallet': 'You need to connect wallet to create product',
        'createProduct.productName': 'Product Name',
        'createProduct.productDescription': 'Product Description',
        'createProduct.category': 'Category',
        'createProduct.selectCategory': 'Select Category',
        'createProduct.tags': 'Tags (separated by commas)',
        'createProduct.pricePerUnit': 'Price per Unit',
        'createProduct.currency': 'Currency Unit',
        'createProduct.totalQuantity': 'Total Quantity',
        'createProduct.unit': 'Unit of Measurement',
        'createProduct.imageUrl': 'Image URL (optional)',
        'createProduct.organic': 'Organic Product',
        'createProduct.creating': 'Creating...',
        'createProduct.create': 'Create Product',
        'createProduct.success': 'Product created successfully! You can mint NFT for this product.',
        'createProduct.error': 'Error creating product',
        'createProduct.vegetables': 'Vegetables',
        'createProduct.fruits': 'Fruits',
        'createProduct.grains': 'Grains',
        'createProduct.meat': 'Meat & Fish',
        'createProduct.beverages': 'Beverages',
        'createProduct.other': 'Other',
        'createProduct.tagsPlaceholder': 'organic, fresh, clean',
        'createProduct.piece': 'piece',
        'createProduct.box': 'box',
        'mintNFT.title': 'Mint NFT for Product',
        'mintNFT.subtitle': 'Create NFT to sell product on marketplace',
        'mintNFT.loading': 'Loading product information...',
        'mintNFT.productInfo': 'Product Information',
        'mintNFT.productName': 'Product Name',
        'mintNFT.quantity': 'Mint Quantity',
        'mintNFT.mint': 'Mint NFT',
        'mintNFT.minting': 'Minting...',
        'mintNFT.success': 'NFT minted successfully! Transaction hash:',
        'mintNFT.error': 'Error minting NFT',
        'mintNFT.prepareError': 'Error preparing mint',
        'mintNFT.confirmError': 'Error confirming mint',
        'supplier.noProducts': 'No products yet.',
        'marketplace.reviews': 'Product Reviews',
        'marketplace.noReviews': 'No reviews yet.',
        'createSupplier.businessName': 'Business Name',
        'createSupplier.businessNamePlaceholder': 'Enter business name',
        'createSupplier.description': 'Description',
        'createSupplier.descriptionPlaceholder': 'Describe your business and products',
        'createSupplier.location': 'Location',
        'createSupplier.locationPlaceholder': 'e.g. Da Lat, Lam Dong',
        'createSupplier.create': 'Create Supplier',
        'createSupplier.creating': 'Creating...',
        'createSupplier.success': 'Supplier created successfully!',
        'createSupplier.error': 'Error creating supplier',
        'review.submit': 'Submit Review',
        'review.submitSuccess': 'Review submitted successfully!',
        'review.submitError': 'Failed to submit review',
        'review.type': 'Review Type',
        'review.product': 'Product',
        'review.supplier': 'Supplier',
        'review.id': 'ID',
        'review.rating': 'Rating (1-5 stars)',
        'review.comment': 'Comment',
        'review.submitButton': 'Submit Review',
        'review.submitting': 'Submitting...',
        'loyalty.title': 'Loyalty Program',
        'loyalty.fetchError': 'Cannot fetch loyalty points',
        'loyalty.redeemSuccess': 'Points redeemed successfully! Received',
        'loyalty.redeemError': 'Failed to redeem points',
        'loyalty.tokens': 'TOKENS',
        'order.title': 'Place Order',
        'order.quantity': 'Quantity',
        'order.shippingAddress': 'Shipping Address',
        'order.confirm': 'Confirm Order',
        'order.remaining': 'Remaining',
        'order.cannotBuyOwn': 'You cannot buy your own product!',
        'home.welcome': 'Welcome to',
        'home.subtitle': 'The future of agricultural commerce is here. Connect directly with farmers, buy fresh products with crypto, and experience the power of blockchain technology.',
        'home.getStarted': 'Get Started',
        'home.exploreMarketplace': 'Explore Marketplace',
        'home.whyChoose': 'Why Choose AgriChain?',
        'home.whyChooseSubtitle': 'Experience the benefits of decentralized agricultural commerce',
        'home.freshProducts': 'Fresh Agricultural Products',
        'home.freshProductsDesc': 'Direct connection between farmers and consumers, ensuring fresh and quality products.',
        'home.blockchainSecurity': 'Blockchain Security',
        'home.blockchainSecurityDesc': 'Transparent and secure transactions using Polygon blockchain technology.',
        'home.trustedSuppliers': 'Trusted Suppliers',
        'home.trustedSuppliersDesc': 'Verified farmers and suppliers with transparent product information.',
        'home.fastTransactions': 'Fast Transactions',
        'home.fastTransactionsDesc': 'Quick and efficient crypto payments with instant confirmation.',
        'home.inNumbers': 'AgriChain in Numbers',
        'home.growingCommunity': 'Growing community of farmers and consumers',
        'home.verifiedSuppliers': 'Verified Suppliers',
        'home.productsListed': 'Products Listed',
        'home.happyCustomers': 'Happy Customers',
        'home.transactionSuccess': 'Transaction Success',
        'home.howItWorks': 'How It Works',
        'home.howItWorksSubtitle': 'Simple steps to start trading agricultural products',
        'home.connectWallet': 'Connect Wallet',
        'home.connectWalletDesc': 'Connect your MetaMask wallet to access the marketplace',
        'home.browseProducts': 'Browse Products',
        'home.browseProductsDesc': 'Explore fresh agricultural products from verified suppliers',
        'home.buyCollect': 'Buy & Collect',
        'home.buyCollectDesc': 'Purchase with crypto and collect your products',
        'home.readyToStart': 'Ready to Start?',
        'home.readyToStartDesc': 'Join thousands of farmers and consumers already using AgriChain',
        'home.startTrading': 'Start Trading Now'
    }
};
const I18nProvider = (param)=>{
    let { children } = param;
    _s();
    const [locale, setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('vi');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            // Get locale from localStorage or default to 'vi'
            const savedLocale = localStorage.getItem('locale') || 'vi';
            setLocale(savedLocale);
        }
    }["I18nProvider.useEffect"], []);
    const changeLocale = (newLocale)=>{
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    // You can add URL-based locale switching here if needed
    };
    const t = (key, params)=>{
        var _locale;
        let translation = ((_locale = translations[locale]) === null || _locale === void 0 ? void 0 : _locale[key]) || key;
        // Simple parameter replacement
        if (params) {
            Object.keys(params).forEach((param)=>{
                translation = translation.replace("{{".concat(param, "}}"), params[param]);
            });
        }
        return translation;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: {
            locale,
            changeLocale,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/I18nContext.tsx",
        lineNumber: 464,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(I18nProvider, "Hqz227o1N3EzqQGFAo4UcXDSNs0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = I18nProvider;
const useI18n = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
_s1(useI18n, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "I18nProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useTranslation.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTranslation": ()=>useTranslation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$I18nContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/I18nContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useTranslation = ()=>{
    _s();
    const { t, changeLocale, locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$I18nContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    return {
        t,
        changeLanguage: changeLocale,
        currentLanguage: locale
    };
};
_s(useTranslation, "VIGgJwJqS1SH7XYNWPobjHoUSYg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$I18nContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/LanguageSwitcher.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTranslation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const LanguageSwitcher = ()=>{
    _s();
    const { changeLanguage, currentLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const languages = [
        {
            code: 'vi',
            name: 'Tiếng Việt',
            flag: '🇻🇳'
        },
        {
            code: 'en',
            name: 'English',
            flag: '🇺🇸'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: currentLanguage,
                onChange: (e)=>changeLanguage(e.target.value),
                className: "appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer",
                children: languages.map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: lang.code,
                        children: [
                            lang.flag,
                            " ",
                            lang.name
                        ]
                    }, lang.code, true, {
                        fileName: "[project]/src/components/LanguageSwitcher.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageSwitcher.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4 text-gray-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M19 9l-7 7-7-7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LanguageSwitcher.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/LanguageSwitcher.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageSwitcher.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LanguageSwitcher.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LanguageSwitcher, "bXGqc9/SUwv9qO4oAimJv+jvk3E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = LanguageSwitcher;
const __TURBOPACK__default__export__ = LanguageSwitcher;
var _c;
__turbopack_context__.k.register(_c, "LanguageSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/WalletContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useTranslation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LanguageSwitcher.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const Header = ()=>{
    _s();
    const { isConnected, account, balance, connect, disconnect, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSupplier, setIsSupplier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [supplierData, setSupplierData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const userMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleConnectWallet = async ()=>{
        try {
            await connect();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        // You can add a toast notification here
        }
    };
    const handleDisconnect = ()=>{
        disconnect();
        setIsUserMenuOpen(false);
    };
    const handleBecomeSupplier = ()=>{
        window.location.href = '/createsupplier';
        setIsUserMenuOpen(false);
    };
    const handleSupplierDashboard = ()=>{
        window.location.href = '/supplier/dashboard';
        setIsUserMenuOpen(false);
    };
    const formatAddress = (address)=>{
        return "".concat(address.slice(0, 6), "...").concat(address.slice(-4));
    };
    // Check supplier status when wallet connects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const checkSupplierStatus = {
                "Header.useEffect.checkSupplierStatus": async ()=>{
                    if (isConnected && account) {
                        try {
                            const response = await fetch("http://localhost:5000/api/suppliers?walletAddress=".concat(account), {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            if (response.ok) {
                                const suppliers = await response.json();
                                if (suppliers && Array.isArray(suppliers) && suppliers.length > 0) {
                                    setIsSupplier(true);
                                    setSupplierData(suppliers[0]);
                                } else {
                                    setIsSupplier(false);
                                    setSupplierData(null);
                                }
                            } else {
                                console.warn('Failed to fetch supplier status:', response.status);
                                setIsSupplier(false);
                                setSupplierData(null);
                            }
                        } catch (error) {
                            console.error('Error checking supplier status:', error);
                            setIsSupplier(false);
                            setSupplierData(null);
                        }
                    } else {
                        setIsSupplier(false);
                        setSupplierData(null);
                    }
                }
            }["Header.useEffect.checkSupplierStatus"];
            checkSupplierStatus();
        }
    }["Header.useEffect"], [
        isConnected,
        account
    ]);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const handleClickOutside = {
                "Header.useEffect.handleClickOutside": (event)=>{
                    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                        setIsUserMenuOpen(false);
                    }
                }
            }["Header.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "Header.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold ui-gradient-text",
                                    children: "AgriChain"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex space-x-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/",
                                    className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    children: t('navigation.home')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/marketplace",
                                    className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    children: t('navigation.marketplace')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/suppliers",
                                    className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    children: t('navigation.suppliers')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/supplier/dashboard",
                                    className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    children: t('common.dashboard')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block",
                                    children: isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        ref: userMenuRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsUserMenuOpen(!isUserMenuOpen),
                                                className: "ui-focus-ring flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 bg-green-500 rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            size: 16,
                                                            className: "text-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm font-medium text-gray-900",
                                                                children: formatAddress(account)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 162,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-500",
                                                                children: [
                                                                    balance,
                                                                    " tBNB"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        size: 16,
                                                        className: "text-gray-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 154,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isUserMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-4 py-3 border-b border-gray-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm font-medium text-gray-900",
                                                                children: "Wallet Address"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 176,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-500 font-mono",
                                                                children: account
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-2",
                                                        children: [
                                                            isSupplier ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: handleSupplierDashboard,
                                                                className: "w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 186,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: t('auth.yourSupplier')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: handleBecomeSupplier,
                                                                className: "w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 194,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: t('auth.becomeSupplier')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 195,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>window.location.href = '/purchased-products',
                                                                className: "w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 203,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: t('navigation.purchasedProducts')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 204,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 199,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: handleDisconnect,
                                                                className: "w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                                        size: 16
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 211,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: t('auth.disconnectWallet')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Header.tsx",
                                                                        lineNumber: 212,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 174,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleConnectWallet,
                                        disabled: isLoading,
                                        className: "ui-focus-ring flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 224,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: isLoading ? t('common.connecting') : t('auth.connectWallet')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsMenuOpen(!isMenuOpen),
                                        className: "ui-focus-ring text-gray-700 hover:text-green-600 p-2",
                                        children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 241,
                                            columnNumber: 31
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 241,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Header.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/",
                                className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium",
                                children: t('navigation.home')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/marketplace",
                                className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium",
                                children: t('navigation.marketplace')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 257,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/suppliers",
                                className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium",
                                children: t('navigation.suppliers')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 263,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/supplier/dashboard",
                                className: "text-gray-700 hover:text-green-600 hover:underline underline-offset-4 block px-3 py-2 rounded-md text-base font-medium",
                                children: t('common.dashboard')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 270,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 border-t border-gray-200",
                                children: isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 bg-green-500 rounded-full flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        size: 20,
                                                        className: "text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium text-gray-900",
                                                            children: formatAddress(account)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                balance,
                                                                " tBNB"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 290,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 282,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                isSupplier ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSupplierDashboard,
                                                    className: "w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: t('auth.yourSupplier')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleBecomeSupplier,
                                                    className: "w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Trở thành nhà cung cấp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>window.location.href = '/profile',
                                                    className: "w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: t('navigation.profile')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleDisconnect,
                                                    className: "w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Ngắt kết nối"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 296,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 281,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConnectWallet,
                                    disabled: isLoading,
                                    className: "flex items-center space-x-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium w-full justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 338,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isLoading ? t('common.connecting') : t('auth.connectWallet')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 339,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 333,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 279,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 250,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Header.tsx",
                    lineNumber: 249,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Header.tsx",
            lineNumber: 104,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "WLFC2BAlqeLO4IYR7FHa/14LxgY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$WalletContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWallet"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useTranslation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_b28cc7f2._.js.map