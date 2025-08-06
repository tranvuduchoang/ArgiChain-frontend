# AgriChain Frontend

A modern, responsive web application for blockchain-based agricultural marketplace built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Blockchain Integration**: Seamless MetaMask wallet connection
- **Polygon Network**: Built on Polygon Mumbai testnet
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety and better development experience
- **Multi-language Support**: English and Vietnamese interface
- **Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Blockchain**: Ethers.js v6, MetaMask integration
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Blockchain Setup

The application is configured to work with Polygon Mumbai testnet by default. Configuration can be found in `src/utils/blockchain.ts`.

### 🔐 MetaMask Setup - Hướng dẫn chi tiết

#### Bước 1: Cài đặt MetaMask Extension

1. **Mở trình duyệt** (Chrome, Firefox, Brave, Edge)
2. **Truy cập trang chủ MetaMask**: https://metamask.io/
3. **Tải MetaMask**:
   - Click "Download" hoặc "Get MetaMask"
   - Chọn trình duyệt của bạn
   - Click "Install MetaMask"
4. **Cài đặt extension**:
   - Click "Add to [Browser Name]"
   - Xác nhận cài đặt
   - Extension sẽ xuất hiện trên thanh công cụ trình duyệt

#### Bước 2: Tạo ví MetaMask

1. **Mở MetaMask**:
   - Click vào icon MetaMask trên thanh công cụ
   - Hoặc nhấn `Ctrl+Shift+M` (Windows/Linux) hoặc `Cmd+Shift+M` (Mac)

2. **Tạo ví mới**:
   - Click "Create a new wallet"
   - Đọc và đồng ý với điều khoản
   - Tạo mật khẩu mạnh (8 ký tự trở lên)
   - **QUAN TRỌNG**: Ghi chép và lưu trữ an toàn 12 từ khôi phục (Secret Recovery Phrase)
   - Xác nhận 12 từ khôi phục theo thứ tự

3. **Hoàn tất setup**:
   - Click "All done"
   - Ví của bạn đã sẵn sàng sử dụng

#### Bước 3: Thêm Polygon Mumbai Testnet

1. **Mở MetaMask** và đảm bảo bạn đang ở trang chính

2. **Thêm mạng mới**:
   - Click vào dropdown mạng (hiện tại sẽ hiển thị "Ethereum Mainnet")
   - Click "Add network" hoặc "Add network manually"

3. **Nhập thông tin mạng**:
   ```
   Network Name: Polygon Mumbai Testnet
   New RPC URL: https://rpc.cardona.zkevm-rpc.com
   Chain ID: 2442
   Currency Symbol: MATIC
   Block Explorer URL: https://mumbai.polygonscan.com
   ```

4. **Lưu mạng**:
   - Click "Save"
   - MetaMask sẽ tự động chuyển sang Mumbai testnet

#### Bước 4: Nhận Test MATIC

1. **Truy cập Polygon Faucet**: https://faucet.polygon.technology/

2. **Chọn loại faucet**:
   - **Mumbai Faucet**: Nhận MATIC test
   - **Alchemy Faucet**: Nhận thêm MATIC test (nếu cần)

3. **Nhập địa chỉ ví**:
   - Copy địa chỉ ví từ MetaMask (click vào địa chỉ để copy)
   - Paste vào ô "Wallet Address"
   - Click "Submit"

4. **Xác nhận**:
   - Hoàn tất captcha nếu có
   - Chờ vài phút để nhận MATIC test
   - Kiểm tra số dư trong MetaMask

#### Bước 5: Kết nối với AgriChain

1. **Mở AgriChain**: Truy cập http://localhost:3000

2. **Kết nối ví**:
   - Click nút "Connect Wallet" trên header
   - MetaMask sẽ hiện popup yêu cầu kết nối
   - Click "Connect" để cho phép AgriChain truy cập ví

3. **Chuyển mạng** (nếu cần):
   - Nếu MetaMask không tự động chuyển sang Mumbai
   - AgriChain sẽ hiện thông báo yêu cầu chuyển mạng
   - Click "Switch Network" để chuyển

4. **Xác nhận kết nối**:
   - Sau khi kết nối thành công, header sẽ hiển thị:
     - Địa chỉ ví (dạng rút gọn: 0x1234...5678)
     - Số dư MATIC
     - Nút "Disconnect"

#### Bước 6: Kiểm tra kết nối

