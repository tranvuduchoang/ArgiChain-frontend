export async function fetchProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/products`);
    if (!res.ok) throw new Error('Không thể lấy danh sách sản phẩm');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function fetchProductDetail(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/products/${id}`);
    if (!res.ok) throw new Error('Không thể lấy chi tiết sản phẩm');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function fetchReviews({ productId, supplierId }: { productId?: number; supplierId?: number }) {
  try {
    let url = '';
    if (productId) url = `/api/reviews/product/${productId}`;
    if (supplierId) url = `/api/reviews/supplier/${supplierId}`;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}${url}`);
    if (!res.ok) throw new Error('Không thể lấy đánh giá');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function placeOrder(order: { buyerId: number; productId: number; quantity: number; deliveryAddress: string }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Không thể đặt hàng');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function submitReview(review: { buyerId: number; rating: number; comment: string; productId?: number; supplierId?: number }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    if (!res.ok) throw new Error('Không thể gửi đánh giá');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function fetchLoyalty(buyerId: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/loyalty/buyer/${buyerId}`);
    if (!res.ok) throw new Error('Không thể lấy điểm loyalty');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function redeemLoyalty(buyerId: number, supplierId: number, points: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/loyalty/buyer/${buyerId}/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplierId, points }),
    });
    if (!res.ok) throw new Error('Không thể đổi điểm');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/events`);
    if (!res.ok) throw new Error('Không thể lấy sự kiện');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function fetchSupplier(supplierId: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/suppliers/${supplierId}`);
    if (!res.ok) throw new Error('Không thể lấy thông tin supplier');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}

export async function fetchProfile(userId: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/users/${userId}`);
    if (!res.ok) throw new Error('Không thể lấy thông tin cá nhân');
    return await res.json();
  } catch (err) {
    throw new Error('Lỗi kết nối server hoặc backend không phản hồi');
  }
}