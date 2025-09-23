# Hướng dẫn sử dụng tính năng Mint NFT

## Đã hoàn thành

### ✅ Xóa trang mint NFT công khai
- Đã xóa `/mint-nft` page
- Đã xóa nút "Mint NFT" khỏi ProductCard
- Chỉ supplier mới có thể mint NFT

### ✅ Sửa lỗi mint NFT
- Cài đặt ethers.js
- Cập nhật tất cả blockchain functions để sử dụng ethers.js
- Sửa lỗi "window.ethereum is not a constructor"

### ✅ Cấu hình Environment Variables
- Tạo file `.env.local` với contract addresses
- Cập nhật blockchain config để sử dụng env variables

## Cách sử dụng

### 1. Cấu hình Environment
File `.env.local` đã được tạo với:
```env
NEXT_PUBLIC_AGRICHAIN_TOKEN_ADDRESS=0xF7a86e7582c97ba3269BD2F4bc708e258f8F0C48
NEXT_PUBLIC_AGRICHAIN_NFT_ADDRESS=0xA7A5abD38742932A83bA1ED84960794F0123FfC7
NEXT_PUBLIC_AGRICHAIN_MARKETPLACE_ADDRESS=0x82f4e5Bfc0cF35C0a415f298317485c2BDbD5F5b
```

### 2. Chạy ứng dụng
```bash
cd frontend
npm run dev
```

### 3. Mint NFT (chỉ cho Supplier)
1. Đăng nhập với tài khoản supplier
2. Tạo sản phẩm mới
3. Vào trang mint NFT cho sản phẩm đó
4. Kết nối MetaMask (sẽ tự động chuyển sang BSC Testnet)
5. Điền thông tin mint (số lượng, metadata URI)
6. Xác nhận giao dịch trên MetaMask
7. Chờ xác nhận blockchain
8. NFT được mint thành công

## Lưu ý quan trọng

- **Chỉ supplier mới có thể mint NFT**
- **Cần BNB testnet để trả gas fee**
- **MetaMask sẽ tự động chuyển sang BSC Testnet**
- **Contract addresses đã được cấu hình sẵn**

## Troubleshooting

### Lỗi thường gặp:
1. **"MetaMask is not installed"** - Cài đặt MetaMask extension
2. **"Insufficient BNB"** - Cần BNB testnet cho gas fee
3. **"Wrong network"** - MetaMask sẽ tự động chuyển network
4. **"Transaction failed"** - Kiểm tra gas limit và balance

### Debug:
- Mở Developer Tools (F12)
- Xem Console logs
- Kiểm tra Network tab cho API calls
