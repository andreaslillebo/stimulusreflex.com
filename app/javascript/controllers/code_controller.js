import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ 'code' ];

  copy () {
    navigator.clipboard.writeText(this.codeTarget.innerHTML);
  }
}
