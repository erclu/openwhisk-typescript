export default class HtmlMessage {
  constructor(public readonly body: string, public readonly statusCode: number = 200) {}
}
