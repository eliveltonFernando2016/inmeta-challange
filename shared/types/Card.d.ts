declare global {
  interface Card {
    id: string
    name: string
    description: string
    imageUrl: string
    createdAt: Date
  }
}
export { Card }