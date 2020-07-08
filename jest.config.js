module.exports = {
	transform: {
    "^.+\\.js?$": "babel-jest"
  },
	testRegex: 'functions(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	testPathIgnorePatterns: ['lib/', 'node_modules/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testEnvironment: 'node',
	rootDir: 'functions',
}