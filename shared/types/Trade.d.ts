declare global {
  type TradeType = 'OFFERING' | 'RECEIVING'

  interface Trade {
    cardId: string
    type: TradeType
  }
}
export { TradeType, Trade }