import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { I18N_NAMESPACE } from "./constants.js";
import { reconcileAskUserQuestionTool, registerAskUserQuestionReconciler } from "./reconcile.js";
import { registerAskUserQuestionTool } from "./registration.js";

let localesLoad: Promise<void> | undefined;

async function loadLocales(): Promise<void> {
	try {
		const sdk = await import("@juicesharp/rpiv-i18n/loader");
		sdk.registerLocalesFromDir(I18N_NAMESPACE, import.meta.url);
	} catch {
		// The optional i18n package is absent in standalone installs.
	}
}

function registerLocales(): Promise<void> {
	localesLoad ??= loadLocales();
	return localesLoad;
}

export default function askUserQuestionExtension(pi: ExtensionAPI): void {
	registerAskUserQuestionTool(pi);
	registerAskUserQuestionReconciler(pi);
	pi.on("session_start", () => {
		const timer = setTimeout(() => void registerLocales(), 0);
		timer.unref?.();
	});
}

export { reconcileAskUserQuestionTool };
