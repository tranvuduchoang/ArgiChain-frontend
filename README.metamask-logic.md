# Giải thích chi tiết logic kết nối MetaMask trong AgriChain

File này giúp bạn hiểu rõ từng dòng code về cách kết nối với ví MetaMask trong dự án AgriChain (Next.js + TypeScript).

---

## 1. File: `src/utils/blockchain.ts`

Đây là nơi chứa các hàm tiện ích (utility) để kết nối, kiểm tra, chuyển mạng, lấy số dư ví, v.v.

### 1.1. Cấu hình mạng blockchain
```ts
export const BLOCKCHAIN_CONFIG = {
  CHAIN_ID: 2442, // Chain ID của Cardona zkEVM Testnet
  CHAIN_NAME: 'Cardona zkEVM Testnet', // Tên mạng
  RPC_URL: 'https://rpc.cardona.zkevm-rpc.com', // Địa chỉ RPC để kết nối node
  EXPLORER_URL: 'https://mumbai.polygonscan.com', // Link explorer (có thể thay nếu Cardona có explorer riêng)
  // Địa chỉ các smart contract (cập nhật sau khi deploy)
  TOKEN_ADDRESS: '', // Địa chỉ ERC-20 token
  NFT_ADDRESS: '', // Địa chỉ ERC-1155 NFT
  MARKETPLACE_ADDRESS: '', // Địa chỉ marketplace contract
  // Cấu hình mạng cho MetaMask
  NETWORK_CONFIG: {
    chainId: '0x98a', // 2442 ở dạng hex
    chainName: 'Cardona zkEVM Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.cardona.zkevm-rpc.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
};
```

### 1.2. Hàm kết nối ví MetaMask
```ts
export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // 1. Yêu cầu quyền truy cập tài khoản
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      // 2. Chuyển sang đúng mạng (Cardona zkEVM)
      await switchToMumbai();
      // 3. Trả về địa chỉ ví đầu tiên
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask is not installed');
  }
};
```
- Kiểm tra xem MetaMask đã cài chưa (`window.ethereum`)
- Gọi `eth_requestAccounts` để hiện popup MetaMask yêu cầu user kết nối
- Gọi `switchToMumbai()` để chuyển mạng (thực ra là Cardona zkEVM, tên hàm giữ nguyên cho dễ hiểu)
- Trả về địa chỉ ví đầu tiên

### 1.3. Hàm chuyển mạng
```ts
export const switchToMumbai = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BLOCKCHAIN_CONFIG.NETWORK_CONFIG.chainId }],
    });
  } catch (switchError: any) {
    // Nếu mạng chưa được thêm vào MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BLOCKCHAIN_CONFIG.NETWORK_CONFIG],
        });
      } catch (addError) {
        console.error('Error adding Mumbai network:', addError);
        throw addError;
      }
    } else {
      throw switchError;
    }
  }
};
```
- Gọi `wallet_switchEthereumChain` để chuyển mạng
- Nếu mạng chưa có, code 4902 sẽ được trả về, ta gọi `wallet_addEthereumChain` để thêm mạng mới

### 1.4. Kiểm tra ví đã kết nối chưa
```ts
export const isWalletConnected = async (): Promise<boolean> => {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts.length > 0;
  }
  return false;
};
```
- Gọi `eth_accounts` để lấy danh sách ví đã kết nối (nếu có)

### 1.5. Lấy địa chỉ ví hiện tại
```ts
export const getCurrentAccount = async (): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts[0] || null;
  }
  return null;
};
```
- Lấy địa chỉ ví đầu tiên đã kết nối

### 1.6. Lấy số dư ví
```ts
export const getAccountBalance = async (address: string): Promise<string> => {
  if (typeof window.ethereum !== 'undefined') {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    return balance;
  }
  return '0';
};
```
- Gọi `eth_getBalance` để lấy số dư (trả về dạng hex string)

