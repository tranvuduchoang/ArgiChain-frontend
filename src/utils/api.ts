const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000';

async function apiFetch<T>(path: string, init?: RequestInit, fallbackMessage?: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = fallbackMessage ?? `Request failed with status ${response.status}`;
    const detail = await response.text().catch(() => '');
    throw new Error(detail ? `${message}: ${detail}` : message);
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return (await response.json()) as T;
}

export interface MarketplaceListingItem {
  listingId: string;
  slug: string;
  title: string;
  shortDescription?: string;
  pricePerUnit: string;
  currency: string;
  availableSupply: number;
  totalSupply: number;
  isFeatured: boolean;
  productId: string;
  productName: string;
  productImages: string[];
  category: string;
  supplierId: string;
  supplierName?: string;
  supplierWallet?: string;
  contractAddress?: string;
  tokenId?: string;
  mintTxHash?: string;
  mintedAt?: string;
  tags: string[];
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  totalSupply: number;
  availableSupply: number;
  pricePerUnit: string;
  currency: string;
  images: string[];
  metadataCid?: string;
  metadataUrl?: string;
  contractAddress?: string;
  nftTokenId?: string;
  mintTxHash?: string;
  mintedAt?: string;
  supplier: {
    id: string;
    businessName?: string;
    user?: {
      walletAddress?: string;
      email?: string;
    };
  };
  productTokens: Array<{
    id: string;
    tokenId: string;
    contractAddress: string;
    totalMinted: number;
    mintTxHash?: string;
    mintedAt?: string;
    tokenTransfers: Array<{
      id: string;
      fromAddress?: string;
      toAddress?: string;
      quantity: number;
      txHash: string;
      chainId: number;
      type: string;
      occurredAt: string;
    }>;
  }>;
  listings: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    minOrderQuantity: number;
    maxOrderQuantity?: number;
    leadTimeDays?: number;
    publishedAt?: string;
  }>;
}

export interface SupplierDetail {
  id: string;
  businessName: string;
  description?: string;
  slug: string;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  user?: {
    walletAddress?: string;
    email?: string;
  };
  products: ProductDetail[];
}

export interface MintPreparationPayload {
  product: {
    id: string;
    name: string;
    description: string;
    category: string;
    unit: string;
    totalSupply: number;
    pricePerUnit: string;
    currency: string;
    images: string[];
    metadataCid?: string;
    metadataUrl?: string;
  };
  supplier: {
    id: string;
    walletAddress: string;
  };
  contract: {
    templateId: string;
    address: string;
    chainId: number;
    contractType: string;
  };
  mintPayload: {
    to: string;
    quantity: number;
    pricePerUnit: string;
    currency: string;
    metadata: Record<string, unknown>;
  };
}

export interface ConfirmMintPayload {
  tokenId: string;
  transactionHash: string;
  mintedQuantity: number;
  chainId: number;
  metadataCid?: string;
  metadataUrl?: string;
  mintedAt?: string;
  toAddress?: string;
}

export interface CreateOrderPayload {
  userId: string;
  supplierId: string;
  transactionHash: string;
  chainId: number;
  buyerWalletAddress: string;
  items: Array<{ productId: string; quantity: number; unitPrice?: number; productTokenId?: string; metadata?: Record<string, unknown>; }>;
  deliveryAddress: string;
  deliveryMethod: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  currency?: string;
  feeAmount?: number;
  paymentAmount?: number;
}

type PaymentMethod = 'CRYPTO' | 'FIAT';

export async function fetchMarketplaceListings(): Promise<MarketplaceListingItem[]> {
  const listings = await apiFetch<any[]>('/api/products/marketplace/listings');
  return listings.map((listing) => {
    const product = listing.product ?? {};
    const supplier = product.supplier ?? {};
    return {
      listingId: listing.id,
      slug: listing.slug,
      title: listing.title,
      shortDescription: listing.shortDescription,
      pricePerUnit: product.pricePerUnit ?? '0',
      currency: product.currency ?? 'tBNB',
      availableSupply: product.availableSupply ?? 0,
      totalSupply: product.totalSupply ?? 0,
      isFeatured: Boolean(listing.isFeatured),
      productId: product.id,
      productName: product.name,
      productImages: product.images ?? [],
      category: product.category ?? 'Unknown',
      supplierId: supplier.id,
      supplierName: supplier.businessName ?? supplier.id,
      supplierWallet: supplier.user?.walletAddress,
      contractAddress: product.contractAddress,
      tokenId: product.nftTokenId,
      mintTxHash: product.mintTxHash,
      mintedAt: product.mintedAt,
      tags: listing.searchTags ?? [],
    } as MarketplaceListingItem;
  });
}

export async function fetchProducts(): Promise<ProductDetail[]> {
  return apiFetch<ProductDetail[]>('/api/products');
}

export async function fetchProductDetail(id: string): Promise<ProductDetail> {
  return apiFetch<ProductDetail>(`/api/products/${id}`);
}

export async function fetchReviews(params: { productId?: string; supplierId?: string }) {
  let path = '';
  if (params.productId) path = `/api/reviews/product/${params.productId}`;
  if (params.supplierId) path = `/api/reviews/supplier/${params.supplierId}`;
  return apiFetch<any[]>(path || '/api/reviews');
}

export async function fetchSupplierDetail(id: string): Promise<SupplierDetail> {
  return apiFetch<SupplierDetail>(`/api/suppliers/${id}`);
}

export async function prepareProductMint(productId: string): Promise<MintPreparationPayload> {
  return apiFetch<MintPreparationPayload>(`/api/products/${productId}/mint/prepare`, {
    method: 'POST',
  }, 'Failed to prepare mint payload');
}

export async function confirmProductMint(productId: string, payload: ConfirmMintPayload) {
  return apiFetch(`/api/products/${productId}/mint/confirm`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, 'Failed to confirm product mint');
}

export async function createOrder(payload: CreateOrderPayload) {
  return apiFetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, 'Failed to create order');
}

export async function fetchLoyalty(buyerId: string) {
  return apiFetch(`/api/loyalty/buyer/${buyerId}`);
}

export async function redeemLoyalty(buyerId: string, supplierId: string, points: number) {
  return apiFetch(`/api/loyalty/buyer/${buyerId}/redeem`, {
    method: 'POST',
    body: JSON.stringify({ supplierId, points }),
  }, 'Failed to redeem loyalty points');
}

export async function submitReview(review: { userId: string; rating: number; comment: string; productId?: string; supplierId?: string }) {
  return apiFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  }, 'Failed to submit review');
}

export async function fetchProfile(userId: string) {
  return apiFetch(`/api/users/${userId}`);
}

export async function fetchEvents() {
  return apiFetch('/api/events');
}

export async function deploySupplierContract(supplierId: string, body?: { force?: boolean; baseUri?: string; contractUri?: string; name?: string; description?: string }) {
  return apiFetch(`/api/suppliers/${supplierId}/contracts/deploy`, {
    method: 'POST',
    body: JSON.stringify(body ?? {}),
  }, 'Failed to deploy supplier contract');
}
