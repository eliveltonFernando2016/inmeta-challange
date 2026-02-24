declare global {
  interface User {
    id?: string
    email: string
    name?: string
    password?: string
    cards?: Card[]
  }
}
export { User }