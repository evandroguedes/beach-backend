// just offline tests
const admin = require('firebase-admin');
const api = require('../index.js');

const mockOnce = jest.fn();

mockOnce.mockReturnValue(true);

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  database: () => ({
    ref: jest.fn(path => ({
      once: mockOnce
    })),
  }),
  credential: {
    cert: jest.fn(),
  },
}));

it('should get beaches by state and name', async () => {

  const response = {
    set: jest.fn(),
  };

  const request = {
    query: {
      state: 'SC',
      beachName: 'praia do jaça',
    },
  };

  api.getBeachesByNameAndState(request, response);
  expect(admin.database().ref('/beaches/sc').once).toHaveBeenCalled();
});
