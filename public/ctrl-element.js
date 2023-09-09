import { LitElement, html, css } from "lit"

export class CtrlElement extends LitElement {
	static properties = {
	}

	static styles = css`
		.container {
			display: flex;
			gap: 10px;
		}
	`

	constructor() {
		super()
	}

	render() {
		return html`
			<div class="container">
				<button @click=${this.getTitle}>タイトル取得</button>
				<button @click=${this.getExternalLinks}>外部リンク取得</button>
				<button @click=${this.reset}>ページリセット</button>
			</div>
		`
	}

	sendEvent(operation, options) {
		this.dispatchEvent(new CustomEvent("ctrl", { detail: { operation, options } }))
	}

	getTitle() {
		this.sendEvent("get-title")
	}

	getExternalLinks() {
		this.sendEvent("get-external-links")
	}

	reset() {
		this.sendEvent("reset")
	}
}

