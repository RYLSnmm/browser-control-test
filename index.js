import path from "node:path"

import fastify from "fastify"

import { Browser } from "./browser.js"
import { getPath } from "./utils.js"

const { __dirname } = getPath(import.meta.url)

const initial_url = "https://nmm.blog.jp"

const main = async () => {
	const browser = new Browser()
	await browser.open()
	await browser.navigate(initial_url)

	const app = fastify({ logger: true })

	await app.register(import("@fastify/static"), {
		root: path.join(__dirname, "public"),
	})

	app.post("/ctrl/get-title", async (req, reply) => {
		const { result } = await browser.executeScript(`document.title`)
		return { operation: "get-title", title: result.value }
	})

	app.post("/ctrl/get-external-links", async function (req, reply) {
		const expression = `
			[...document.links]
				.filter(a => a.href.startsWith("http") && !a.href.startsWith(location.origin))
				.map(a => ({ url: a.href, text: a.textContent }))
		`
		const { result } = await browser.executeScript(expression)

		return { operation: "get-external-links", links: result.value }
	})

	app.post("/ctrl/reset", async function (req, reply) {
		await browser.navigate(initial_url)
		return { operation: "reset" }
	})

	await app.listen({ port: 3000 })
}

main()
