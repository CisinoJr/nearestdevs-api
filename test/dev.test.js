import 'core-js/stable';
import 'regenerator-runtime/runtime';
import DevService from '../src/app/services/DevService';

const devService = new DevService();

describe('Running all tests for dev functionality', async () => {
  test('Test github response with user info', async () => {
    const response = await devService.getGithubInfo('cisinojr');

    expect(response).not.toBeUndefined();
  }, 5000);

  test('Checks if a dev already exists', async () => {
    const dev = await devService.devExists('cisinojr');

    expect(dev).toBeTruthy();
  }, 5000);

  test('Saves dev info in mongoDB', async () => {
    const devInfo = {
      github_username: 'cisinojr',
      techs: 'Java, NodeJs, Kotlin',
      latitude: '',
      longitude: '',
    };

    const dev = await devService.save(devInfo);

    expect(dev).not.toBeUndefined();
  }, 5000);
});
