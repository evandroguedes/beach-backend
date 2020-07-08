const utils = require('../utils.js');

it('should sanitize state', async () => {
  const state = 'AL';
  expect(utils.sanitizeState(state)).toEqual('al');
});

it('should sanitize beach name', async () => {
  const beach = 'praia do RóSA';
  expect(utils.sanitizeBeachName(beach)).toEqual('praiadorosa');
});
