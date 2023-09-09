import { LitElement, html, css } from "lit"

export class AppElement extends LitElement {
	static properties = {
	}

	static styles = css`
		div {
			display: flex;
			flex-flow: column;
			gap: 10px;
		}
		hr {
			width: 100%;
		}
	`

	constructor() {
		super()
	}

	render() {
		return html`
			<div>
				<control-element id="ctrl" @ctrl=${this.onctrl}></control-element>
				<hr/>
				<result-element id="result"></result-element>
			</div>
		`
	}

	async onctrl(event) {
		const { operation, options } = event.detail
		const result = this.shadowRoot.getElementById("result")

		const res = await fetch(`/ctrl/${operation}`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(options || {}),
		}).then(async res => {
			let data			
			try {
				data = await res.json()
			} catch {
			}
			if (!res.ok || !data) {
				return {
					error: {
						status: res.ok,
						data: data || "JSON ERROR",
					}
				}
			}
			return { data }
		})

		result.show(res)
	}
}
