const core = require('@actions/core')
const github = require('@actions/github')
const path = require('path')
const glob = require('glob')

try {
	// `who-to-greet` input defined in action metadata file
	const nameToGreet = core.getInput('who-to-greet')
	console.log(`Hello ${nameToGreet}!`)
	const time = new Date().toTimeString()
	core.setOutput('time', time)
	const workSpace = github.context.workspace
	core.setOutput('workspace', workSpace)

	// access the github repository and count JS,TS,JSX,TSX files
	const files = glob.sync(path.join(workSpace, '**/*.+(js|jsx|ts|tsx)'))
	core.setOutput('files', files.length)
} catch (error) {
	core.setFailed(error.message)
}
