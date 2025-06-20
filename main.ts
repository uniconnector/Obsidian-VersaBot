import { Plugin, WorkspaceLeaf, ItemView } from 'obsidian';

const VIEW_TYPE_VERSABOT = 'versabot-view';

export default class VersaBotLauncher extends Plugin {
	onload() {
		const ribbonIconEl = this.addRibbonIcon('bot', 'Open VersaBot in Tab', async () => {
			const leaf = this.app.workspace.getLeaf(true);
			await leaf.setViewState({
				type: VIEW_TYPE_VERSABOT,
				active: true,
			});
		});

		// 使用网络图片替换图标
		const iconUrl = 'https://www.versabot.cn/assets/favicon2-QYRZa9A0.ico';
		ribbonIconEl.innerHTML = `
			<img src="${iconUrl}" style="width:18px;height:18px;margin:4px;" />
		`;

		this.registerView(
			VIEW_TYPE_VERSABOT,
			(leaf) => new VersaBotView(leaf)
		);
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_VERSABOT);
	}
}

class VersaBotView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return VIEW_TYPE_VERSABOT;
	}

	getDisplayText(): string {
		return 'VersaBot';
	}

	getIcon(): string {
		return 'bot'; // 虽然图标已被替换，这里不影响
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();

		container.createEl('iframe', {
			attr: {
				src: 'https://www.versabot.cn/?layout=ob',
				style: 'width: 100%; height: 100%; border: none;',
			}
		});
	}

	async onClose() {
		// 可添加清理逻辑
	}
}
