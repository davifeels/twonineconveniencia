import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  StoreUnit,
  Product,
  Supplier,
  StockTransfer,
  PurchaseOrder,
  SaleRecord,
  StockMovement,
  ReplenishmentAlert,
  UnitId,
  TransferStatus,
} from '../types';
import {
  INITIAL_UNITS,
  INITIAL_PRODUCTS,
  INITIAL_SUPPLIERS,
  INITIAL_TRANSFERS,
  INITIAL_PURCHASES,
  INITIAL_SALES,
  INITIAL_MOVEMENTS,
} from '../data/mockData';

interface AppContextType {
  // Navigation / View state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  brandModalOpen: boolean;
  setBrandModalOpen: (open: boolean) => void;

  // Filter state
  selectedUnitFilter: UnitId | 'all';
  setSelectedUnitFilter: (filter: UnitId | 'all') => void;

  // Domain data
  units: StoreUnit[];
  products: Product[];
  suppliers: Supplier[];
  transfers: StockTransfer[];
  purchases: PurchaseOrder[];
  sales: SaleRecord[];
  movements: StockMovement[];

  // Computed data
  alerts: ReplenishmentAlert[];
  metrics: {
    totalProducts: number;
    totalStockUnits: number;
    totalStockCostValue: number;
    totalStockRetailValue: number;
    lowStockCount: number;
    outOfStockCount: number;
    pendingTransfersCount: number;
    totalSalesAmount: number;
    totalPurchasesAmount: number;
    salesCount: number;
  };

  // Actions
  executeTransfer: (data: {
    fromUnitId: UnitId;
    toUnitId: UnitId;
    productId: string;
    quantity: number;
    status: TransferStatus;
    requester?: string;
    notes?: string;
  }) => { success: boolean; message: string };

  updateTransferStatus: (transferId: string, newStatus: TransferStatus) => { success: boolean; message: string };

  registerSale: (data: {
    unitId: UnitId;
    items: Array<{ productId: string; quantity: number; unitPrice: number }>;
    paymentMethod: 'Pix' | 'Cartão de Débito' | 'Cartão de Crédito' | 'Dinheiro';
    operatorName?: string;
  }) => { success: boolean; message: string };

  createPurchase: (data: {
    supplierId: string;
    targetUnitId: UnitId;
    items: Array<{ productId: string; quantity: number; unitCost: number }>;
    invoiceNumber: string;
  }) => { success: boolean; message: string };

  adjustStock: (
    productId: string,
    unitId: UnitId,
    newQuantity: number,
    reason: string,
    operator?: string
  ) => { success: boolean; message: string };

  createProduct: (data: Omit<Product, 'id' | 'createdAt'>) => { success: boolean; message: string };
  updateProduct: (id: string, data: Partial<Product>) => { success: boolean; message: string };
  deleteProduct: (id: string) => { success: boolean; message: string };

  createSupplier: (data: Omit<Supplier, 'id'>) => { success: boolean; message: string };
  resetToMockData: () => void;
}

