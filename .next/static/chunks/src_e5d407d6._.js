(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "confirmProductMint": ()=>confirmProductMint,
    "createOrder": ()=>createOrder,
    "deploySupplierContract": ()=>deploySupplierContract,
    "fetchEvents": ()=>fetchEvents,
    "fetchLoyalty": ()=>fetchLoyalty,
    "fetchMarketplaceListings": ()=>fetchMarketplaceListings,
    "fetchProductDetail": ()=>fetchProductDetail,
    "fetchProducts": ()=>fetchProducts,
    "fetchProfile": ()=>fetchProfile,
    "fetchReviews": ()=>fetchReviews,
    "fetchSupplierDetail": ()=>fetchSupplierDetail,
    "prepareProductMint": ()=>prepareProductMint,
    "redeemLoyalty": ()=>redeemLoyalty,
    "submitReview": ()=>submitReview
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var _process_env_NEXT_PUBLIC_BACKEND_URL;
const API_BASE = (_process_env_NEXT_PUBLIC_BACKEND_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BACKEND_URL) !== null && _process_env_NEXT_PUBLIC_BACKEND_URL !== void 0 ? _process_env_NEXT_PUBLIC_BACKEND_URL : 'http://localhost:5000';
async function apiFetch(path, init, fallbackMessage) {
    const response = await fetch("".concat(API_BASE).concat(path), {
        headers: {
            'Content-Type': 'application/json',
            ...(init === null || init === void 0 ? void 0 : init.headers) || {}
        },
        ...init
    });
    if (!response.ok) {
        const message = fallbackMessage !== null && fallbackMessage !== void 0 ? fallbackMessage : "Request failed with status ".concat(response.status);
        const detail = await response.text().catch(()=>'');
        throw new Error(detail ? "".concat(message, ": ").concat(detail) : message);
    }
    if (response.status === 204) {
        return undefined;
    }
    return await response.json();
}
async function fetchMarketplaceListings() {
    const listings = await apiFetch('/api/products/marketplace/listings');
    return listings.map((listing)=>{
        var _supplier_user;
        var _listing_product;
        const product = (_listing_product = listing.product) !== null && _listing_product !== void 0 ? _listing_product : {};
        var _product_supplier;
        const supplier = (_product_supplier = product.supplier) !== null && _product_supplier !== void 0 ? _product_supplier : {};
        var _product_pricePerUnit, _product_currency, _product_availableSupply, _product_totalSupply, _product_images, _product_category, _supplier_businessName, _listing_searchTags;
        return {
            listingId: listing.id,
            slug: listing.slug,
            title: listing.title,
            shortDescription: listing.shortDescription,
            pricePerUnit: (_product_pricePerUnit = product.pricePerUnit) !== null && _product_pricePerUnit !== void 0 ? _product_pricePerUnit : '0',
            currency: (_product_currency = product.currency) !== null && _product_currency !== void 0 ? _product_currency : 'MATIC',
            availableSupply: (_product_availableSupply = product.availableSupply) !== null && _product_availableSupply !== void 0 ? _product_availableSupply : 0,
            totalSupply: (_product_totalSupply = product.totalSupply) !== null && _product_totalSupply !== void 0 ? _product_totalSupply : 0,
            isFeatured: Boolean(listing.isFeatured),
            productId: product.id,
            productName: product.name,
            productImages: (_product_images = product.images) !== null && _product_images !== void 0 ? _product_images : [],
            category: (_product_category = product.category) !== null && _product_category !== void 0 ? _product_category : 'Unknown',
            supplierId: supplier.id,
            supplierName: (_supplier_businessName = supplier.businessName) !== null && _supplier_businessName !== void 0 ? _supplier_businessName : supplier.id,
            supplierWallet: (_supplier_user = supplier.user) === null || _supplier_user === void 0 ? void 0 : _supplier_user.walletAddress,
            contractAddress: product.contractAddress,
            tokenId: product.nftTokenId,
            mintTxHash: product.mintTxHash,
            mintedAt: product.mintedAt,
            tags: (_listing_searchTags = listing.searchTags) !== null && _listing_searchTags !== void 0 ? _listing_searchTags : []
        };
    });
}
async function fetchProducts() {
    return apiFetch('/api/products');
}
async function fetchProductDetail(id) {
    return apiFetch("/api/products/".concat(id));
}
async function fetchReviews(params) {
    let path = '';
    if (params.productId) path = "/api/reviews/product/".concat(params.productId);
    if (params.supplierId) path = "/api/reviews/supplier/".concat(params.supplierId);
    return apiFetch(path || '/api/reviews');
}
async function fetchSupplierDetail(id) {
    return apiFetch("/api/suppliers/".concat(id));
}
async function prepareProductMint(productId) {
    return apiFetch("/api/products/".concat(productId, "/mint/prepare"), {
        method: 'POST'
    }, 'Failed to prepare mint payload');
}
async function confirmProductMint(productId, payload) {
    return apiFetch("/api/products/".concat(productId, "/mint/confirm"), {
        method: 'POST',
        body: JSON.stringify(payload)
    }, 'Failed to confirm product mint');
}
async function createOrder(payload) {
    return apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(payload)
    }, 'Failed to create order');
}
async function fetchLoyalty(buyerId) {
    return apiFetch("/api/loyalty/buyer/".concat(buyerId));
}
async function redeemLoyalty(buyerId, supplierId, points) {
    return apiFetch("/api/loyalty/buyer/".concat(buyerId, "/redeem"), {
        method: 'POST',
        body: JSON.stringify({
            supplierId,
            points
        })
    }, 'Failed to redeem loyalty points');
}
async function submitReview(review) {
    return apiFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    }, 'Failed to submit review');
}
async function fetchProfile(userId) {
    return apiFetch("/api/users/".concat(userId));
}
async function fetchEvents() {
    return apiFetch('/api/events');
}
async function deploySupplierContract(supplierId, body) {
    return apiFetch("/api/suppliers/".concat(supplierId, "/contracts/deploy"), {
        method: 'POST',
        body: JSON.stringify(body !== null && body !== void 0 ? body : {})
    }, 'Failed to deploy supplier contract');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/profile/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ProfilePage = ()=>{
    _s();
    // TODO: Lấy userId từ context/wallet
    const userId = 1;
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loyalty, setLoyalty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfilePage.useEffect": ()=>{
            setLoading(true);
            Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchProfile"])(userId.toString()),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchLoyalty"])(userId.toString())
            ]).then({
                "ProfilePage.useEffect": (param)=>{
                    let [prof, loy] = param;
                    setProfile(prof);
                    setLoyalty(Array.isArray(loy) ? loy : []);
                    setLoading(false);
                }
            }["ProfilePage.useEffect"]).catch({
                "ProfilePage.useEffect": (err)=>{
                    setError(err.message || 'Lỗi không xác định');
                    setLoading(false);
                }
            }["ProfilePage.useEffect"]);
        }
    }["ProfilePage.useEffect"], [
        userId
    ]);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center items-center h-80",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin",
            animate: {
                rotate: 360
            },
            transition: {
                repeat: Infinity,
                duration: 1,
                ease: 'linear'
            }
        }, void 0, false, {
            fileName: "[project]/src/app/profile/page.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/profile/page.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-center font-semibold shadow animate-fade-in",
        initial: {
            opacity: 0,
            y: -20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        children: error
    }, void 0, false, {
        fileName: "[project]/src/app/profile/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    if (!profile) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto px-4 py-8 animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: "Thông tin cá nhân"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-lg p-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold text-lg",
                        children: profile.name || 'User #' + profile.id
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-500",
                        children: [
                            "Email: ",
                            profile.email
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-500",
                        children: [
                            "Địa chỉ ví: ",
                            profile.walletAddress
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-lg p-6 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-2",
                        children: "Điểm loyalty"
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    loyalty.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-500",
                        children: "Chưa có điểm loyalty nào."
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-2",
                        children: loyalty.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex justify-between items-center bg-gray-50 rounded px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Supplier #",
                                            l.supplierId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-blue-700",
                                        children: [
                                            l.points,
                                            " điểm"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/page.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, l.supplierId, true, {
                                fileName: "[project]/src/app/profile/page.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/page.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProfilePage, "sRnbxUhFEi2vr5BMPZpQZy9yPSg=");
_c = ProfilePage;
const __TURBOPACK__default__export__ = ProfilePage;
var _c;
__turbopack_context__.k.register(_c, "ProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_e5d407d6._.js.map