declare global {
  type TradeType = 'OFFERING' | 'RECEIVING'

  interface TradeRequest {
    cardId: string
    type: TradeType
  }

  interface Trade {
    id: string
    userId: string
    createdAt: Date
    user: User
    tradeCards: Card[]
  }
}
export { TradeType, Trade, TradeRequest }