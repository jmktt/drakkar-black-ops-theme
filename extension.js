// Status bar signature, shown only while the Drakkar theme is active.
const vscode = require('vscode');
const THEME = 'Drakkar Black Ops - Full Black';

exports.activate = ctx => {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -1000);
  item.text = '⚔ Drakkar';
  item.tooltip = 'Drakkar Black Ops — by joaom.gueiros';
  const sync = () => vscode.workspace.getConfiguration('workbench').get('colorTheme') === THEME ? item.show() : item.hide();
  sync();
  ctx.subscriptions.push(item, vscode.workspace.onDidChangeConfiguration(e => e.affectsConfiguration('workbench.colorTheme') && sync()));
};
