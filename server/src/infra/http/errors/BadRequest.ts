export class BadRequest extends Error {
  public statusCode: number
  public title: string

  constructor(message: string) {
    super(message)
    this.statusCode = 400
    this.title = 'Bad Request'
  }
}
