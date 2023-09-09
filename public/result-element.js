import { LitElement, html, css } from "lit"

export class ResultElement extends LitElement {
	static properties = {
		result: {},
	}

	static styles = css`
	`

	constructor() {
		super()
	}

	render() {
		if (this.result?.error) {
			const text = JSON.stringify(this.result.error, null, "  ")
			return html`
				<h1>エラー</h1>
				<pre>${text}</pre>
			`
		}
		if (this.result?.data) {
			const data = this.result.data

			let content
			if (data.operation === "get-title") {
				content = html`<p>${data.title}</p>`
			} else if (data.operation === "get-external-links") {
				content = html`
					<nav>
						${data.links.map(({ text, url }) => html`<div><a href=${url}>${text}</a></div>`)}
					</nav>
				`
			}

			return html`
				<h1>${data.operation}</h1>
				${content}
			`
		}
		return html`<p>操作してください</p>`
	}

	show(result) {
		this.result = result
	}
}
