// Functions Data for AgriChain System
// This file contains all the actual functions found in the codebase

export interface FunctionData {
  id: string;
  name: string;
  category: 'product' | 'order' | 'user' | 'blockchain' | 'database' | 'frontend';
  description: string;
  filePath: string;
  lineNumber: number;
  parameters: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  returnType: string;
  callLocations: Array<{
    file: string;
    line: number;
    description: string;
  }>;
  complexity: 'Low' | 'Medium' | 'High';
  importance: 'Low' | 'Medium' | 'High';
}

export const functionsData: FunctionData[] = [
  // Backend Services - Product Service (7 functions)
  {
    id: 'createProduct',
    name: 'createProduct',
    category: 'product',
    description: 'Tạo sản phẩm mới trong hệ thống',
    filePath: 'backend/src/services/productService.ts',
    lineNumber: 64,
    parameters: [
      { name: 'input', type: 'CreateProductInput', description: 'Dữ liệu đầu vào sản phẩm' }
    ],
    returnType: 'Promise<Product>',
    callLocations: [
      { file: 'backend/src/controllers/productController.ts', line: 43, description: 'API endpoint POST /api/products' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'getAllProducts',
    name: 'getAllProducts',
    category: 'product',
    description: 'Lấy danh sách tất cả sản phẩm',
    filePath: 'backend/src/services/productService.ts',
    lineNumber: 45,
    parameters: [
      { name: 'params', type: 'GetProductsParams', description: 'Tham số lọc sản phẩm' }
    ],
    returnType: 'Promise<Product[]>',
    callLocations: [
      { file: 'backend/src/controllers/productController.ts', line: 12, description: 'API endpoint GET /api/products' },
      { file: 'frontend/src/pages/products.tsx', line: 23, description: 'Product listing page' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getProductById',
    name: 'getProductById',
    category: 'product',
    description: 'Lấy thông tin chi tiết sản phẩm theo ID',
    filePath: 'backend/src/services/productService.ts',
    lineNumber: 67,
    parameters: [
      { name: 'id', type: 'string', description: 'ID sản phẩm' }
    ],
    returnType: 'Promise<Product | null>',
    callLocations: [
      { file: 'backend/src/controllers/productController.ts', line: 45, description: 'API endpoint GET /api/products/:id' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'updateProductAvailability',
    name: 'updateProductAvailability',
    category: 'product',
    description: 'Cập nhật số lượng sản phẩm có sẵn',
    filePath: 'backend/src/services/productService.ts',
    lineNumber: 89,
    parameters: [
      { name: 'productId', type: 'string', description: 'ID sản phẩm' },
      { name: 'quantityDelta', type: 'number', description: 'Thay đổi số lượng' }
    ],
    returnType: 'Promise<Product>',
    callLocations: [
      { file: 'backend/src/services/orderService.ts', line: 78, description: 'Order processing' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'listActiveMarketplaceProducts',
    name: 'listActiveMarketplaceProducts',
    category: 'product',
    description: 'Lấy danh sách sản phẩm đang bán trên marketplace',
    filePath: 'backend/src/services/productService.ts',
    lineNumber: 112,
    parameters: [],
    returnType: 'Promise<Product[]>',
    callLocations: [
      { file: 'frontend/src/app/marketplace/page.tsx', line: 34, description: 'Marketplace page' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'prepareProductMint',
    name: 'prepareProductMint',
    category: 'product',
    description: 'Chuẩn bị dữ liệu để mint NFT sản phẩm',
    filePath: 'backend/src/services/productService.ts',
    lineNumber: 134,
    parameters: [
      { name: 'productId', type: 'string', description: 'ID sản phẩm' }
    ],
    returnType: 'Promise<ProductMintData>',
    callLocations: [
      { file: 'frontend/src/app/supplier/mint-nft/page.tsx', line: 67, description: 'NFT minting page' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'confirmProductMint',
    name: 'confirmProductMint',
    category: 'product',
    description: 'Xác nhận việc mint NFT sản phẩm',
    filePath: 'backend/src/services/productService.ts',
    lineNumber: 156,
    parameters: [
      { name: 'input', type: 'ConfirmProductMintInput', description: 'Dữ liệu xác nhận mint' }
    ],
    returnType: 'Promise<Product>',
    callLocations: [
      { file: 'backend/src/controllers/productController.ts', line: 89, description: 'API endpoint POST /api/products/mint/confirm' }
    ],
    complexity: 'High',
    importance: 'High'
  },

  // Backend Services - Order Service
  {
    id: 'createOrder',
    name: 'createOrder',
    category: 'order',
    description: 'Tạo đơn hàng mới và xử lý thanh toán',
    filePath: 'backend/src/services/orderService.ts',
    lineNumber: 32,
    parameters: [
      { name: 'input', type: 'CreateOrderInput', description: 'Thông tin đơn hàng' }
    ],
    returnType: 'Promise<Order>',
    callLocations: [
      { file: 'backend/src/controllers/orderController.ts', line: 18, description: 'API endpoint POST /api/orders' },
      { file: 'frontend/src/components/Checkout.tsx', line: 67, description: 'Checkout process' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'getUserOrders',
    name: 'getUserOrders',
    category: 'order',
    description: 'Lấy danh sách đơn hàng của người dùng',
    filePath: 'backend/src/services/orderService.ts',
    lineNumber: 78,
    parameters: [
      { name: 'userId', type: 'string', description: 'ID người dùng' }
    ],
    returnType: 'Promise<Order[]>',
    callLocations: [
      { file: 'backend/src/controllers/orderController.ts', line: 45, description: 'API endpoint GET /api/orders/user/:userId' }
    ],
    complexity: 'Low',
    importance: 'High'
  },

  // Backend Services - Blockchain Service
  {
    id: 'deploySupplierContract',
    name: 'deploySupplierContract',
    category: 'blockchain',
    description: 'Triển khai smart contract cho nhà cung cấp',
    filePath: 'backend/src/services/blockchainService.ts',
    lineNumber: 45,
    parameters: [
      { name: 'input', type: 'DeploySupplierContractInput', description: 'Thông tin triển khai contract' }
    ],
    returnType: 'Promise<DeploySupplierContractResult>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 89, description: 'Supplier registration' },
      { file: 'frontend/src/components/SupplierRegistration.tsx', line: 123, description: 'Contract deployment' }
    ],
    complexity: 'High',
    importance: 'High'
  },

  // Blockchain Smart Contracts - AgriChainMarketplace
  {
    id: 'listProduct',
    name: 'listProduct',
    category: 'blockchain',
    description: 'Liệt kê sản phẩm trên marketplace blockchain',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 78,
    parameters: [
      { name: 'tokenId', type: 'uint256', description: 'ID của token sản phẩm' },
      { name: 'price', type: 'uint256', description: 'Giá sản phẩm' },
      { name: 'quantity', type: 'uint256', description: 'Số lượng' },
      { name: 'expiryTime', type: 'uint256', description: 'Thời gian hết hạn' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/productService.ts', line: 156, description: 'Product listing service' },
      { file: 'frontend/src/components/ProductList.tsx', line: 34, description: 'List product action' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'buyProduct',
    name: 'buyProduct',
    category: 'blockchain',
    description: 'Mua sản phẩm trực tiếp từ marketplace',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 125,
    parameters: [
      { name: 'listingId', type: 'uint256', description: 'ID của listing' },
      { name: 'quantity', type: 'uint256', description: 'Số lượng mua' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/orderService.ts', line: 78, description: 'Order processing' },
      { file: 'frontend/src/components/ProductCard.tsx', line: 56, description: 'Buy button handler' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'createAuction',
    name: 'createAuction',
    category: 'blockchain',
    description: 'Tạo đấu giá cho sản phẩm',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 178,
    parameters: [
      { name: 'tokenId', type: 'uint256', description: 'ID token sản phẩm' },
      { name: 'startPrice', type: 'uint256', description: 'Giá khởi điểm' },
      { name: 'duration', type: 'uint256', description: 'Thời gian đấu giá' },
      { name: 'quantity', type: 'uint256', description: 'Số lượng' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/AuctionForm.tsx', line: 45, description: 'Create auction form' }
    ],
    complexity: 'High',
    importance: 'Medium'
  },
  {
    id: 'placeBid',
    name: 'placeBid',
    category: 'blockchain',
    description: 'Đặt giá thầu trong đấu giá',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 234,
    parameters: [
      { name: 'auctionId', type: 'uint256', description: 'ID đấu giá' },
      { name: 'bidAmount', type: 'uint256', description: 'Số tiền đấu giá' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/AuctionCard.tsx', line: 67, description: 'Place bid button' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'endAuction',
    name: 'endAuction',
    category: 'blockchain',
    description: 'Kết thúc đấu giá và xác định người thắng',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 289,
    parameters: [
      { name: 'auctionId', type: 'uint256', description: 'ID đấu giá' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/auctionService.ts', line: 45, description: 'Auction management' }
    ],
    complexity: 'High',
    importance: 'Medium'
  },
  {
    id: 'confirmDelivery',
    name: 'confirmDelivery',
    category: 'order',
    description: 'Xác nhận giao hàng thành công',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 345,
    parameters: [
      { name: 'orderId', type: 'uint256', description: 'ID đơn hàng' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/orderController.ts', line: 67, description: 'API endpoint POST /api/orders/:id/confirm' },
      { file: 'frontend/src/components/OrderTracking.tsx', line: 45, description: 'Delivery confirmation' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'raiseDispute',
    name: 'raiseDispute',
    category: 'blockchain',
    description: 'Tạo tranh chấp cho đơn hàng',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 401,
    parameters: [
      { name: 'orderId', type: 'uint256', description: 'ID đơn hàng' },
      { name: 'reason', type: 'string', description: 'Lý do tranh chấp' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/DisputeForm.tsx', line: 34, description: 'Dispute form' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'resolveDispute',
    name: 'resolveDispute',
    category: 'blockchain',
    description: 'Giải quyết tranh chấp (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 456,
    parameters: [
      { name: 'orderId', type: 'uint256', description: 'ID đơn hàng' },
      { name: 'refundApproved', type: 'bool', description: 'Có hoàn tiền không' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 78, description: 'Admin dispute resolution' }
    ],
    complexity: 'High',
    importance: 'High'
  },

  // Blockchain Smart Contracts - AgriChainToken
  {
    id: 'mint',
    name: 'mint',
    category: 'blockchain',
    description: 'Mint token AGRI mới',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 45,
    parameters: [
      { name: 'to', type: 'address', description: 'Địa chỉ nhận token' },
      { name: 'amount', type: 'uint256', description: 'Số lượng token' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/blockchainService.ts', line: 134, description: 'Token minting service' },
      { file: 'frontend/src/components/Wallet.tsx', line: 89, description: 'Token claim' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'addLoyaltyPoints',
    name: 'addLoyaltyPoints',
    category: 'user',
    description: 'Thêm điểm thưởng cho người dùng',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 89,
    parameters: [
      { name: 'user', type: 'address', description: 'Địa chỉ người dùng' },
      { name: 'amount', type: 'uint256', description: 'Số điểm thưởng' },
      { name: 'reason', type: 'string', description: 'Lý do thưởng' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/orderService.ts', line: 145, description: 'Order completion reward' },
      { file: 'frontend/src/components/LoyaltyProgram.tsx', line: 34, description: 'Loyalty program' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'redeemLoyaltyPoints',
    name: 'redeemLoyaltyPoints',
    category: 'user',
    description: 'Đổi điểm thưởng thành token',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 134,
    parameters: [
      { name: 'amount', type: 'uint256', description: 'Số điểm muốn đổi' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/LoyaltyProgram.tsx', line: 67, description: 'Redeem points' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'setupLoyaltyProgram',
    name: 'setupLoyaltyProgram',
    category: 'user',
    description: 'Thiết lập chương trình khách hàng thân thiết',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 178,
    parameters: [
      { name: 'pointsPerPurchase', type: 'uint256', description: 'Điểm mỗi lần mua' },
      { name: 'pointsToDiscount', type: 'uint256', description: 'Điểm để giảm giá' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 123, description: 'Supplier loyalty setup' }
    ],
    complexity: 'Low',
    importance: 'Low'
  },
  {
    id: 'rewardSupplier',
    name: 'rewardSupplier',
    category: 'user',
    description: 'Thưởng token cho nhà cung cấp',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 223,
    parameters: [
      { name: 'supplier', type: 'address', description: 'Địa chỉ nhà cung cấp' },
      { name: 'amount', type: 'uint256', description: 'Số token thưởng' },
      { name: 'reason', type: 'string', description: 'Lý do thưởng' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/supplierService.ts', line: 89, description: 'Supplier reward system' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Blockchain Smart Contracts - AgriChainNFT
  {
    id: 'mintProductNFT',
    name: 'mintProductNFT',
    category: 'blockchain',
    description: 'Mint NFT cho sản phẩm',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 67,
    parameters: [
      { name: 'amount', type: 'uint256', description: 'Số lượng NFT' },
      { name: 'name', type: 'string', description: 'Tên sản phẩm' },
      { name: 'description', type: 'string', description: 'Mô tả sản phẩm' },
      { name: 'category', type: 'string', description: 'Danh mục' },
      { name: 'price', type: 'uint256', description: 'Giá sản phẩm' },
      { name: 'quantity', type: 'uint256', description: 'Số lượng' },
      { name: 'unit', type: 'string', description: 'Đơn vị' },
      { name: 'isOrganic', type: 'bool', description: 'Có phải hữu cơ' },
      { name: 'harvestDate', type: 'uint256', description: 'Ngày thu hoạch' },
      { name: 'location', type: 'string', description: 'Vị trí' },
      { name: 'metadata', type: 'string', description: 'Metadata JSON' }
    ],
    returnType: 'uint256',
    callLocations: [
      { file: 'backend/src/services/productService.ts', line: 89, description: 'Product NFT creation' },
      { file: 'frontend/src/components/ProductForm.tsx', line: 78, description: 'Product creation' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'burnProductNFT',
    name: 'burnProductNFT',
    category: 'blockchain',
    description: 'Đốt NFT khi sản phẩm được bán',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 134,
    parameters: [
      { name: 'tokenId', type: 'uint256', description: 'ID token NFT' },
      { name: 'amount', type: 'uint256', description: 'Số lượng đốt' },
      { name: 'reason', type: 'string', description: 'Lý do đốt' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/orderService.ts', line: 156, description: 'Order completion' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'updateMetadata',
    name: 'updateMetadata',
    category: 'blockchain',
    description: 'Cập nhật metadata của NFT',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 178,
    parameters: [
      { name: 'tokenId', type: 'uint256', description: 'ID token NFT' },
      { name: 'newMetadata', type: 'string', description: 'Metadata mới' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/ProductEdit.tsx', line: 45, description: 'Product update' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'burnNFT',
    name: 'burnNFT',
    category: 'blockchain',
    description: 'Đốt NFT với chữ ký xác thực',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 223,
    parameters: [
      { name: 'tokenId', type: 'uint256', description: 'ID token NFT' },
      { name: 'amount', type: 'uint256', description: 'Số lượng đốt' },
      { name: 'signature', type: 'bytes32', description: 'Chữ ký xác thực' },
      { name: 'user', type: 'address', description: 'Địa chỉ người dùng' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/nftService.ts', line: 67, description: 'NFT management' }
    ],
    complexity: 'High',
    importance: 'Medium'
  },
  {
    id: 'authorizeSupplier',
    name: 'authorizeSupplier',
    category: 'user',
    description: 'Cấp quyền cho nhà cung cấp',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 267,
    parameters: [
      { name: 'supplier', type: 'address', description: 'Địa chỉ nhà cung cấp' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/services/supplierService.ts', line: 45, description: 'Supplier authorization' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'revokeSupplier',
    name: 'revokeSupplier',
    category: 'user',
    description: 'Thu hồi quyền của nhà cung cấp',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 312,
    parameters: [
      { name: 'supplier', type: 'address', description: 'Địa chỉ nhà cung cấp' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 123, description: 'Admin supplier management' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Backend Services - Supplier Service (10 functions)
  {
    id: 'createSupplier',
    name: 'createSupplier',
    category: 'user',
    description: 'Tạo nhà cung cấp mới',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 81,
    parameters: [
      { name: 'input', type: 'CreateSupplierInput', description: 'Thông tin nhà cung cấp' }
    ],
    returnType: 'Promise<Supplier>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 25, description: 'API endpoint POST /api/suppliers' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'listSuppliers',
    name: 'listSuppliers',
    category: 'user',
    description: 'Lấy danh sách nhà cung cấp',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 156,
    parameters: [
      { name: 'params', type: 'SupplierQueryParams', description: 'Tham số tìm kiếm' }
    ],
    returnType: 'Promise<Supplier[]>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 45, description: 'API endpoint GET /api/suppliers' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getSupplierById',
    name: 'getSupplierById',
    category: 'user',
    description: 'Lấy thông tin nhà cung cấp theo ID',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 184,
    parameters: [
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' }
    ],
    returnType: 'Promise<Supplier | null>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 67, description: 'API endpoint GET /api/suppliers/:id' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getSupplierBySlug',
    name: 'getSupplierBySlug',
    category: 'user',
    description: 'Lấy thông tin nhà cung cấp theo slug',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 196,
    parameters: [
      { name: 'slug', type: 'string', description: 'Slug nhà cung cấp' }
    ],
    returnType: 'Promise<Supplier | null>',
    callLocations: [
      { file: 'frontend/src/app/suppliers/[slug]/page.tsx', line: 23, description: 'Supplier profile page' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'updateSupplier',
    name: 'updateSupplier',
    category: 'user',
    description: 'Cập nhật thông tin nhà cung cấp',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 208,
    parameters: [
      { name: 'input', type: 'UpdateSupplierInput', description: 'Thông tin cập nhật' }
    ],
    returnType: 'Promise<Supplier>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 89, description: 'API endpoint PUT /api/suppliers/:id' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'addBrandMember',
    name: 'addBrandMember',
    category: 'user',
    description: 'Thêm thành viên vào thương hiệu',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 234,
    parameters: [
      { name: 'input', type: 'AddBrandMemberInput', description: 'Thông tin thành viên' }
    ],
    returnType: 'Promise<BrandMember>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 111, description: 'API endpoint POST /api/suppliers/:id/members' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'updateBrandMember',
    name: 'updateBrandMember',
    category: 'user',
    description: 'Cập nhật thông tin thành viên thương hiệu',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 268,
    parameters: [
      { name: 'input', type: 'UpdateBrandMemberInput', description: 'Thông tin cập nhật' }
    ],
    returnType: 'Promise<BrandMember>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 133, description: 'API endpoint PUT /api/suppliers/:id/members/:memberId' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'listBrandMembers',
    name: 'listBrandMembers',
    category: 'user',
    description: 'Lấy danh sách thành viên thương hiệu',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 292,
    parameters: [
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' }
    ],
    returnType: 'Promise<BrandMember[]>',
    callLocations: [
      { file: 'backend/src/controllers/supplierController.ts', line: 155, description: 'API endpoint GET /api/suppliers/:id/members' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'getActiveSupplierContract',
    name: 'getActiveSupplierContract',
    category: 'blockchain',
    description: 'Lấy thông tin smart contract đang hoạt động của nhà cung cấp',
    filePath: 'backend/src/services/supplierService.ts',
    lineNumber: 304,
    parameters: [
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' }
    ],
    returnType: 'Promise<SmartContractTemplate | null>',
    callLocations: [
      { file: 'frontend/src/app/supplier/dashboard/page.tsx', line: 45, description: 'Supplier dashboard' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },

  // Backend Services - Loyalty Service (5 functions)
  {
    id: 'getBuyerLoyaltyPoints',
    name: 'getBuyerLoyaltyPoints',
    category: 'user',
    description: 'Lấy điểm thưởng của người mua',
    filePath: 'backend/src/services/loyaltyService.ts',
    lineNumber: 8,
    parameters: [
      { name: 'userId', type: 'string', description: 'ID người dùng' }
    ],
    returnType: 'Promise<number>',
    callLocations: [
      { file: 'frontend/src/components/LoyaltyCard.tsx', line: 23, description: 'Loyalty points display' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'getSupplierLoyaltyProgram',
    name: 'getSupplierLoyaltyProgram',
    category: 'user',
    description: 'Lấy chương trình khách hàng thân thiết của nhà cung cấp',
    filePath: 'backend/src/services/loyaltyService.ts',
    lineNumber: 30,
    parameters: [
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' }
    ],
    returnType: 'Promise<LoyaltyProgram | null>',
    callLocations: [
      { file: 'frontend/src/app/supplier/loyalty/page.tsx', line: 34, description: 'Loyalty program management' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'setSupplierLoyaltyProgram',
    name: 'setSupplierLoyaltyProgram',
    category: 'user',
    description: 'Thiết lập chương trình khách hàng thân thiết',
    filePath: 'backend/src/services/loyaltyService.ts',
    lineNumber: 36,
    parameters: [
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' },
      { name: 'program', type: 'LoyaltyProgramInput', description: 'Thông tin chương trình' }
    ],
    returnType: 'Promise<LoyaltyProgram>',
    callLocations: [
      { file: 'backend/src/controllers/loyaltyController.ts', line: 45, description: 'API endpoint POST /api/loyalty/program' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'addLoyaltyPointsService',
    name: 'addLoyaltyPoints',
    category: 'user',
    description: 'Thêm điểm thưởng cho người dùng (Backend Service)',
    filePath: 'backend/src/services/loyaltyService.ts',
    lineNumber: 79,
    parameters: [
      { name: 'userId', type: 'string', description: 'ID người dùng' },
      { name: 'points', type: 'number', description: 'Số điểm thưởng' },
      { name: 'reason', type: 'string', description: 'Lý do thưởng' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/services/orderService.ts', line: 145, description: 'Order completion reward' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'redeemBuyerPoints',
    name: 'redeemBuyerPoints',
    category: 'user',
    description: 'Đổi điểm thưởng thành giảm giá',
    filePath: 'backend/src/services/loyaltyService.ts',
    lineNumber: 113,
    parameters: [
      { name: 'userId', type: 'string', description: 'ID người dùng' },
      { name: 'points', type: 'number', description: 'Số điểm muốn đổi' }
    ],
    returnType: 'Promise<number>',
    callLocations: [
      { file: 'frontend/src/components/Checkout.tsx', line: 89, description: 'Loyalty points redemption' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },

  // Backend Services - Review Service (4 functions)
  {
    id: 'createReview',
    name: 'createReview',
    category: 'user',
    description: 'Tạo đánh giá sản phẩm',
    filePath: 'backend/src/services/reviewService.ts',
    lineNumber: 14,
    parameters: [
      { name: 'input', type: 'CreateReviewInput', description: 'Thông tin đánh giá' }
    ],
    returnType: 'Promise<Review>',
    callLocations: [
      { file: 'backend/src/controllers/reviewController.ts', line: 25, description: 'API endpoint POST /api/reviews' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'getReviewsByProduct',
    name: 'getReviewsByProduct',
    category: 'product',
    description: 'Lấy đánh giá theo sản phẩm',
    filePath: 'backend/src/services/reviewService.ts',
    lineNumber: 46,
    parameters: [
      { name: 'productId', type: 'string', description: 'ID sản phẩm' }
    ],
    returnType: 'Promise<Review[]>',
    callLocations: [
      { file: 'frontend/src/components/ProductReviews.tsx', line: 34, description: 'Product reviews display' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getReviewsBySupplier',
    name: 'getReviewsBySupplier',
    category: 'user',
    description: 'Lấy đánh giá theo nhà cung cấp',
    filePath: 'backend/src/services/reviewService.ts',
    lineNumber: 56,
    parameters: [
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' }
    ],
    returnType: 'Promise<Review[]>',
    callLocations: [
      { file: 'frontend/src/app/suppliers/[slug]/page.tsx', line: 67, description: 'Supplier reviews' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'moderateReview',
    name: 'moderateReview',
    category: 'user',
    description: 'Kiểm duyệt đánh giá (admin)',
    filePath: 'backend/src/services/reviewService.ts',
    lineNumber: 66,
    parameters: [
      { name: 'reviewId', type: 'string', description: 'ID đánh giá' },
      { name: 'status', type: 'ReviewStatus', description: 'Trạng thái mới' },
      { name: 'moderatorId', type: 'string', description: 'ID người kiểm duyệt' }
    ],
    returnType: 'Promise<Review>',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 145, description: 'Admin review moderation' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Backend Services - Delivery Confirmation Service (5 functions)
  {
    id: 'confirmDeliveryService',
    name: 'confirmDelivery',
    category: 'order',
    description: 'Xác nhận giao hàng thành công (Backend Service)',
    filePath: 'backend/src/services/deliveryConfirmationService.ts',
    lineNumber: 35,
    parameters: [
      { name: 'input', type: 'DeliveryConfirmationInput', description: 'Thông tin xác nhận giao hàng' }
    ],
    returnType: 'Promise<DeliveryConfirmationResult>',
    callLocations: [
      { file: 'backend/src/controllers/deliveryConfirmationController.ts', line: 14, description: 'API endpoint POST /api/delivery/confirm' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'burnNFTService',
    name: 'burnNFT',
    category: 'blockchain',
    description: 'Đốt NFT sau khi xác nhận giao hàng (Backend Service)',
    filePath: 'backend/src/services/deliveryConfirmationService.ts',
    lineNumber: 112,
    parameters: [
      { name: 'orderId', type: 'string', description: 'ID đơn hàng' },
      { name: 'userId', type: 'string', description: 'ID người dùng' }
    ],
    returnType: 'Promise<{ txHash: string; status: string }>',
    callLocations: [
      { file: 'backend/src/controllers/deliveryConfirmationController.ts', line: 80, description: 'API endpoint POST /api/delivery/burn-nft' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'completeDeliveryConfirmation',
    name: 'completeDeliveryConfirmation',
    category: 'order',
    description: 'Hoàn tất quá trình xác nhận giao hàng',
    filePath: 'backend/src/services/deliveryConfirmationService.ts',
    lineNumber: 217,
    parameters: [
      { name: 'orderId', type: 'string', description: 'ID đơn hàng' },
      { name: 'userId', type: 'string', description: 'ID người dùng' }
    ],
    returnType: 'Promise<DeliveryConfirmationResult>',
    callLocations: [
      { file: 'backend/src/controllers/deliveryConfirmationController.ts', line: 110, description: 'API endpoint POST /api/delivery/complete' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'getDeliveryConfirmation',
    name: 'getDeliveryConfirmation',
    category: 'order',
    description: 'Lấy thông tin xác nhận giao hàng',
    filePath: 'backend/src/services/deliveryConfirmationService.ts',
    lineNumber: 267,
    parameters: [
      { name: 'orderId', type: 'string', description: 'ID đơn hàng' },
      { name: 'userId', type: 'string', description: 'ID người dùng' }
    ],
    returnType: 'Promise<DeliveryConfirmationResult | null>',
    callLocations: [
      { file: 'backend/src/controllers/deliveryConfirmationController.ts', line: 140, description: 'API endpoint GET /api/delivery/:orderId/:userId' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'getUserDeliveryConfirmations',
    name: 'getUserDeliveryConfirmations',
    category: 'order',
    description: 'Lấy danh sách xác nhận giao hàng của người dùng',
    filePath: 'backend/src/services/deliveryConfirmationService.ts',
    lineNumber: 300,
    parameters: [
      { name: 'userId', type: 'string', description: 'ID người dùng' }
    ],
    returnType: 'Promise<DeliveryConfirmationResult[]>',
    callLocations: [
      { file: 'backend/src/controllers/deliveryConfirmationController.ts', line: 176, description: 'API endpoint GET /api/delivery/user/:userId' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Frontend Components
  {
    id: 'useWallet',
    name: 'useWallet',
    category: 'frontend',
    description: 'Hook quản lý kết nối ví MetaMask',
    filePath: 'frontend/src/contexts/WalletContext.tsx',
    lineNumber: 15,
    parameters: [],
    returnType: 'WalletContextType',
    callLocations: [
      { file: 'frontend/src/components/Header.tsx', line: 23, description: 'Wallet connection' },
      { file: 'frontend/src/app/page.tsx', line: 12, description: 'Home page wallet check' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'useTranslation',
    name: 'useTranslation',
    category: 'frontend',
    description: 'Hook quản lý đa ngôn ngữ',
    filePath: 'frontend/src/hooks/useTranslation.ts',
    lineNumber: 8,
    parameters: [],
    returnType: 'TranslationHook',
    callLocations: [
      { file: 'frontend/src/components/Header.tsx', line: 45, description: 'Language switching' },
      { file: 'frontend/src/app/page.tsx', line: 34, description: 'Home page translations' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'connectWallet',
    name: 'connectWallet',
    category: 'frontend',
    description: 'Kết nối ví MetaMask',
    filePath: 'frontend/src/contexts/WalletContext.tsx',
    lineNumber: 45,
    parameters: [],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'frontend/src/components/Header.tsx', line: 67, description: 'Connect button' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'disconnectWallet',
    name: 'disconnectWallet',
    category: 'frontend',
    description: 'Ngắt kết nối ví',
    filePath: 'frontend/src/contexts/WalletContext.tsx',
    lineNumber: 78,
    parameters: [],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/Header.tsx', line: 89, description: 'Disconnect button' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Additional Smart Contract Functions - AgriChainMarketplace
  {
    id: 'getOrder',
    name: 'getOrder',
    category: 'blockchain',
    description: 'Lấy thông tin đơn hàng từ blockchain',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 426,
    parameters: [
      { name: 'orderId', type: 'uint256', description: 'ID đơn hàng' }
    ],
    returnType: 'Order',
    callLocations: [
      { file: 'frontend/src/components/OrderDetails.tsx', line: 34, description: 'Order details display' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getUserOrdersBlockchain',
    name: 'getUserOrders',
    category: 'blockchain',
    description: 'Lấy danh sách đơn hàng của người dùng từ blockchain',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 435,
    parameters: [
      { name: 'user', type: 'address', description: 'Địa chỉ người dùng' }
    ],
    returnType: 'uint256[]',
    callLocations: [
      { file: 'frontend/src/app/purchased-products/page.tsx', line: 45, description: 'User orders page' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getSupplierOrders',
    name: 'getSupplierOrders',
    category: 'blockchain',
    description: 'Lấy danh sách đơn hàng của nhà cung cấp từ blockchain',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 444,
    parameters: [
      { name: 'supplier', type: 'address', description: 'Địa chỉ nhà cung cấp' }
    ],
    returnType: 'uint256[]',
    callLocations: [
      { file: 'frontend/src/app/supplier/orders/page.tsx', line: 34, description: 'Supplier orders management' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getAuctionBids',
    name: 'getAuctionBids',
    category: 'blockchain',
    description: 'Lấy danh sách giá thầu trong đấu giá',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 453,
    parameters: [
      { name: 'auctionId', type: 'uint256', description: 'ID đấu giá' }
    ],
    returnType: 'Bid[]',
    callLocations: [
      { file: 'frontend/src/components/AuctionDetails.tsx', line: 67, description: 'Auction bids display' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'setPlatformFee',
    name: 'setPlatformFee',
    category: 'blockchain',
    description: 'Thiết lập phí nền tảng (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 461,
    parameters: [
      { name: 'newFee', type: 'uint256', description: 'Phí mới' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 67, description: 'Admin platform settings' }
    ],
    complexity: 'Low',
    importance: 'Low'
  },
  {
    id: 'marketplacePause',
    name: 'pause',
    category: 'blockchain',
    description: 'Tạm dừng marketplace (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 469,
    parameters: [],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 89, description: 'Emergency pause' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'marketplaceUnpause',
    name: 'unpause',
    category: 'blockchain',
    description: 'Tiếp tục hoạt động marketplace (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 476,
    parameters: [],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 111, description: 'Resume operations' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'withdrawStuckTokens',
    name: 'withdrawStuckTokens',
    category: 'blockchain',
    description: 'Rút token bị kẹt (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainMarketplace.sol',
    lineNumber: 485,
    parameters: [
      { name: 'token', type: 'address', description: 'Địa chỉ token' },
      { name: 'amount', type: 'uint256', description: 'Số lượng token' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 133, description: 'Token recovery' }
    ],
    complexity: 'Medium',
    importance: 'Low'
  },

  // Additional Smart Contract Functions - AgriChainToken
  {
    id: 'getLoyaltyPoints',
    name: 'getLoyaltyPoints',
    category: 'user',
    description: 'Lấy số điểm thưởng của người dùng',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 127,
    parameters: [
      { name: 'user', type: 'address', description: 'Địa chỉ người dùng' }
    ],
    returnType: 'uint256',
    callLocations: [
      { file: 'frontend/src/components/LoyaltyCard.tsx', line: 45, description: 'Loyalty points display' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getLoyaltyProgram',
    name: 'getLoyaltyProgram',
    category: 'user',
    description: 'Lấy thông tin chương trình khách hàng thân thiết',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 136,
    parameters: [
      { name: 'supplier', type: 'address', description: 'Địa chỉ nhà cung cấp' }
    ],
    returnType: 'LoyaltyProgram',
    callLocations: [
      { file: 'frontend/src/app/supplier/loyalty/page.tsx', line: 67, description: 'Loyalty program display' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'addAuthorizedMinter',
    name: 'addAuthorizedMinter',
    category: 'blockchain',
    description: 'Thêm địa chỉ được phép mint token (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 148,
    parameters: [
      { name: 'minter', type: 'address', description: 'Địa chỉ minter' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 155, description: 'Admin minter management' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'removeAuthorizedMinter',
    name: 'removeAuthorizedMinter',
    category: 'blockchain',
    description: 'Xóa quyền mint token (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 156,
    parameters: [
      { name: 'minter', type: 'address', description: 'Địa chỉ minter' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 177, description: 'Admin minter management' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'tokenPause',
    name: 'pause',
    category: 'blockchain',
    description: 'Tạm dừng token contract (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 163,
    parameters: [],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 199, description: 'Emergency pause' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'tokenUnpause',
    name: 'unpause',
    category: 'blockchain',
    description: 'Tiếp tục hoạt động token contract (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 170,
    parameters: [],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 221, description: 'Resume operations' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'transfer',
    name: 'transfer',
    category: 'blockchain',
    description: 'Chuyển token AGRI',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 177,
    parameters: [
      { name: 'to', type: 'address', description: 'Địa chỉ nhận' },
      { name: 'amount', type: 'uint256', description: 'Số lượng token' }
    ],
    returnType: 'bool',
    callLocations: [
      { file: 'frontend/src/components/TokenTransfer.tsx', line: 34, description: 'Token transfer form' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'transferFrom',
    name: 'transferFrom',
    category: 'blockchain',
    description: 'Chuyển token AGRI từ địa chỉ khác',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 189,
    parameters: [
      { name: 'from', type: 'address', description: 'Địa chỉ gửi' },
      { name: 'to', type: 'address', description: 'Địa chỉ nhận' },
      { name: 'amount', type: 'uint256', description: 'Số lượng token' }
    ],
    returnType: 'bool',
    callLocations: [
      { file: 'backend/src/services/orderService.ts', line: 89, description: 'Order payment processing' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'burn',
    name: 'burn',
    category: 'blockchain',
    description: 'Đốt token AGRI',
    filePath: 'blockchain/contracts/AgriChainToken.sol',
    lineNumber: 202,
    parameters: [
      { name: 'amount', type: 'uint256', description: 'Số lượng token đốt' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/TokenBurn.tsx', line: 45, description: 'Token burn form' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Additional Smart Contract Functions - AgriChainNFT
  {
    id: 'getProductInfo',
    name: 'getProductInfo',
    category: 'blockchain',
    description: 'Lấy thông tin sản phẩm từ NFT',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 187,
    parameters: [
      { name: 'tokenId', type: 'uint256', description: 'ID token NFT' }
    ],
    returnType: 'ProductInfo',
    callLocations: [
      { file: 'frontend/src/components/ProductCard.tsx', line: 78, description: 'Product information display' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getSupplierProducts',
    name: 'getSupplierProducts',
    category: 'blockchain',
    description: 'Lấy danh sách sản phẩm của nhà cung cấp',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 201,
    parameters: [
      { name: 'supplier', type: 'address', description: 'Địa chỉ nhà cung cấp' }
    ],
    returnType: 'uint256[]',
    callLocations: [
      { file: 'frontend/src/app/supplier/products/page.tsx', line: 45, description: 'Supplier products management' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'setBaseURI',
    name: 'setBaseURI',
    category: 'blockchain',
    description: 'Thiết lập base URI cho metadata (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 231,
    parameters: [
      { name: '_baseURI', type: 'string', description: 'Base URI mới' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 243, description: 'Admin NFT settings' }
    ],
    complexity: 'Low',
    importance: 'Low'
  },
  {
    id: 'setContractURI',
    name: 'setContractURI',
    category: 'blockchain',
    description: 'Thiết lập contract URI (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 239,
    parameters: [
      { name: '_contractURI', type: 'string', description: 'Contract URI mới' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 265, description: 'Admin NFT settings' }
    ],
    complexity: 'Low',
    importance: 'Low'
  },
  {
    id: 'contractURI',
    name: 'contractURI',
    category: 'blockchain',
    description: 'Lấy contract URI',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 274,
    parameters: [],
    returnType: 'string',
    callLocations: [
      { file: 'frontend/src/components/NFTMetadata.tsx', line: 23, description: 'NFT metadata display' }
    ],
    complexity: 'Low',
    importance: 'Low'
  },
  {
    id: 'uri',
    name: 'uri',
    category: 'blockchain',
    description: 'Lấy URI metadata của token',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 283,
    parameters: [
      { name: 'tokenId', type: 'uint256', description: 'ID token NFT' }
    ],
    returnType: 'string',
    callLocations: [
      { file: 'frontend/src/components/NFTViewer.tsx', line: 45, description: 'NFT metadata retrieval' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'nftPause',
    name: 'pause',
    category: 'blockchain',
    description: 'Tạm dừng NFT contract (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 296,
    parameters: [],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 287, description: 'Emergency pause' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'nftUnpause',
    name: 'unpause',
    category: 'blockchain',
    description: 'Tiếp tục hoạt động NFT contract (chỉ admin)',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 303,
    parameters: [],
    returnType: 'void',
    callLocations: [
      { file: 'backend/src/controllers/adminController.ts', line: 309, description: 'Resume operations' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'safeTransferFrom',
    name: 'safeTransferFrom',
    category: 'blockchain',
    description: 'Chuyển NFT an toàn',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 310,
    parameters: [
      { name: 'from', type: 'address', description: 'Địa chỉ gửi' },
      { name: 'to', type: 'address', description: 'Địa chỉ nhận' },
      { name: 'id', type: 'uint256', description: 'ID token NFT' },
      { name: 'amount', type: 'uint256', description: 'Số lượng' },
      { name: 'data', type: 'bytes', description: 'Dữ liệu bổ sung' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/NFTTransfer.tsx', line: 67, description: 'NFT transfer form' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'safeBatchTransferFrom',
    name: 'safeBatchTransferFrom',
    category: 'blockchain',
    description: 'Chuyển nhiều NFT cùng lúc',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 323,
    parameters: [
      { name: 'from', type: 'address', description: 'Địa chỉ gửi' },
      { name: 'to', type: 'address', description: 'Địa chỉ nhận' },
      { name: 'ids', type: 'uint256[]', description: 'Danh sách ID token' },
      { name: 'amounts', type: 'uint256[]', description: 'Danh sách số lượng' },
      { name: 'data', type: 'bytes', description: 'Dữ liệu bổ sung' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/BatchNFTTransfer.tsx', line: 89, description: 'Batch NFT transfer' }
    ],
    complexity: 'High',
    importance: 'Medium'
  },
  {
    id: 'isAuthorizedSupplier',
    name: 'isAuthorizedSupplier',
    category: 'blockchain',
    description: 'Kiểm tra nhà cung cấp có được ủy quyền không',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 338,
    parameters: [
      { name: 'supplier', type: 'address', description: 'Địa chỉ nhà cung cấp' }
    ],
    returnType: 'bool',
    callLocations: [
      { file: 'frontend/src/components/SupplierStatus.tsx', line: 34, description: 'Supplier authorization check' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getTotalProducts',
    name: 'getTotalProducts',
    category: 'blockchain',
    description: 'Lấy tổng số sản phẩm đã mint',
    filePath: 'blockchain/contracts/AgriChainNFT.sol',
    lineNumber: 346,
    parameters: [],
    returnType: 'uint256',
    callLocations: [
      { file: 'frontend/src/components/StatsCard.tsx', line: 56, description: 'Platform statistics' }
    ],
    complexity: 'Low',
    importance: 'Low'
  },

  // Additional Frontend Functions
  {
    id: 'formatBalance',
    name: 'formatBalance',
    category: 'frontend',
    description: 'Định dạng số dư token',
    filePath: 'frontend/src/utils/blockchain.ts',
    lineNumber: 109,
    parameters: [
      { name: 'balance', type: 'string', description: 'Số dư token' }
    ],
    returnType: 'string',
    callLocations: [
      { file: 'frontend/src/components/WalletBalance.tsx', line: 23, description: 'Balance display' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'changeLocale',
    name: 'changeLocale',
    category: 'frontend',
    description: 'Thay đổi ngôn ngữ ứng dụng',
    filePath: 'frontend/src/contexts/I18nContext.tsx',
    lineNumber: 444,
    parameters: [
      { name: 'newLocale', type: 'string', description: 'Mã ngôn ngữ mới' }
    ],
    returnType: 'void',
    callLocations: [
      { file: 'frontend/src/components/LanguageSwitcher.tsx', line: 34, description: 'Language switching' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 't',
    name: 't',
    category: 'frontend',
    description: 'Hàm dịch thuật',
    filePath: 'frontend/src/contexts/I18nContext.tsx',
    lineNumber: 450,
    parameters: [
      { name: 'key', type: 'string', description: 'Khóa dịch thuật' },
      { name: 'params', type: 'Record<string, any>', description: 'Tham số thay thế' }
    ],
    returnType: 'string',
    callLocations: [
      { file: 'frontend/src/app/page.tsx', line: 12, description: 'Home page translations' }
    ],
    complexity: 'Low',
    importance: 'High'
  },

  // Backend Controllers - Product Controller (6 functions)
  {
    id: 'createProductHandler',
    name: 'createProductHandler',
    category: 'product',
    description: 'API handler tạo sản phẩm mới',
    filePath: 'backend/src/controllers/productController.ts',
    lineNumber: 43,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/product.ts', line: 15, description: 'POST /api/products route' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'getAllProductsHandler',
    name: 'getAllProductsHandler',
    category: 'product',
    description: 'API handler lấy danh sách sản phẩm',
    filePath: 'backend/src/controllers/productController.ts',
    lineNumber: 122,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/product.ts', line: 8, description: 'GET /api/products route' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getProductByIdHandler',
    name: 'getProductByIdHandler',
    category: 'product',
    description: 'API handler lấy sản phẩm theo ID',
    filePath: 'backend/src/controllers/productController.ts',
    lineNumber: 132,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/product.ts', line: 22, description: 'GET /api/products/:id route' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'listMarketplaceProductsHandler',
    name: 'listMarketplaceProductsHandler',
    category: 'product',
    description: 'API handler lấy sản phẩm marketplace',
    filePath: 'backend/src/controllers/productController.ts',
    lineNumber: 150,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/product.ts', line: 30, description: 'GET /api/products/marketplace route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'prepareProductMintHandler',
    name: 'prepareProductMintHandler',
    category: 'product',
    description: 'API handler chuẩn bị mint NFT sản phẩm',
    filePath: 'backend/src/controllers/productController.ts',
    lineNumber: 159,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/product.ts', line: 38, description: 'POST /api/products/mint/prepare route' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'confirmProductMintHandler',
    name: 'confirmProductMintHandler',
    category: 'product',
    description: 'API handler xác nhận mint NFT sản phẩm',
    filePath: 'backend/src/controllers/productController.ts',
    lineNumber: 175,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/product.ts', line: 46, description: 'POST /api/products/mint/confirm route' }
    ],
    complexity: 'High',
    importance: 'High'
  },

  // Backend Controllers - Order Controller (2 functions)
  {
    id: 'createOrderHandler',
    name: 'createOrderHandler',
    category: 'order',
    description: 'API handler tạo đơn hàng mới',
    filePath: 'backend/src/controllers/orderController.ts',
    lineNumber: 11,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/order.ts', line: 8, description: 'POST /api/orders route' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'getUserOrdersHandler',
    name: 'getUserOrdersHandler',
    category: 'order',
    description: 'API handler lấy đơn hàng của người dùng',
    filePath: 'backend/src/controllers/orderController.ts',
    lineNumber: 75,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/order.ts', line: 15, description: 'GET /api/orders/user/:userId route' }
    ],
    complexity: 'Low',
    importance: 'High'
  },

  // Backend Controllers - Supplier Controller (10 functions)
  {
    id: 'createSupplierHandler',
    name: 'createSupplierHandler',
    category: 'user',
    description: 'API handler tạo nhà cung cấp mới',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 25,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 8, description: 'POST /api/suppliers route' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'listSuppliersHandler',
    name: 'listSuppliersHandler',
    category: 'user',
    description: 'API handler lấy danh sách nhà cung cấp',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 66,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 15, description: 'GET /api/suppliers route' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getSupplierByIdHandler',
    name: 'getSupplierByIdHandler',
    category: 'user',
    description: 'API handler lấy nhà cung cấp theo ID',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 90,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 22, description: 'GET /api/suppliers/:id route' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getSupplierBySlugHandler',
    name: 'getSupplierBySlugHandler',
    category: 'user',
    description: 'API handler lấy nhà cung cấp theo slug',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 108,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 29, description: 'GET /api/suppliers/slug/:slug route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'updateSupplierHandler',
    name: 'updateSupplierHandler',
    category: 'user',
    description: 'API handler cập nhật nhà cung cấp',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 126,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 36, description: 'PUT /api/suppliers/:id route' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'listBrandMembersHandler',
    name: 'listBrandMembersHandler',
    category: 'user',
    description: 'API handler lấy danh sách thành viên thương hiệu',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 154,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 43, description: 'GET /api/suppliers/:id/members route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'addBrandMemberHandler',
    name: 'addBrandMemberHandler',
    category: 'user',
    description: 'API handler thêm thành viên thương hiệu',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 168,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 50, description: 'POST /api/suppliers/:id/members route' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'updateBrandMemberHandler',
    name: 'updateBrandMemberHandler',
    category: 'user',
    description: 'API handler cập nhật thành viên thương hiệu',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 190,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 57, description: 'PUT /api/suppliers/:id/members/:memberId route' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'deploySupplierContractHandler',
    name: 'deploySupplierContractHandler',
    category: 'blockchain',
    description: 'API handler triển khai smart contract cho nhà cung cấp',
    filePath: 'backend/src/controllers/supplierController.ts',
    lineNumber: 213,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/supplier.ts', line: 64, description: 'POST /api/suppliers/:id/deploy-contract route' }
    ],
    complexity: 'High',
    importance: 'High'
  },

  // Backend Controllers - Review Controller (4 functions)
  {
    id: 'createReviewHandler',
    name: 'createReviewHandler',
    category: 'user',
    description: 'API handler tạo đánh giá sản phẩm',
    filePath: 'backend/src/controllers/reviewController.ts',
    lineNumber: 16,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/review.ts', line: 8, description: 'POST /api/reviews route' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'getReviewsByProductHandler',
    name: 'getReviewsByProductHandler',
    category: 'product',
    description: 'API handler lấy đánh giá theo sản phẩm',
    filePath: 'backend/src/controllers/reviewController.ts',
    lineNumber: 38,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/review.ts', line: 15, description: 'GET /api/reviews/product/:productId route' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getReviewsBySupplierHandler',
    name: 'getReviewsBySupplierHandler',
    category: 'user',
    description: 'API handler lấy đánh giá theo nhà cung cấp',
    filePath: 'backend/src/controllers/reviewController.ts',
    lineNumber: 52,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/review.ts', line: 22, description: 'GET /api/reviews/supplier/:supplierId route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'moderateReviewHandler',
    name: 'moderateReviewHandler',
    category: 'user',
    description: 'API handler kiểm duyệt đánh giá (admin)',
    filePath: 'backend/src/controllers/reviewController.ts',
    lineNumber: 66,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/review.ts', line: 29, description: 'PUT /api/reviews/:id/moderate route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Backend Controllers - Loyalty Controller (4 functions)
  {
    id: 'getBuyerLoyaltyPointsHandler',
    name: 'getBuyerLoyaltyPointsHandler',
    category: 'user',
    description: 'API handler lấy điểm thưởng của người mua',
    filePath: 'backend/src/controllers/loyaltyController.ts',
    lineNumber: 9,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/loyalty.ts', line: 8, description: 'GET /api/loyalty/points/:userId route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'getSupplierLoyaltyProgramHandler',
    name: 'getSupplierLoyaltyProgramHandler',
    category: 'user',
    description: 'API handler lấy chương trình khách hàng thân thiết',
    filePath: 'backend/src/controllers/loyaltyController.ts',
    lineNumber: 23,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/loyalty.ts', line: 15, description: 'GET /api/loyalty/program/:supplierId route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'setSupplierLoyaltyProgramHandler',
    name: 'setSupplierLoyaltyProgramHandler',
    category: 'user',
    description: 'API handler thiết lập chương trình khách hàng thân thiết',
    filePath: 'backend/src/controllers/loyaltyController.ts',
    lineNumber: 37,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/loyalty.ts', line: 22, description: 'POST /api/loyalty/program route' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'redeemBuyerPointsHandler',
    name: 'redeemBuyerPointsHandler',
    category: 'user',
    description: 'API handler đổi điểm thưởng thành giảm giá',
    filePath: 'backend/src/controllers/loyaltyController.ts',
    lineNumber: 63,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/loyalty.ts', line: 29, description: 'POST /api/loyalty/redeem route' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },

  // Backend Controllers - Delivery Confirmation Controller (5 functions)
  {
    id: 'confirmDeliveryHandler',
    name: 'confirmDeliveryHandler',
    category: 'order',
    description: 'API handler xác nhận giao hàng',
    filePath: 'backend/src/controllers/deliveryConfirmationController.ts',
    lineNumber: 14,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/deliveryConfirmation.ts', line: 8, description: 'POST /api/delivery/confirm route' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'burnNFTHandler',
    name: 'burnNFTHandler',
    category: 'blockchain',
    description: 'API handler đốt NFT sau giao hàng',
    filePath: 'backend/src/controllers/deliveryConfirmationController.ts',
    lineNumber: 80,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/deliveryConfirmation.ts', line: 15, description: 'POST /api/delivery/burn-nft route' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'completeDeliveryConfirmationHandler',
    name: 'completeDeliveryConfirmationHandler',
    category: 'order',
    description: 'API handler hoàn tất xác nhận giao hàng',
    filePath: 'backend/src/controllers/deliveryConfirmationController.ts',
    lineNumber: 110,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/deliveryConfirmation.ts', line: 22, description: 'POST /api/delivery/complete route' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'getDeliveryConfirmationHandler',
    name: 'getDeliveryConfirmationHandler',
    category: 'order',
    description: 'API handler lấy thông tin xác nhận giao hàng',
    filePath: 'backend/src/controllers/deliveryConfirmationController.ts',
    lineNumber: 140,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/deliveryConfirmation.ts', line: 29, description: 'GET /api/delivery/:orderId/:userId route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'getUserDeliveryConfirmationsHandler',
    name: 'getUserDeliveryConfirmationsHandler',
    category: 'order',
    description: 'API handler lấy danh sách xác nhận giao hàng của người dùng',
    filePath: 'backend/src/controllers/deliveryConfirmationController.ts',
    lineNumber: 176,
    parameters: [
      { name: 'req', type: 'Request', description: 'HTTP request object' },
      { name: 'res', type: 'Response', description: 'HTTP response object' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'backend/src/routes/deliveryConfirmation.ts', line: 36, description: 'GET /api/delivery/user/:userId route' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },

  // Frontend Utility Functions - API Utils (14 functions)
  {
    id: 'fetchMarketplaceListings',
    name: 'fetchMarketplaceListings',
    category: 'frontend',
    description: 'Lấy danh sách sản phẩm từ marketplace',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 181,
    parameters: [],
    returnType: 'Promise<MarketplaceListingItem[]>',
    callLocations: [
      { file: 'frontend/src/app/marketplace/page.tsx', line: 23, description: 'Marketplace page data loading' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'fetchProducts',
    name: 'fetchProducts',
    category: 'frontend',
    description: 'Lấy danh sách tất cả sản phẩm',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 212,
    parameters: [],
    returnType: 'Promise<ProductDetail[]>',
    callLocations: [
      { file: 'frontend/src/app/products/page.tsx', line: 34, description: 'Products page data loading' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'fetchProductDetail',
    name: 'fetchProductDetail',
    category: 'frontend',
    description: 'Lấy chi tiết sản phẩm theo ID',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 216,
    parameters: [
      { name: 'id', type: 'string', description: 'ID sản phẩm' }
    ],
    returnType: 'Promise<ProductDetail>',
    callLocations: [
      { file: 'frontend/src/app/products/[id]/page.tsx', line: 45, description: 'Product detail page' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'fetchReviews',
    name: 'fetchReviews',
    category: 'frontend',
    description: 'Lấy đánh giá sản phẩm hoặc nhà cung cấp',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 220,
    parameters: [
      { name: 'params', type: '{ productId?: string; supplierId?: string }', description: 'Tham số lọc đánh giá' }
    ],
    returnType: 'Promise<Review[]>',
    callLocations: [
      { file: 'frontend/src/components/ProductReviews.tsx', line: 23, description: 'Product reviews component' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'fetchSupplierDetail',
    name: 'fetchSupplierDetail',
    category: 'frontend',
    description: 'Lấy chi tiết nhà cung cấp',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 227,
    parameters: [
      { name: 'id', type: 'string', description: 'ID nhà cung cấp' }
    ],
    returnType: 'Promise<SupplierDetail>',
    callLocations: [
      { file: 'frontend/src/app/suppliers/[id]/page.tsx', line: 34, description: 'Supplier detail page' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'prepareProductMintFrontend',
    name: 'prepareProductMint',
    category: 'frontend',
    description: 'Chuẩn bị mint NFT sản phẩm (Frontend)',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 231,
    parameters: [
      { name: 'productId', type: 'string', description: 'ID sản phẩm' }
    ],
    returnType: 'Promise<MintPreparationPayload>',
    callLocations: [
      { file: 'frontend/src/app/supplier/mint-nft/page.tsx', line: 67, description: 'NFT minting page' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'confirmProductMintFrontend',
    name: 'confirmProductMint',
    category: 'frontend',
    description: 'Xác nhận mint NFT sản phẩm (Frontend)',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 237,
    parameters: [
      { name: 'productId', type: 'string', description: 'ID sản phẩm' },
      { name: 'payload', type: 'ConfirmMintPayload', description: 'Dữ liệu xác nhận mint' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'frontend/src/app/supplier/mint-nft/page.tsx', line: 89, description: 'NFT minting confirmation' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'createOrderFrontend',
    name: 'createOrder',
    category: 'frontend',
    description: 'Tạo đơn hàng mới (Frontend)',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 244,
    parameters: [
      { name: 'payload', type: 'CreateOrderPayload', description: 'Dữ liệu đơn hàng' }
    ],
    returnType: 'Promise<Order>',
    callLocations: [
      { file: 'frontend/src/components/Checkout.tsx', line: 45, description: 'Checkout process' }
    ],
    complexity: 'High',
    importance: 'High'
  },
  {
    id: 'fetchLoyalty',
    name: 'fetchLoyalty',
    category: 'frontend',
    description: 'Lấy thông tin chương trình khách hàng thân thiết',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 251,
    parameters: [
      { name: 'buyerId', type: 'string', description: 'ID người mua' }
    ],
    returnType: 'Promise<LoyaltyInfo>',
    callLocations: [
      { file: 'frontend/src/app/loyalty/page.tsx', line: 23, description: 'Loyalty page' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'redeemLoyalty',
    name: 'redeemLoyalty',
    category: 'frontend',
    description: 'Đổi điểm thưởng thành giảm giá (Frontend)',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 255,
    parameters: [
      { name: 'buyerId', type: 'string', description: 'ID người mua' },
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' },
      { name: 'points', type: 'number', description: 'Số điểm muốn đổi' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'frontend/src/components/LoyaltyCard.tsx', line: 67, description: 'Loyalty redemption' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'submitReview',
    name: 'submitReview',
    category: 'frontend',
    description: 'Gửi đánh giá sản phẩm hoặc nhà cung cấp',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 262,
    parameters: [
      { name: 'review', type: '{ userId: string; rating: number; comment: string; productId?: string; supplierId?: string }', description: 'Dữ liệu đánh giá' }
    ],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'frontend/src/components/ReviewForm.tsx', line: 45, description: 'Review submission' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'fetchProfile',
    name: 'fetchProfile',
    category: 'frontend',
    description: 'Lấy thông tin profile người dùng',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 269,
    parameters: [
      { name: 'userId', type: 'string', description: 'ID người dùng' }
    ],
    returnType: 'Promise<UserProfile>',
    callLocations: [
      { file: 'frontend/src/app/profile/page.tsx', line: 23, description: 'User profile page' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  },
  {
    id: 'fetchEvents',
    name: 'fetchEvents',
    category: 'frontend',
    description: 'Lấy danh sách sự kiện',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 273,
    parameters: [],
    returnType: 'Promise<Event[]>',
    callLocations: [
      { file: 'frontend/src/app/events/page.tsx', line: 23, description: 'Events page' }
    ],
    complexity: 'Low',
    importance: 'Low'
  },
  {
    id: 'deploySupplierContractFrontend',
    name: 'deploySupplierContract',
    category: 'frontend',
    description: 'Triển khai smart contract cho nhà cung cấp (Frontend)',
    filePath: 'frontend/src/utils/api.ts',
    lineNumber: 277,
    parameters: [
      { name: 'supplierId', type: 'string', description: 'ID nhà cung cấp' },
      { name: 'body', type: '{ force?: boolean; baseUri?: string; contractUri?: string; name?: string; description?: string }', description: 'Tham số triển khai' }
    ],
    returnType: 'Promise<ContractDeploymentResult>',
    callLocations: [
      { file: 'frontend/src/app/supplier/deploy/page.tsx', line: 45, description: 'Contract deployment page' }
    ],
    complexity: 'High',
    importance: 'High'
  },

  // Frontend Utility Functions - Blockchain Utils (6 functions)
  {
    id: 'connectWalletBlockchain',
    name: 'connectWallet',
    category: 'frontend',
    description: 'Kết nối ví MetaMask (Blockchain Utils)',
    filePath: 'frontend/src/utils/blockchain.ts',
    lineNumber: 29,
    parameters: [],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'frontend/src/contexts/WalletContext.tsx', line: 45, description: 'Wallet connection context' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'switchToMumbai',
    name: 'switchToMumbai',
    category: 'frontend',
    description: 'Chuyển sang mạng Mumbai Testnet',
    filePath: 'frontend/src/utils/blockchain.ts',
    lineNumber: 50,
    parameters: [],
    returnType: 'Promise<void>',
    callLocations: [
      { file: 'frontend/src/components/NetworkSwitcher.tsx', line: 23, description: 'Network switching component' }
    ],
    complexity: 'Medium',
    importance: 'Medium'
  },
  {
    id: 'isWalletConnected',
    name: 'isWalletConnected',
    category: 'frontend',
    description: 'Kiểm tra ví có được kết nối không',
    filePath: 'frontend/src/utils/blockchain.ts',
    lineNumber: 75,
    parameters: [],
    returnType: 'Promise<boolean>',
    callLocations: [
      { file: 'frontend/src/contexts/WalletContext.tsx', line: 67, description: 'Wallet status check' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getCurrentAccount',
    name: 'getCurrentAccount',
    category: 'frontend',
    description: 'Lấy địa chỉ tài khoản hiện tại',
    filePath: 'frontend/src/utils/blockchain.ts',
    lineNumber: 86,
    parameters: [],
    returnType: 'Promise<string | null>',
    callLocations: [
      { file: 'frontend/src/components/WalletInfo.tsx', line: 34, description: 'Wallet info display' }
    ],
    complexity: 'Low',
    importance: 'High'
  },
  {
    id: 'getAccountBalance',
    name: 'getAccountBalance',
    category: 'frontend',
    description: 'Lấy số dư tài khoản',
    filePath: 'frontend/src/utils/blockchain.ts',
    lineNumber: 97,
    parameters: [
      { name: 'address', type: 'string', description: 'Địa chỉ tài khoản' }
    ],
    returnType: 'Promise<string>',
    callLocations: [
      { file: 'frontend/src/components/WalletBalance.tsx', line: 45, description: 'Balance display component' }
    ],
    complexity: 'Medium',
    importance: 'High'
  },
  {
    id: 'formatBalanceBlockchain',
    name: 'formatBalance',
    category: 'frontend',
    description: 'Định dạng số dư token (Blockchain Utils)',
    filePath: 'frontend/src/utils/blockchain.ts',
    lineNumber: 109,
    parameters: [
      { name: 'balance', type: 'string', description: 'Số dư token' }
    ],
    returnType: 'string',
    callLocations: [
      { file: 'frontend/src/components/WalletBalance.tsx', line: 23, description: 'Balance formatting' }
    ],
    complexity: 'Low',
    importance: 'Medium'
  }
];

// Statistics
export const functionStats = {
  total: functionsData.length,
  byCategory: {
    product: functionsData.filter(f => f.category === 'product').length,
    order: functionsData.filter(f => f.category === 'order').length,
    user: functionsData.filter(f => f.category === 'user').length,
    blockchain: functionsData.filter(f => f.category === 'blockchain').length,
    database: functionsData.filter(f => f.category === 'database').length,
    frontend: functionsData.filter(f => f.category === 'frontend').length,
    backend: functionsData.filter(f => ['product', 'order', 'user'].includes(f.category)).length, // Sum of backend categories
  },
  byComplexity: {
    Low: functionsData.filter(f => f.complexity === 'Low').length,
    Medium: functionsData.filter(f => f.complexity === 'Medium').length,
    High: functionsData.filter(f => f.complexity === 'High').length
  },
  byImportance: {
    Low: functionsData.filter(f => f.importance === 'Low').length,
    Medium: functionsData.filter(f => f.importance === 'Medium').length,
    High: functionsData.filter(f => f.importance === 'High').length
  }
};
