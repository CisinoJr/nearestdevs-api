import axios from 'axios';
import ErrorMessage from '../utils/ErrorMessage';
import parseStringAsArray from '../utils/parseStringAsArray';

axios.defaults.adapter = require('axios/lib/adapters/http');

const { findConnections, sendMessage } = require('../../config/websocket');

const Dev = require('../models/Dev');

export default class DevService {

  /**
   * Return all devs
   */
  async findAll() {
    try {
      const devs = await Dev.find();
      return devs;
    } catch (error) {
      throw new ErrorMessage(500, 'Occoreu um erro interno no servidor', 'Internal Server Error');
    }
  }

  async filter(search) {
    try {
      const filteredDevs = await Dev.find(search).catch((error) => { throw error });
      return filteredDevs;
    } catch (error) {
      throw new ErrorMessage(500, 'Occoreu um erro interno no servidor', 'Internal Server Error');
    }
  }

  /**
   * Saves dev info into mongoDB
   * @param { github_username, techs, latitude, longitude } devInfo
   * @returns dev info
   */
  async save(devInfo) {
    try {
      const { github_username, techs, latitude, longitude } = devInfo;
      const exists = await this.isDeveloperRegistered(github_username);

      if (exists) {
        throw new ErrorMessage(400, "Desenvolvedor já cadastrado na plataforma!", 'Validation');
      }

      const { name, avatar_url, bio, login } = await this.getGithubInfo(github_username);
      const techsArray = parseStringAsArray(techs, ',');
      const location = { type: 'Point', coordinates: [longitude, latitude], };

      const dev = await Dev.create({
        github_username,
        name: name || login, // Atribui o login caso o usuário não possua um nome no github
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filter devs
      const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);

      // Send message to client using socket
      sendMessage(sendSocketMessageTo, 'new-dev', dev);

      return dev;
    } catch (error) {
      throw error;
    }
  }

  async getGithubInfo(githubUsername) {
    try {
      const githubUri = 'http://api.github.com/users';
      const apiResponse = await axios.get(`${githubUri}/${githubUsername}`);

      return apiResponse.data;
    } catch (error) {
      throw new ErrorMessage(400, `Dev não encontrado no github`, 'Bad Credentials');
    }
  }

  async isDeveloperRegistered(github_username) {
    const dev = await Dev.findOne({ github_username });
    return !!dev;
  }
}
