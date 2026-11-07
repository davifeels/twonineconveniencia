export type UnitId = 'unit-01' | 'unit-02';

export interface StoreUnit {
  id: UnitId;
  name: string;
  shortName: string;
  tag: string;
  address: string;
  reference: string;
  neighborhood: string;
  city: string;
  manager: string;
  phone: string;
  color: string;
  established: string;
  operatingHours: string;
}

export type ProductCategory =
  | 'Tabacaria & Hookah'
  | 'Carvões & Insumos'
  | 'Bebidas & Energéticos'
  | 'Gelo & Copos'
  | 'Snacks & Bomboniere'
  | 'Acessórios & Headshop';

export type StockStatus = 'normal' | 'low' | 'out_of_stock';

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: ProductCategory;
  unit: string; // un, cx, pct, saco, lata, garrafa
  costPrice: number; // R$ custo
  sellingPrice: number; // R$ venda
  minStock: number; // estoque mínimo recomendado por unidade
  stock: Record<UnitId, number>; // estoque por unidade
  description?: string;
  supplierId?: string;
  ageRestricted?: boolean; // 🔞 18+
  createdAt: string;
}

export type TransferStatus = 'pendente' | 'em_transito' | 'concluida' | 'cancelada';

export interface StockTransfer {
  id: string;
  code: string;
  date: string;
  fromUnitId: UnitId;
  toUnitId: UnitId;
  productId: string;
  productName: string;
  quantity: number;
  status: TransferStatus;
  requester: string;
  driverNotes?: string;
  completedAt?: string;
}

export interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  contactName: string;
  phone: string;
  email: string;
  category: string;
  leadTimeDays: number;
  rating: number;
}

export type PurchaseStatus = 'recebido' | 'pendente' | 'cancelado';

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  subtotal: number;
}

export interface PurchaseOrder {
  id: string;
  code: string;
  date: string;
  supplierId: string;
  supplierName: string;
  targetUnitId: UnitId;
  items: PurchaseItem[];
  totalCost: number;
  invoiceNumber: string;
  status: PurchaseStatus;
  receivedAt?: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SaleRecord {
  id: string;
  code: string;
  date: string;
  unitId: UnitId;
  items: SaleItem[];
  totalAmount: number;
  paymentMethod: 'Pix' | 'Cartão de Débito' | 'Cartão de Crédito' | 'Dinheiro';
  operatorName: string;
}

export type MovementType =
  | 'venda'
  | 'compra_entrada'
  | 'transferencia_saida'
  | 'transferencia_entrada'
  | 'ajuste_inventario';

export interface StockMovement {
  id: string;
  date: string;
  unitId: UnitId;
  productId: string;
  productName: string;
  type: MovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  referenceCode: string;
  operator: string;
  notes?: string;
}

export interface ReplenishmentAlert {
  productId: string;
  productName: string;
  sku: string;
  category: ProductCategory;
  unitId: UnitId;
  unitName: string;
  currentStock: number;
  minStock: number;
  suggestedQuantity: number;
  severity: 'critico' | 'atencao';
  otherUnitStock: number;
  otherUnitId: UnitId;
  otherUnitName: string;
}
