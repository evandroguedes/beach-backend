exports.sanitizeBeachName = name => name.toLowerCase().replace(/\s/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
exports.sanitizeState = state => state.toLowerCase();