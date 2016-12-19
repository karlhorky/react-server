// implements the search algorithm for finding react-server config files. see
// the README.md for a description.
import path from "path"
import fs from "fs"

const REACT_SERVER_RC = ".reactserverrc";
const PACKAGE_JSON = "package.json";
const PATH = process.env.RULES_CONFIG_PATH || ''; //eslint-disable-line no-process-env

// returns an options object that represents the **first** config file found in the
// search path. if none are found, returns null.
// as described in the README, this method starts at dir, and for each directory
// looks first for a .reactserverrc file, then for a "reactServer" section of
// the package.json. if it finds neither, it goes up a directory and looks again.
// it returns the contents of the first config file found; it never merges multiple
// configurations.
export default (dir = process.cwd()) => {
	do {
		let reactServerRc = null;
		try {
			// readFileSync throws if the file doesn't exist.

			reactServerRc = fs.readFileSync(path.join(dir, PATH, REACT_SERVER_RC));
		} catch (e) {} //eslint-disable-line no-empty
		if (reactServerRc) {
			return JSON.parse(reactServerRc);
		}

		let packageJson = null;
		try {
			packageJson = fs.readFileSync(path.join(dir, PACKAGE_JSON));
		} catch (e) {} //eslint-disable-line no-empty

		if (packageJson) {
			const parsedPackageJson = JSON.parse(packageJson);
			if (parsedPackageJson.reactServer) {
				return parsedPackageJson.reactServer;
			}
		}
	} while (dir !== (dir = path.dirname(dir)))

	return null;
}
