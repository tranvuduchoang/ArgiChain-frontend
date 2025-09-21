# AgriChain Technical Report Web Interface

## Tổng Quan

Trang web báo cáo kỹ thuật AgriChain cung cấp giao diện tương tác và đẹp mắt để trình bày tài liệu kỹ thuật của dự án. Trang web được xây dựng với Next.js, React, TypeScript và Tailwind CSS.

## Tính Năng

### 🎨 Giao Diện Đẹp Mắt
- Design hiện đại với gradient và màu sắc hài hòa
- Responsive design cho mọi thiết bị
- Animation mượt mà với Framer Motion
- Typography và spacing chuyên nghiệp

### 🔍 Tương Tác Cao
- Sidebar navigation với search
- Tabs để chuyển đổi giữa các phần
- Expandable sections với animation
- Interactive diagrams và charts
- Popover và tooltip thông tin

### 📊 Nội Dung Phong Phú
- **Tổng Quan**: Overview tổng thể về dự án
- **Báo Cáo Kỹ Thuật**: Phân tích chi tiết kiến trúc và công nghệ
- **Kiến Trúc Hệ Thống**: Diagrams tương tác 3 tầng
- **Sơ Đồ Database**: Mô hình database với relationships
- **Phân Tích Functions**: Tài liệu chi tiết các function
- **Hướng Dẫn Sử Dụng**: Hướng dẫn cho user, supplier, admin

## Cấu Trúc Components

```
frontend/src/components/report/
├── Overview.tsx              # Trang tổng quan
├── TechnicalReport.tsx       # Báo cáo kỹ thuật
├── SystemArchitecture.tsx    # Kiến trúc hệ thống
├── DatabaseSchema.tsx        # Sơ đồ database
├── FunctionAnalysis.tsx      # Phân tích functions
└── UserGuide.tsx            # Hướng dẫn sử dụng
```

## Cách Sử Dụng

### 1. Truy Cập Trang Web
```
http://localhost:3000/report
```

### 2. Navigation
- Sử dụng sidebar bên trái để chuyển đổi giữa các phần
- Click vào các tab để xem nội dung chi tiết
- Sử dụng search để tìm kiếm nhanh

### 3. Tương Tác
- Click vào các section để expand/collapse
- Hover vào các elements để xem tooltip
- Sử dụng các controls để filter và tìm kiếm

## Tính Năng Nổi Bật

### 🎯 Interactive Diagrams
- System architecture với 3 tầng
- Database schema với relationships
- Data flow diagrams
- Deployment diagrams

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints cho tablet và desktop
- Touch-friendly interactions
- Optimized performance

### 🎨 Visual Elements
- Color-coded categories
- Status indicators
- Progress bars
- Statistics cards
- Code syntax highlighting

### 🔧 Developer Features
- TypeScript support
- Component-based architecture
- Reusable UI components
- Clean code structure

## Công Nghệ Sử Dụng

- **Frontend**: Next.js 15.4.5, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks

## Cấu Hình

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BLOCKCHAIN_RPC_URL=https://rpc-cardona-evm.polygon.technology
```

### Dependencies
```json
{
  "framer-motion": "^12.23.12",
  "lucide-react": "^0.536.0",
  "next": "15.4.5",
  "react": "19.1.0",
  "tailwindcss": "^3.4.0"
}
```

## Development

### Chạy Development Server
```bash
cd frontend
npm run dev
```

### Build Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Customization

### Thêm Nội Dung Mới
1. Tạo component mới trong `components/report/`
2. Import và thêm vào `page.tsx`
3. Cập nhật navigation trong sidebar

### Thay Đổi Styling
- Sử dụng Tailwind CSS classes
- Customize colors trong `tailwind.config.js`
- Thêm animations với Framer Motion

### Thêm Tính Năng Tương Tác
- Sử dụng React hooks cho state management
- Thêm event handlers cho interactions
- Implement search và filter logic

## Performance

- Lazy loading cho components
- Optimized images và assets
- Efficient re-rendering với React.memo
- Code splitting với Next.js

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Lỗi Thường Gặp
1. **Component không render**: Kiểm tra import paths
2. **Styling không áp dụng**: Kiểm tra Tailwind CSS config
3. **Animation không hoạt động**: Kiểm tra Framer Motion setup

### Debug
- Sử dụng React DevTools
- Check browser console
- Verify network requests
- Test responsive design

## Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

**Tác giả**: AgriChain Development Team  
**Phiên bản**: 1.0.0  
**Cập nhật cuối**: 2024
