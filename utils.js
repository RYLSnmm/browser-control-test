import { fileURLToPath } from "node:url"
import path from "node:path"

export const getPath = (import_meta_url) => {
	const __filename = fileURLToPath(import_meta_url)
	const __dirname = path.dirname(__filename)
	return { __dirname, __filename }
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const maxRetry = async (n, fn) => {
	let error
	for (let i = 0; i < n; i++) {
		try {
			return await fn()
		} catch (err) {
			error = err
		}
	}
	throw error
}
