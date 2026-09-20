export type UserRole = "client" | "seller";

export type StoredUser = {
  name: string;
  role: UserRole;
};

export type StoredOrder = {
  id: string;
  customer: string;
  items: Array<{ productId: number; name: string; qty: number; price: number }>;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  createdAt: string;
};

const USER_KEY = "storeapp-user";
const ORDERS_KEY = "storeapp-orders";

export function getCurrentUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? (JSON.parse(saved) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: StoredUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

export function getOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? (JSON.parse(saved) as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder) {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
}
