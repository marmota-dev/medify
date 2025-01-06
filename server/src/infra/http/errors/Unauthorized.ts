export class Unauthorized extends Error {
  public statusCode: number
  public name: string

  constructor(message: string) {
    super(message)
    this.statusCode = 401
    this.name = 'Unauthorized'
  }
}
