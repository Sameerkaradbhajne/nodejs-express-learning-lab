// fileDemo.js - Safe fs operations demonstrator
// Demonstrates safe file interactions with Node's built-in 'fs' and 'path' modules

const fs = require('fs');
const path = require('path');

// Safe, restricted data directory
const DATA_DIR = path.resolve(__dirname, '..', 'data');

/**
 * Ensures a requested filename stays inside DATA_DIR (prevents path traversal)
 */
function getSafeFilePath(fileName) {
  // Sanitize filename: only allow alphanumeric, underscores, hyphens, and dots
  const sanitized = path.basename(fileName);
  return path.join(DATA_DIR, sanitized);
}

/**
 * Reads sample.txt asynchronously
 */
function readSampleFile() {
  const filePath = path.join(DATA_DIR, 'sample.txt');
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);
    return {
      success: true,
      fileName: 'sample.txt',
      sizeBytes: stats.size,
      lastModified: stats.mtime,
      content
    };
  } catch (err) {
    return {
      success: false,
      error: `Could not read sample file: ${err.message}`
    };
  }
}

/**
 * Reads demo.txt or any allowed safe file
 */
function readDemoFile(fileName = 'demo.txt') {
  const safePath = getSafeFilePath(fileName);
  try {
    if (!fs.existsSync(safePath)) {
      return {
        success: false,
        error: `File not found: ${path.basename(safePath)}`
      };
    }
    const content = fs.readFileSync(safePath, 'utf-8');
    const stats = fs.statSync(safePath);
    return {
      success: true,
      fileName: path.basename(safePath),
      sizeBytes: stats.size,
      lastModified: stats.mtime,
      content
    };
  } catch (err) {
    return {
      success: false,
      error: `Failed to read file: ${err.message}`
    };
  }
}

/**
 * Writes or updates demo.txt safely
 */
function writeDemoFile(text, fileName = 'demo.txt') {
  const safePath = getSafeFilePath(fileName);
  try {
    // Only allow updating demo.txt or user-created .txt files within data/
    if (!safePath.endsWith('.txt')) {
      return {
        success: false,
        error: 'Only .txt files in the dedicated demo directory are permitted.'
      };
    }
    fs.writeFileSync(safePath, text, 'utf-8');
    const stats = fs.statSync(safePath);
    return {
      success: true,
      message: `File '${path.basename(safePath)}' written successfully.`,
      fileName: path.basename(safePath),
      bytesWritten: Buffer.byteLength(text, 'utf-8'),
      lastModified: stats.mtime,
      content: text
    };
  } catch (err) {
    return {
      success: false,
      error: `Write failed: ${err.message}`
    };
  }
}

module.exports = {
  readSampleFile,
  readDemoFile,
  writeDemoFile
};