### 1.7. Định dạng số dư từ wei sang MATIC
```ts
export const formatBalance = (balance: string): string => {
  const wei = BigInt(balance);
  const matic = Number(wei) / Math.pow(10, 18);
  return matic.toFixed(4);
};
```
- Chuyển số dư từ wei (1 MATIC = 10^18 wei) sang số thực dễ đọc

### 1.8. Khai báo global cho TypeScript
```ts
declare global {
  interface Window {
    ethereum?: any;
  }
}
```
- Đảm bảo TypeScript không báo lỗi khi truy cập `window.ethereum`

---

## 2. File: `src/contexts/WalletContext.tsx`

Đây là nơi quản lý trạng thái ví, cung cấp context cho toàn bộ app.

### 2.1. Định nghĩa kiểu dữ liệu context
```ts
interface WalletContextType {
  isConnected: boolean; // Đã kết nối ví chưa
  account: string | null; // Địa chỉ ví
  balance: string; // Số dư MATIC
  connect: () => Promise<void>; // Hàm kết nối ví
  disconnect: () => void; // Hàm ngắt kết nối
  isLoading: boolean; // Đang loading không
}
```

### 2.2. Tạo context và custom hook
```ts
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
```
- `WalletContext` là nơi lưu trạng thái ví
- `useWallet` là custom hook để truy cập context ở bất kỳ component nào

### 2.3. WalletProvider: Provider cho toàn app
```ts
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // State quản lý
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra kết nối ví khi load trang
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Lắng nghe sự kiện đổi account hoặc chain
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount(null);
          setBalance('0');
        } else {
          setAccount(accounts[0]);
          updateBalance(accounts[0]);
        }
      };
      const handleChainChanged = () => {
        window.location.reload();
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  // Hàm kiểm tra kết nối ví
  const checkWalletConnection = async () => {
    try {
      const connected = await isWalletConnected();
      if (connected) {
        const currentAccount = await getCurrentAccount();
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

  // Hàm cập nhật số dư
  const updateBalance = async (address: string) => {
    try {
      const balanceWei = await getAccountBalance(address);
      const formattedBalance = formatBalance(balanceWei);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  // Hàm kết nối ví (gọi connectWallet ở utils)
  const connect = async () => {
    setIsLoading(true);
    try {
      const connectedAccount = await connectWallet();
      setIsConnected(true);
      setAccount(connectedAccount);
      await updateBalance(connectedAccount);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm ngắt kết nối (chỉ reset state, không ngắt thật ở MetaMask)
  const disconnect = () => {
    setIsConnected(false);
    setAccount(null);
    setBalance('0');
  };

  // Giá trị context cung cấp cho toàn app
  const value: WalletContextType = {
    isConnected,
    account,
    balance,
    connect,
    disconnect,
    isLoading,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
```

---

## 3. Tóm tắt luồng kết nối MetaMask

1. **User click "Connect Wallet"**
2. Gọi `connect()` trong context → gọi `connectWallet()` ở utils
3. Hiện popup MetaMask, user chọn ví và xác nhận
4. Nếu thành công:
   - Lưu trạng thái đã kết nối
   - Lưu địa chỉ ví
   - Lấy số dư và hiển thị
5. Nếu user đổi account hoặc chain, app sẽ tự động cập nhật lại thông tin
6. Khi user click "Disconnect", chỉ reset state ở frontend (MetaMask vẫn còn kết nối, nhưng app sẽ không hiển thị nữa)

---

## 4. Lưu ý
- Luồng này chỉ quản lý trạng thái ở frontend, không lưu private key, không truy cập ví của user
- Nếu muốn thực hiện giao dịch, cần dùng thêm thư viện ethers.js hoặc web3.js
- Nếu cần bảo mật cao hơn, nên xác thực backend hoặc dùng signature

---

**Hy vọng file này giúp bạn hiểu sâu về logic kết nối MetaMask trong AgriChain!**