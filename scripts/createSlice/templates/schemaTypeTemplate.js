const firstCharToUpperCase = require('../firstCharToUpperCase');

module.exports = (slice) => (`export interface ${firstCharToUpperCase(slice)}Schema {
    
}`);
