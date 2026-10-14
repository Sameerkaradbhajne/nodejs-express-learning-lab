// pathDemo.js - Safe path module demonstrator
const path = require('path');

/**
 * Demonstrates path utility methods on a given path string
 * Returns safe parsed components without exposing system secrets
 */
function analyzePath(inputPath) {
  // If no input path provided, use a default sample path
  const sample = inputPath && typeof inputPath === 'string' && inputPath.trim() !== ''
    ? inputPath.trim()
    : 'backend/routes/api.js';

  // Perform standard path operations
  const basename = path.basename(sample);
  const extname = path.extname(sample);
  const dirname = path.dirname(sample);
  const normalized = path.normalize(sample);
  const joinedExample = path.join('workspace', 'projects', 'server', basename);
  const parsed = path.parse(sample);

  return {
    inputPath: sample,
    operations: {
      'path.basename(path)': basename,
      'path.extname(path)': extname,
      'path.dirname(path)': dirname,
      'path.normalize(path)': normalized,
      'path.join("workspace", "projects", "server", basename)': joinedExample,
      'path.parse(path)': {
        root: parsed.root,
        dir: parsed.dir,
        base: parsed.base,
        ext: parsed.ext,
        name: parsed.name
      }
    },
    explanations: {
      basename: 'Extracts the final portion of a path (the file name with extension).',
      extname: 'Returns the extension of the path, from the last "." to end of string.',
      dirname: 'Returns the directory name of a path, similar to the Unix dirname command.',
      join: 'Joins all given path segments together using the platform-specific separator.',
      parse: 'Returns an object whose properties represent significant elements of the path.'
    }
  };
}

module.exports = {
  analyzePath
};
