import { spawn } from "child_process"
import * as path from 'path'
import { fileURLToPath } from 'url';
    
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.on('uncaughtException', console.error)

function start() {
	let args = [path.join(__dirname, '/src/bot.js'), ...process.argv.slice(2)]
	let session = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting Bot...')
			session.kill()
			start()
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		if (code == 1) return
		if (code == "." || code == 0) start()
	})
}
start()