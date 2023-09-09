import child_process from "node:child_process"

import CDP from "chrome-remote-interface"

import { sleep, maxRetry } from "./utils.js"

export class Browser {
	client = null

	async open() {
		child_process.spawn(`start-browser.bat`, { shell: true })
		await maxRetry(10, async () => {
			await sleep(1000)
			this.client = await CDP()
		})
	}

	async executeScript(expression) {
		return await this.client.Runtime.evaluate({ expression, returnByValue: true })
	}

	async navigate(url) {
		await this.client.Page.navigate({ url })
	}

	async close() {
		await this.client.close()
	}
}
