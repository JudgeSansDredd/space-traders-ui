export interface ViewMarketResponseType {
  data: MarketData;
}

interface MarketData {
  symbol: string;
  imports: Import[];
  exports: Import[];
  exchange: Import[];
  transactions: Transaction[];
  tradeGoods: TradeGood[];
}

interface TradeGood {
  symbol: string;
  tradeVolume: number;
  type: string;
  supply: string;
  purchasePrice: number;
  sellPrice: number;
  activity?: string;
}

interface Transaction {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: string;
  type: string;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: string;
}

interface Import {
  symbol: string;
  name: string;
  description: string;
}
