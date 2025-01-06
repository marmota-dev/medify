export class BadRequest extends Error {
  public statusCode: number
  public name: string

  constructor(message: string) {
    super(message)
    this.statusCode = 400
    this.name = 'Bad Request'
  }
}
