# Debug Mint NFT - Hướng dẫn sửa lỗi

## Vấn đề hiện tại
- NFT đã được mint thành công trên blockchain (có transaction hash)
- Backend trả về lỗi 400 Bad Request khi confirm mint
- Cần debug để tìm nguyên nhân

## Các thay đổi đã thực hiện

### ✅ Backend
1. **Thêm logging chi tiết** vào `confirmProductMintHandler` và `confirmProductMint`
2. **Sửa logic tạo template** - tự động tạo template nếu không tồn tại
3. **Restart backend** để áp dụng thay đổi

### ✅ Frontend
- Không cần thay đổi gì, đã gửi đúng dữ liệu

## Cách test và debug

### 1. Kiểm tra Backend Logs
Mở terminal backend và xem logs khi mint NFT:
```bash
cd backend
npm run dev
```

### 2. Test Mint NFT
1. Vào trang supplier mint NFT
2. Điền thông tin và mint NFT
3. Xem logs trong terminal backend

### 3. Kiểm tra Database
Kiểm tra các bảng sau trong database:
- `SmartContractTemplate` - xem có template mới được tạo không
- `ProductToken` - xem có record mới không
- `Product` - xem có cập nhật contractAddress và nftTokenId không

## Logs cần chú ý

### Backend Logs
```
Confirm mint request: { productId, tokenId, contractAddress, ... }
confirmProductMint input: { ... }
Processing mint confirmation: { quantity, chainId, ... }
Found product: { id, name, supplierId }
Creating new template for contract: 0x...
Created template: template-id
Creating/updating productToken: { ... }
Created/updated productToken: token-id
Mint confirmation completed successfully
```

### Nếu có lỗi
- Kiểm tra error message trong logs
- Kiểm tra database connection
- Kiểm tra Prisma schema

## Các lỗi có thể gặp

### 1. "Product not found"
- Kiểm tra productId có đúng không
- Kiểm tra product có tồn tại trong database không

### 2. "Supplier wallet or user record is not configured"
- Kiểm tra supplier có user record không
- Kiểm tra user có walletAddress không

### 3. "Invalid chainId"
- Kiểm tra chainId có phải số không
- Kiểm tra chainId có hợp lệ không

### 4. Database errors
- Kiểm tra Prisma connection
- Kiểm tra database schema
- Kiểm tra foreign key constraints

## Kết quả mong đợi

Sau khi sửa, mint NFT sẽ:
1. ✅ Mint thành công trên blockchain
2. ✅ Tạo template mới (nếu chưa có)
3. ✅ Tạo ProductToken record
4. ✅ Cập nhật Product với contract info
5. ✅ Tạo TokenTransfer record
6. ✅ Tạo NFT record
7. ✅ Trả về success response

## Nếu vẫn lỗi

1. **Kiểm tra logs** - xem lỗi cụ thể ở đâu
2. **Kiểm tra database** - xem có record nào được tạo không
3. **Kiểm tra Prisma schema** - xem có field nào bị thiếu không
4. **Kiểm tra foreign keys** - xem có constraint nào bị vi phạm không
