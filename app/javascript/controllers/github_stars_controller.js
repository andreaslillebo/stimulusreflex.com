import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ "starCount" ]
  static values = { starCount: Number }

  async connect () {
    this.starCountValue = await this.fetchStarCount();
  }

  async fetchStarCount () {
    const response = await fetch('https://api.github.com/repos/stimulusreflex/stimulus_reflex');
    const jsonResponse = await response.json();
    const stargazersCount = jsonResponse['stargazers_count'];
    return stargazersCount;
  }

  starCountValueChanged() {
    // Only try display the count if there is a valid number
    if(isNaN(this.starCountValue)) { return }

    // Convert star count to thousands, e.g. `1812` -> `1.8K`
    this.starCountTarget.innerHTML = `${(this.starCountValue / 1000.).toFixed(1)}K`;
  }
}
