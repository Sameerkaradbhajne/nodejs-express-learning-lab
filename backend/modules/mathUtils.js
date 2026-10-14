// mathUtils.js - CommonJS Module Demonstration
// Demonstrates exporting functions using module.exports

/**
 * Adds two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

/**
 * Multiplies two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Returns basic mathematical metadata
 */
function getModuleInfo() {
  return {
    moduleName: 'mathUtils',
    system: 'CommonJS',
    exportedMethods: ['add', 'multiply', 'getModuleInfo']
  };
}

// CommonJS export pattern:
module.exports = {
  add,
  multiply,
  getModuleInfo
};
