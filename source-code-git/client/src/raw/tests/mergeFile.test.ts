// @ts-nocheck
/* eslint-env node, browser, jasmine */
import { describe, it, expect, beforeAll } from "vitest"
import { makeFixture } from "./makeFixture.js"
import { mergeFile } from "isomorphic-git/internal-apis.js"

describe("mergeFile", () => {
	it("mergeFile a o b", async () => {
		// Setup
		const { fs, dir } = await makeFixture("test-mergeFile")
		// Test
		const ourContent = await fs.read(`${dir}/a.txt`, "utf8")
		const baseContent = await fs.read(`${dir}/o.txt`, "utf8")
		const theirContent = await fs.read(`${dir}/b.txt`, "utf8")

		const { cleanMerge, mergedText } = mergeFile({
			contents: [baseContent, ourContent, theirContent],
			branches: ["base", "ours", "theirs"],
		})
		expect(cleanMerge).toBe(true)
		expect(mergedText).toEqual(await fs.read(`${dir}/aob.txt`, "utf8"))
	})

	it("mergeFile a o c", async () => {
		// Setup
		const { fs, dir } = await makeFixture("test-mergeFile")
		// Test
		const ourContent = await fs.read(`${dir}/a.txt`, "utf8")
		const baseContent = await fs.read(`${dir}/o.txt`, "utf8")
		const theirContent = await fs.read(`${dir}/c.txt`, "utf8")

		const { cleanMerge, mergedText } = mergeFile({
			contents: [baseContent, ourContent, theirContent],
			branches: ["base", "ours", "theirs"],
		})
		expect(cleanMerge).toBe(false)
		expect(mergedText).toEqual(await fs.read(`${dir}/aoc.txt`, "utf8"))
	})
})
