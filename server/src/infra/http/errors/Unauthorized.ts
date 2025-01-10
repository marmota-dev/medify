export class Unauthorized extends Error {
  public statusCode: number
  public title: string

  constructor(message: string) {
    super(message)
    this.statusCode = 401
    this.title = 'Unauthorized'
  }
}
