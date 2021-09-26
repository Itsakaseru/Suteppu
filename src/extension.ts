import * as vscode from "vscode";
import saveStep from "./commands/saveStep";
import redoStep from "./commands/redoStep";
import clearAllSteps from "./commands/clearAllSteps";
import saveToFile from "./commands/saveToFile";
import loadFromFile from "./commands/loadFromFile";
import { Suteppu, SuteppuProvider } from "./provider/SuteppuProvider";
import deleteStep from "./commands/deleteStep";

export function activate({ subscriptions }: vscode.ExtensionContext)
{
	let status = {
		reStep: true,
	};

	const temporaryStorage: any = [];

	const suteppu = new SuteppuProvider(temporaryStorage);

	vscode.window.registerTreeDataProvider(
		"suteppu.view.storage",
		suteppu
	);

	vscode.window.createTreeView("suteppu.view.storage", {
		treeDataProvider: suteppu
	});

	subscriptions.push(
		vscode.commands.registerCommand("suteppu.saveStep", () => saveStep(suteppu, temporaryStorage))
	);

	subscriptions.push(
		vscode.commands.registerCommand("suteppu.reStep", () => {
			if (status.reStep)
			{
				status.reStep = false;
				redoStep(suteppu, temporaryStorage, status);
			}
		})
	);

	subscriptions.push(
		vscode.commands.registerCommand("suteppu.clearAllSteps", () => clearAllSteps(suteppu, temporaryStorage))
	);

	subscriptions.push(
		vscode.commands.registerCommand("suteppu.saveToFile", () => saveToFile(temporaryStorage))
	);

	subscriptions.push(
		vscode.commands.registerCommand("suteppu.loadFromFile", () => loadFromFile(suteppu, temporaryStorage))
	);

	subscriptions.push(
		vscode.commands.registerCommand("suteppu.deleteStep", (step: Suteppu) => deleteStep(suteppu, temporaryStorage, step))
	);
}