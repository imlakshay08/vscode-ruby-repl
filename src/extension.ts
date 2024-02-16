import * as vscode from 'vscode';
import { spawn } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    // Command to launch Ruby REPL
    let disposable = vscode.commands.registerCommand('vscode-ruby-repl.helloWorld', () => {
        // Spawn a new Ruby process for the REPL
        const rubyREPL = spawn('C:/Ruby32-x64/bin/irb', [], { stdio: 'inherit' });

        // Handle errors
        rubyREPL.on('error', (err) => {
            vscode.window.showErrorMessage(`Error launching Ruby REPL: ${err.message}`);
        });
        
        // Handle exit
        rubyREPL.on('exit', (code, signal) => {
            if (code !== null) {
                vscode.window.showInformationMessage(`Ruby REPL exited with code ${code}`);
            } else if (signal !== null) {
                vscode.window.showInformationMessage(`Ruby REPL exited due to signal ${signal}`);
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
