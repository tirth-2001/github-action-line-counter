const core = require('@actions/core')
const github = require('@actions/github')
const path = require('path')
const glob = require('glob')

try {
	const time = new Date().toTimeString()
	core.setOutput('time', time)
	const workSpace = github.context.workspace
	core.setOutput('workspace', workSpace)

	// access the github repository and count JS,TS,JSX,TSX files and exclude node_modules
	const files = glob.sync(path.join(workSpace, '**/*.{js,ts,jsx,tsx}'), {
		ignore: 'node_modules/**',
	})
	core.setOutput('files', files.length)
} catch (error) {
	core.setFailed(error.message)
}
