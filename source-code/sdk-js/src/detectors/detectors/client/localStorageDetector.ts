import type { Detector, DetectorInitializer } from "../../types.js"

type DetectorParameters = [string?]

/**
 * Detects the language stored in localStorage
 * @param name The name of the key in localStorage
 * @returns An Array containing the language stored in localStorage.
 */
export const localStorageDetector = ((name = "language") =>
	[localStorage.getItem(name)].filter(Boolean) as string[]) satisfies Detector<DetectorParameters>

/**
 * Initializes the detector by passing the necessary parameters and returns a detection function without parameters in return
 * @param name The name of the key in localStorage
 * @returns An Array containing the language stored in localStorage.
 */
export const initLocalStorageDetector = ((name) => () =>
	localStorageDetector(name)) satisfies DetectorInitializer<DetectorParameters>