1. **Kiểm tra thông tin hiển thị**:
   - Địa chỉ ví phải khớp với địa chỉ trong MetaMask
   - Số dư MATIC phải chính xác
   - Nút "Connect Wallet" đã đổi thành thông tin ví

2. **Test chức năng**:
   - Click "Disconnect" để ngắt kết nối
   - Click "Connect Wallet" để kết nối lại
   - Thử chuyển đổi ngôn ngữ (EN/VI)

### 🔍 Troubleshooting - Xử lý sự cố

#### Lỗi "MetaMask is not installed"
- **Nguyên nhân**: Chưa cài đặt MetaMask extension
- **Giải pháp**: Làm theo Bước 1 để cài đặt MetaMask

#### Lỗi "Wrong Network"
- **Nguyên nhân**: MetaMask đang ở mạng khác (Ethereum Mainnet)
- **Giải pháp**: 
  - Click "Switch Network" trong AgriChain
  - Hoặc thủ công chuyển sang Mumbai testnet trong MetaMask

#### Lỗi "Insufficient Balance"
- **Nguyên nhân**: Không có đủ MATIC test
- **Giải pháp**: 
  - Truy cập https://faucet.polygon.technology/
  - Nhận thêm MATIC test

#### Lỗi "User Rejected"
- **Nguyên nhân**: Người dùng từ chối kết nối
- **Giải pháp**: 
  - Click "Connect Wallet" lại
  - Click "Connect" trong popup MetaMask

#### Lỗi "Network not found"
- **Nguyên nhân**: Chưa thêm Mumbai testnet
- **Giải pháp**: Làm theo Bước 3 để thêm mạng

### 📱 Mobile MetaMask

Nếu bạn muốn test trên mobile:

1. **Cài đặt MetaMask Mobile**: Tải từ App Store/Google Play
2. **Import ví**: Sử dụng 12 từ khôi phục từ desktop
3. **Thêm Mumbai testnet**: Làm tương tự như desktop
4. **Kết nối**: Sử dụng WalletConnect hoặc QR code

### 🔒 Bảo mật

⚠️ **Lưu ý quan trọng**:
- **KHÔNG BAO GIỜ** chia sẻ 12 từ khôi phục với ai
- **KHÔNG BAO GIỜ** nhập 12 từ khôi phục vào website không đáng tin
- Chỉ sử dụng testnet cho mục đích phát triển
- Không gửi tiền thật vào địa chỉ testnet

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
│   └── Header.tsx     # Navigation header
├── contexts/          # React contexts
│   └── WalletContext.tsx  # Wallet state management
├── hooks/             # Custom React hooks
├── styles/            # Additional styling
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
    └── blockchain.ts  # Blockchain configuration and utilities
```

## 🎯 Key Components

### WalletContext
Manages wallet connection state, account information, and balance. Provides:
- Wallet connection/disconnection
- Account address and balance
- Network switching
- Event listeners for account changes

### Header Component
Responsive navigation header with:
- AgriChain logo
- Navigation menu (Home, Marketplace, Suppliers)
- Language toggle (EN/VI)
- Wallet connection button
- Mobile menu

### Home Page
Landing page featuring:
- Hero section with call-to-action
- Feature highlights
- Statistics
- How it works guide

## 🔗 Blockchain Integration

### MetaMask Connection
The app automatically:
- Detects MetaMask installation
- Requests account access
- Switches to Mumbai testnet
- Handles network switching
- Listens for account changes

### Utility Functions
- `connectWallet()`: Connect to MetaMask
- `switchToMumbai()`: Switch to Mumbai testnet
- `getCurrentAccount()`: Get connected account
- `getAccountBalance()`: Get account balance
- `formatBalance()`: Format wei to MATIC

## 🌐 Multi-language Support

The application supports English and Vietnamese languages. Language switching is available in the header component.

## 🎨 Styling

Built with Tailwind CSS for:
- Responsive design
- Consistent spacing and colors
- Dark/light mode support (future)
- Custom component styling

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🔮 Future Features

- [ ] Marketplace page with product listings
- [ ] Supplier profiles and verification
- [ ] Product detail pages with NFT integration
- [ ] Shopping cart and checkout
- [ ] User dashboard
- [ ] Review and rating system
- [ ] Auction/bidding functionality
- [ ] Loyalty points system
- [ ] Image upload functionality
- [ ] KYC verification system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**AgriChain** - Revolutionizing agricultural commerce with blockchain technology 🌱