const STORAGE_KEYS = {
  PRODUCTS: 'twonine_products_v1',
  TRANSFERS: 'twonine_transfers_v1',
  PURCHASES: 'twonine_purchases_v1',
  SALES: 'twonine_sales_v1',
  SUPPLIERS: 'twonine_suppliers_v1',
  MOVEMENTS: 'twonine_movements_v1',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<UnitId | 'all'>('all');
  const [brandModalOpen, setBrandModalOpen] = useState<boolean>(false);

  const units = INITIAL_UNITS;

  // State with LocalStorage fallbacks
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUPPLIERS);
      return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
    } catch {
      return INITIAL_SUPPLIERS;
    }
  });

  const [transfers, setTransfers] = useState<StockTransfer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSFERS);
      return saved ? JSON.parse(saved) : INITIAL_TRANSFERS;
    } catch {
      return INITIAL_TRANSFERS;
    }
  });

  const [purchases, setPurchases] = useState<PurchaseOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PURCHASES);
      return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
    } catch {
      return INITIAL_PURCHASES;
    }
  });

  const [sales, setSales] = useState<SaleRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SALES);
      return saved ? JSON.parse(saved) : INITIAL_SALES;
    } catch {
      return INITIAL_SALES;
    }
  });

  const [movements, setMovements] = useState<StockMovement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_MOVEMENTS;
    } catch {
      return INITIAL_MOVEMENTS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers));
      localStorage.setItem(STORAGE_KEYS.TRANSFERS, JSON.stringify(transfers));
      localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
      localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
      localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));
    } catch (e) {
      console.error('Falha ao salvar no localStorage:', e);
    }
  }, [products, suppliers, transfers, purchases, sales, movements]);

  // Compute Alerts automatically
  const alerts = useMemo<ReplenishmentAlert[]>(() => {
    const list: ReplenishmentAlert[] = [];

    products.forEach((prod) => {
      (['unit-01', 'unit-02'] as UnitId[]).forEach((uId) => {
        if (selectedUnitFilter !== 'all' && selectedUnitFilter !== uId) return;

        const currentQty = prod.stock[uId] ?? 0;
        const otherUnitId: UnitId = uId === 'unit-01' ? 'unit-02' : 'unit-01';
        const otherUnit = units.find((u) => u.id === otherUnitId);
        const currentUnit = units.find((u) => u.id === uId);

        if (currentQty <= prod.minStock) {
          const suggested = Math.max(prod.minStock * 2 - currentQty, 6);
          list.push({
            productId: prod.id,
            productName: prod.name,
            sku: prod.sku,
            category: prod.category,
            unitId: uId,
            unitName: currentUnit?.name || uId,
            currentStock: currentQty,
            minStock: prod.minStock,
            suggestedQuantity: suggested,
            severity: currentQty === 0 ? 'critico' : 'atencao',
            otherUnitStock: prod.stock[otherUnitId] ?? 0,
            otherUnitId: otherUnitId,
            otherUnitName: otherUnit?.shortName || otherUnitId,
          });
        }
      });
    });

    return list.sort((a, b) => (a.severity === 'critico' ? -1 : 1));
  }, [products, selectedUnitFilter, units]);

  // Compute Global Metrics
  const metrics = useMemo(() => {
    let totalStockUnits = 0;
    let totalStockCostValue = 0;
    let totalStockRetailValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach((p) => {
      const qBuritis = p.stock['unit-01'] || 0;
      const qTradicional = p.stock['unit-02'] || 0;

      let relevantStock = 0;
      if (selectedUnitFilter === 'unit-01') {
        relevantStock = qBuritis;
      } else if (selectedUnitFilter === 'unit-02') {
        relevantStock = qTradicional;
      } else {
        relevantStock = qBuritis + qTradicional;
      }

      totalStockUnits += relevantStock;
      totalStockCostValue += relevantStock * p.costPrice;
      totalStockRetailValue += relevantStock * p.sellingPrice;

      if (relevantStock === 0) {
        outOfStockCount++;
      } else if (relevantStock <= p.minStock) {
        lowStockCount++;
      }
    });

    const relevantSales = sales.filter((s) =>
      selectedUnitFilter === 'all' ? true : s.unitId === selectedUnitFilter
    );

    const relevantPurchases = purchases.filter((p) =>
      selectedUnitFilter === 'all' ? true : p.targetUnitId === selectedUnitFilter
    );

    const totalSalesAmount = relevantSales.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const totalPurchasesAmount = relevantPurchases.reduce((acc, curr) => acc + curr.totalCost, 0);
    const pendingTransfers = transfers.filter(
      (t) => t.status === 'pendente' || t.status === 'em_transito'
    ).length;

    return {
      totalProducts: products.length,
      totalStockUnits,
      totalStockCostValue,
      totalStockRetailValue,
      lowStockCount,
      outOfStockCount,
      pendingTransfersCount: pendingTransfers,
      totalSalesAmount,
      totalPurchasesAmount,
      salesCount: relevantSales.length,
    };
  }, [products, sales, purchases, transfers, selectedUnitFilter]);

  // Execute Transfer Flow
  const executeTransfer = ({
    fromUnitId,
    toUnitId,
    productId,
    quantity,
    status,
    requester = 'Administrador Geral TwoNine',
    notes = '',
  }: {
    fromUnitId: UnitId;
    toUnitId: UnitId;
    productId: string;
    quantity: number;
    status: TransferStatus;
    requester?: string;
    notes?: string;
  }) => {
    if (fromUnitId === toUnitId) {
      return { success: false, message: 'A unidade de origem não pode ser idêntica à de destino.' };
    }
    if (quantity <= 0) {
      return { success: false, message: 'A quantidade para transferência deve ser maior que zero.' };
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return { success: false, message: 'Produto não encontrado no cadastro.' };
    }

    const available = product.stock[fromUnitId] || 0;
    if (quantity > available) {
      return {
        success: false,
        message: `Saldo insuficiente na unidade de origem (${available} disponíveis). Não é possível transferir ${quantity} unidades.`,
      };
    }

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 16);
    const code = `TRF-${now.getFullYear()}-${String(transfers.length + 1).padStart(3, '0')}`;

    const newTransfer: StockTransfer = {
      id: `trf-${Date.now()}`,
      code,
      date: formattedDate,
      fromUnitId,
      toUnitId,
      productId,
      productName: product.name,
      quantity,
      status,
      requester,
      driverNotes: notes,
      completedAt: status === 'concluida' ? formattedDate : undefined,
    };

    // If completed or in-transit, deduct from origin
    // If completed, add to destination
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const currentOrigin = p.stock[fromUnitId] || 0;
        const currentDest = p.stock[toUnitId] || 0;

        let newOrigin = currentOrigin;
        let newDest = currentDest;

        if (status === 'concluida') {
          newOrigin = currentOrigin - quantity;
          newDest = currentDest + quantity;
        } else if (status === 'em_transito') {
          newOrigin = currentOrigin - quantity;
        }

        return {
          ...p,
          stock: {
            ...p.stock,
            [fromUnitId]: newOrigin,
            [toUnitId]: newDest,
          },
        };
      })
    );

    // Register Movements
    const originUnit = units.find((u) => u.id === fromUnitId);
    const destUnit = units.find((u) => u.id === toUnitId);

    const newMovements: StockMovement[] = [];

    if (status === 'concluida' || status === 'em_transito') {
      newMovements.push({
        id: `mov-${Date.now()}-1`,
        date: formattedDate,
        unitId: fromUnitId,
        productId,
        productName: product.name,
        type: 'transferencia_saida',
        quantity: -quantity,
        previousStock: available,
        newStock: available - quantity,
        referenceCode: code,
        operator: requester,
        notes: `Transferência expedida para ${destUnit?.shortName}. ${notes}`,
      });
    }

    if (status === 'concluida') {
      const destPrevious = product.stock[toUnitId] || 0;
      newMovements.push({
        id: `mov-${Date.now()}-2`,
        date: formattedDate,
        unitId: toUnitId,
        productId,
        productName: product.name,
        type: 'transferencia_entrada',
        quantity: quantity,
        previousStock: destPrevious,
        newStock: destPrevious + quantity,
        referenceCode: code,
        operator: requester,
        notes: `Transferência recebida da unidade ${originUnit?.shortName}.`,
      });
    }

    setTransfers((prev) => [newTransfer, ...prev]);
    setMovements((prev) => [...newMovements, ...prev]);

    return {
      success: true,
      message: `Transferência ${code} de ${quantity} un de ${product.name} registrada com status "${status}".`,
    };
  };

  // Update Transfer Status (e.g., mark as completed)
  const updateTransferStatus = (transferId: string, newStatus: TransferStatus) => {
    const transfer = transfers.find((t) => t.id === transferId);
    if (!transfer) return { success: false, message: 'Transferência não localizada.' };

    const oldStatus = transfer.status;
    if (oldStatus === newStatus) return { success: true, message: 'Status já atualizado.' };

    const product = products.find((p) => p.id === transfer.productId);
    if (!product) return { success: false, message: 'Produto não encontrado.' };

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 16);

    // Adjust stocks based on state transition
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== transfer.productId) return p;
        const originStock = p.stock[transfer.fromUnitId] || 0;
        const destStock = p.stock[transfer.toUnitId] || 0;

        let newOrigin = originStock;
        let newDest = destStock;

        // If previously pending and now completed: deduct origin, add dest
        if (oldStatus === 'pendente' && newStatus === 'concluida') {
          newOrigin = Math.max(0, originStock - transfer.quantity);
          newDest = destStock + transfer.quantity;
        } else if (oldStatus === 'em_transito' && newStatus === 'concluida') {
          // was already deducted from origin, just add to dest
          newDest = destStock + transfer.quantity;
        } else if (oldStatus === 'em_transito' && newStatus === 'cancelada') {
          // revert back to origin
          newOrigin = originStock + transfer.quantity;
        }

        return {
          ...p,
          stock: {
            ...p.stock,
            [transfer.fromUnitId]: newOrigin,
            [transfer.toUnitId]: newDest,
          },
        };
      })
    );

    // Movement if completing from in-transit
    if (newStatus === 'concluida' && oldStatus !== 'concluida') {
      const destPrev = product.stock[transfer.toUnitId] || 0;
      setMovements((prev) => [
        {
          id: `mov-${Date.now()}`,
          date: formattedDate,
          unitId: transfer.toUnitId,
          productId: transfer.productId,
          productName: transfer.productName,
          type: 'transferencia_entrada',
          quantity: transfer.quantity,
          previousStock: destPrev,
          newStock: destPrev + transfer.quantity,
          referenceCode: transfer.code,
          operator: 'Recepção de Unidade',
          notes: `Conclusão de entrega via transferência.`,
        },
        ...prev,
      ]);
    }

    setTransfers((prev) =>
      prev.map((t) =>
        t.id === transferId
          ? {
              ...t,
              status: newStatus,
              completedAt: newStatus === 'concluida' ? formattedDate : t.completedAt,
            }
          : t
      )
    );

    return { success: true, message: `Status da transferência ${transfer.code} alterado para "${newStatus}".` };
  };

  // Register Sale
  const registerSale = ({
    unitId,
    items,
    paymentMethod,
    operatorName = 'Operador Caixa',
  }: {
    unitId: UnitId;
    items: Array<{ productId: string; quantity: number; unitPrice: number }>;
    paymentMethod: 'Pix' | 'Cartão de Débito' | 'Cartão de Crédito' | 'Dinheiro';
    operatorName?: string;
  }) => {
    if (!items.length) {
      return { success: false, message: 'Insira ao menos um produto para registrar a venda.' };
    }

    // Validate stocks
    for (const item of items) {
      const prod = products.find((p) => p.id === item.productId);
      if (!prod) return { success: false, message: `Produto ${item.productId} não encontrado.` };
      const currentStock = prod.stock[unitId] || 0;
      if (item.quantity > currentStock) {
        return {
          success: false,
          message: `Estoque insuficiente para "${prod.name}" na unidade selecionada (Disponível: ${currentStock}, Solicitado: ${item.quantity}).`,
        };
      }
    }

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 16);
    const code = `VND-${now.getFullYear()}-${String(sales.length + 516).padStart(3, '0')}`;

    const saleItems = items.map((it) => {
      const prod = products.find((p) => p.id === it.productId)!;
      return {
        productId: it.productId,
        productName: prod.name,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        subtotal: it.quantity * it.unitPrice,
      };
    });

    const totalAmount = saleItems.reduce((acc, curr) => acc + curr.subtotal, 0);

    const newSale: SaleRecord = {
      id: `vnd-${Date.now()}`,
      code,
      date: formattedDate,
      unitId,
      items: saleItems,
      totalAmount,
      paymentMethod,
      operatorName,
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const itemSold = items.find((it) => it.productId === p.id);
        if (!itemSold) return p;
        const currentQty = p.stock[unitId] || 0;
        return {
          ...p,
          stock: {
            ...p.stock,
            [unitId]: Math.max(0, currentQty - itemSold.quantity),
          },
        };
      })
    );

    // Register movements
    const movementsToAdd: StockMovement[] = items.map((it, idx) => {
      const prod = products.find((p) => p.id === it.productId)!;
      const prevStock = prod.stock[unitId] || 0;
      return {
        id: `mov-${Date.now()}-${idx}`,
        date: formattedDate,
        unitId,
        productId: it.productId,
        productName: prod.name,
        type: 'venda',
        quantity: -it.quantity,
        previousStock: prevStock,
        newStock: Math.max(0, prevStock - it.quantity),
        referenceCode: code,
        operator: operatorName,
        notes: `Venda balcão (${paymentMethod})`,
      };
    });

    setSales((prev) => [newSale, ...prev]);
    setMovements((prev) => [...movementsToAdd, ...prev]);

    return {
      success: true,
      message: `Venda ${code} registrada com sucesso! Total: R$ ${totalAmount.toFixed(2)}. Estoque atualizado.`,
    };
  };

  // Create Purchase
  const createPurchase = ({
    supplierId,
    targetUnitId,
    items,
    invoiceNumber,
  }: {
    supplierId: string;
    targetUnitId: UnitId;
    items: Array<{ productId: string; quantity: number; unitCost: number }>;
    invoiceNumber: string;
  }) => {
    if (!items.length) {
      return { success: false, message: 'Insira ao menos um produto na ordem de compra.' };
    }

    const supplier = suppliers.find((s) => s.id === supplierId);
    const supplierName = supplier?.name || 'Fornecedor Cadastrado';

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 16);
    const code = `CMP-${now.getFullYear()}-${String(purchases.length + 91).padStart(3, '0')}`;

    const purchaseItems = items.map((it) => {
      const prod = products.find((p) => p.id === it.productId);
      return {
        productId: it.productId,
        productName: prod?.name || 'Produto',
        quantity: it.quantity,
        unitCost: it.unitCost,
        subtotal: it.quantity * it.unitCost,
      };
    });

    const totalCost = purchaseItems.reduce((acc, curr) => acc + curr.subtotal, 0);

    const newPurchase: PurchaseOrder = {
      id: `cmp-${Date.now()}`,
      code,
      date: formattedDate,
      supplierId,
      supplierName,
      targetUnitId,
      items: purchaseItems,
      totalCost,
      invoiceNumber: invoiceNumber || `NF-e ${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'recebido',
      receivedAt: formattedDate,
    };

    // Increment stocks
    setProducts((prev) =>
      prev.map((p) => {
        const itemReceived = items.find((it) => it.productId === p.id);
        if (!itemReceived) return p;
        const currentQty = p.stock[targetUnitId] || 0;
        return {
          ...p,
          costPrice: itemReceived.unitCost > 0 ? itemReceived.unitCost : p.costPrice,
          stock: {
            ...p.stock,
            [targetUnitId]: currentQty + itemReceived.quantity,
          },
        };
      })
    );

    // Register movements
    const movementsToAdd: StockMovement[] = items.map((it, idx) => {
      const prod = products.find((p) => p.id === it.productId)!;
      const prevStock = prod?.stock[targetUnitId] || 0;
      return {
        id: `mov-${Date.now()}-cmp-${idx}`,
        date: formattedDate,
        unitId: targetUnitId,
        productId: it.productId,
        productName: prod?.name || 'Produto',
        type: 'compra_entrada',
        quantity: it.quantity,
        previousStock: prevStock,
        newStock: prevStock + it.quantity,
        referenceCode: code,
        operator: 'Almoxarifado Geral',
        notes: `Entrada por compra ${newPurchase.invoiceNumber} (${supplierName})`,
      };
    });

    setPurchases((prev) => [newPurchase, ...prev]);
    setMovements((prev) => [...movementsToAdd, ...prev]);

    return {
      success: true,
      message: `Compra ${code} registrada! +${purchaseItems.reduce((a, b) => a + b.quantity, 0)} unidades adicionadas à unidade de destino.`,
    };
  };

  // Adjust stock directly
  const adjustStock = (
    productId: string,
    unitId: UnitId,
    newQuantity: number,
    reason: string,
    operator = 'Gerente de Estoque'
  ) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return { success: false, message: 'Produto não encontrado.' };

    const oldQty = product.stock[unitId] || 0;
    const diff = newQuantity - oldQty;

    if (diff === 0) return { success: true, message: 'Quantidade inalterada.' };

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 16);
    const code = `AJU-${now.getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stock: {
                ...p.stock,
                [unitId]: newQuantity,
              },
            }
          : p
      )
    );

    setMovements((prev) => [
      {
        id: `mov-${Date.now()}`,
        date: formattedDate,
        unitId,
        productId,
        productName: product.name,
        type: 'ajuste_inventario',
        quantity: diff,
        previousStock: oldQty,
        newStock: newQuantity,
        referenceCode: code,
        operator,
        notes: `Ajuste manual de inventário: ${reason}`,
      },
      ...prev,
    ]);

    return {
      success: true,
      message: `Estoque de "${product.name}" ajustado de ${oldQty} para ${newQuantity} un na unidade.`,
    };
  };

  // CRUD Product
  const createProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 10),
    };
    setProducts((prev) => [newProduct, ...prev]);
    return { success: true, message: `Produto "${data.name}" cadastrado com sucesso.` };
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    return { success: true, message: 'Dados do produto atualizados.' };
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    return { success: true, message: 'Produto removido do cadastro.' };
  };

  const createSupplier = (data: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      ...data,
      id: `sup-${Date.now()}`,
    };
    setSuppliers((prev) => [newSupplier, ...prev]);
    return { success: true, message: `Fornecedor "${data.name}" cadastrado com sucesso.` };
  };

  // Reset demo state
  const resetToMockData = () => {
    setProducts(INITIAL_PRODUCTS);
    setSuppliers(INITIAL_SUPPLIERS);
    setTransfers(INITIAL_TRANSFERS);
    setPurchases(INITIAL_PURCHASES);
    setSales(INITIAL_SALES);
    setMovements(INITIAL_MOVEMENTS);
    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.SUPPLIERS);
      localStorage.removeItem(STORAGE_KEYS.TRANSFERS);
      localStorage.removeItem(STORAGE_KEYS.PURCHASES);
      localStorage.removeItem(STORAGE_KEYS.SALES);
      localStorage.removeItem(STORAGE_KEYS.MOVEMENTS);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentView,
        setCurrentView,
        brandModalOpen,
        setBrandModalOpen,
        selectedUnitFilter,
        setSelectedUnitFilter,
        units,
        products,
        suppliers,
        transfers,
        purchases,
        sales,
        movements,
        alerts,
        metrics,
        executeTransfer,
        updateTransferStatus,
        registerSale,
        createPurchase,
        adjustStock,
        createProduct,
        updateProduct,
        deleteProduct,
        createSupplier,
        resetToMockData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
