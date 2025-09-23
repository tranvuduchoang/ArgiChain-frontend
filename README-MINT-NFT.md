# Hướng dẫn sử dụng tính năng Mint NFT

## Tổng quan
Tính năng Mint NFT cho phép người dùng tạo NFT cho các sản phẩm nông nghiệp trên blockchain BSC Testnet.

## Các tính năng đã hoàn thành

### 1. Backend APIs
- ✅ `POST /api/products/:productId/mint/prepare` - Chuẩn bị thông tin mint NFT
- ✅ `POST /api/products/:productId/mint/confirm` - Xác nhận mint NFT sau khi giao dịch blockchain thành công

### 2. Frontend Components
- ✅ `MintNFTModal` - Modal component để mint NFT
- ✅ `MintNFTPage` - Trang mint NFT công khai
- ✅ Cập nhật `ProductCard` với nút "Mint NFT"
- ✅ Tích hợp Web3 và MetaMask

### 3. Blockchain Integration
- ✅ Cấu hình BSC Testnet
- ✅ Contract addresses từ environment variables
- ✅ MetaMask connection và network switching
- ✅ NFT minting functions

## Cách sử dụng

### 1. Cấu hình Environment Variables
Tạo file `.env.local` trong thư mục `frontend`:

```env
# AgriChain Contract Addresses (BSC Testnet)
NEXT_PUBLIC_AGRICHAIN_TOKEN_ADDRESS=0xF7a86e7582c97ba3269BD2F4bc708e258f8F0C48
NEXT_PUBLIC_AGRICHAIN_NFT_ADDRESS=0xA7A5abD38742932A83bA1ED84960794F0123FfC7
NEXT_PUBLIC_AGRICHAIN_MARKETPLACE_ADDRESS=0x82f4e5Bfc0cF35C0a415f298317485c2BDbD5F5b

# BSC Testnet Configuration
NEXT_PUBLIC_BSC_CHAIN_ID=97
NEXT_PUBLIC_BSC_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545
NEXT_PUBLIC_BSC_EXPLORER_URL=https://testnet.bscscan.com
```

### 2. Cài đặt Dependencies
```bash
cd frontend
npm install
```

### 3. Chạy ứng dụng
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Quy trình Mint NFT

### Cho Supplier (Nhà cung cấp)
1. Đăng nhập với tài khoản supplier
2. Tạo sản phẩm mới
3. Vào trang mint NFT cho sản phẩm đó
4. Kết nối MetaMask
5. Điền thông tin mint (số lượng, metadata URI)
6. Xác nhận giao dịch trên MetaMask
7. Chờ xác nhận blockchain
8. NFT được mint thành công

### Cho User (Người dùng thông thường)
1. Truy cập marketplace
2. Chọn sản phẩm muốn mint NFT
3. Nhấn nút "Mint NFT"
4. Kết nối MetaMask
5. Điền thông tin mint
6. Xác nhận giao dịch
7. Chờ xác nhận blockchain

## Cấu trúc Files

```
frontend/
├── src/
│   ├── app/
│   │   ├── mint-nft/
│   │   │   └── page.tsx          # Trang mint NFT công khai
│   │   └── supplier/
│   │       └── mint-nft/
│   │           └── page.tsx      # Trang mint NFT cho supplier
│   ├── components/
│   │   └── MintNFTModal.tsx      # Modal component mint NFT
│   └── utils/
│       └── blockchain.ts         # Blockchain utilities
```

## API Endpoints

### Prepare Mint
```http
POST /api/products/:productId/mint/prepare
Content-Type: application/json

{
  "quantity": 1,
  "metadataUri": "https://agrichain.com/metadata/123"
}
```

### Confirm Mint
```http
POST /api/products/:productId/mint/confirm
Content-Type: application/json

{
  "tokenId": "1",
  "contractAddress": "0xA7A5abD38742932A83bA1ED84960794F0123FfC7",
  "transactionHash": "0x...",
  "mintedQuantity": 1,
  "chainId": 97,
  "toAddress": "0x..."
}
```

## Blockchain Configuration

### BSC Testnet
- **Chain ID**: 97
- **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545
- **Explorer**: https://testnet.bscscan.com
- **Currency**: BNB

### Contract Addresses
- **AgriChain Token**: 0xF7a86e7582c97ba3269BD2F4bc708e258f8F0C48
- **AgriChain NFT**: 0xA7A5abD38742932A83bA1ED84960794F0123FfC7
- **AgriChain Marketplace**: 0x82f4e5Bfc0cF35C0a415f298317485c2BDbD5F5b

## Troubleshooting

### Lỗi thường gặp

1. **MetaMask not installed**
   - Cài đặt MetaMask extension
   - Refresh trang web

2. **Wrong network**
   - MetaMask sẽ tự động chuyển sang BSC Testnet
   - Nếu không, thêm network thủ công

3. **Insufficient BNB**
   - Cần BNB để trả gas fee
   - Lấy BNB testnet từ faucet

4. **Transaction failed**
   - Kiểm tra gas limit
   - Tăng gas price nếu cần

### Debug
- Mở Developer Tools (F12)
- Xem Console logs
- Kiểm tra Network tab cho API calls
- Xem MetaMask logs

## Testing

### Test Cases
1. ✅ Kết nối MetaMask
2. ✅ Chuyển network sang BSC Testnet
3. ✅ Mint NFT với số lượng 1
4. ✅ Mint NFT với số lượng nhiều
5. ✅ Xác nhận giao dịch blockchain
6. ✅ Cập nhật database sau khi mint thành công

### Test Data
- Sử dụng BSC Testnet
- Cần BNB testnet cho gas fee
- Test với các sản phẩm khác nhau

## Security Notes

1. **Private Keys**: Không bao giờ commit private keys
2. **Environment Variables**: Sử dụng .env.local cho development
3. **Contract Verification**: Verify contracts trên BSCScan
4. **Gas Limits**: Set gas limit phù hợp để tránh failed transactions

## Future Enhancements

1. **Batch Minting**: Mint nhiều NFT cùng lúc
2. **Metadata Upload**: Upload metadata lên IPFS
3. **NFT Gallery**: Hiển thị NFT đã mint
4. **Transfer NFT**: Chuyển nhượng NFT
5. **Burn NFT**: Đốt NFT khi cần thiết
