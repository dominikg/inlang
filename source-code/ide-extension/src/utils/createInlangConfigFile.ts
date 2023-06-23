import * as vscode from "vscode"
import { getGitOrigin, telemetry } from "../services/telemetry/implementation.js"

export const disableConfigFileCreation = async (): Promise<boolean> => {
	const gitOrigin = await getGitOrigin()
	const _recommendation = vscode.workspace
		.getConfiguration("inlang")
		.get("disableConfigFileCreation") as string[]
	return _recommendation.includes(gitOrigin)
}

export const createInlangConfigFile = async ({
	workspaceFolder,
}: {
	workspaceFolder: vscode.WorkspaceFolder
}) => {
	// check if config file already exists
	const configFiles = await vscode.workspace.findFiles("inlang.config.js")
	if (configFiles.length > 0) return

	// check if disabledConfigCreation setting is set to true
	if (await disableConfigFileCreation()) return

	// check if the repository has either i18next or typesafe-i18n installed in dependencies or devDependencies
	// TODO

	// Prompt the user to create a config file with the message like Improve your i18n experience with Inlang. Do you want to create a config file?
	const createConfigFile = await vscode.window.showInformationMessage(
		"Improve your i18n experience with Inlang. Do you want to create a config file?",
		"Accept",
		"Reject",
	)

	if (createConfigFile === "Accept") {
		// TODO: create config file
	} else {
		// add git origin to disableConfigCreation setting
		const gitOrigin = await getGitOrigin()
		const _recommendation = vscode.workspace
			.getConfiguration("inlang")
			.get("disableConfigFileCreation") as string[]
		await vscode.workspace
			.getConfiguration("inlang")
			.update("disableConfigFileCreation", [..._recommendation, gitOrigin], true)
	}

	// Track the outcome
	telemetry.capture({
		event: "IDE-EXTENSION completed create config file",
		// if the user does not react, the outcome is undefined aka "Ignored"
		properties: { outcome: createConfigFile ?? "Ignored" },
	})
}
