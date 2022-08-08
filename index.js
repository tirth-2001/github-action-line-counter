const core = require('@actions/core')
const path = require('path')
const glob = require('glob')

const isDevelopment = process.env.NODE_ENV === 'development'
const developmentCwd = './.github/workflows/'

try {
	const currentPath = isDevelopment ? developmentCwd : process.cwd()
	// go to 2 levels up for repo root
	const rootPath = path.join(currentPath, '../..')

	// access the github repository and count JS,TS,JSX,TSX files and exclude node_modules
	const files = glob.sync(path.join(rootPath, '**/*.{js,ts,jsx,tsx}'), {
		ignore: 'node_modules/**',
	})
	console.log(`Found ${files.length} files`)
	core.setOutput('files', files.length)
} catch (error) {
	core.setFailed(error.message)
}
