import DevService from '../services/DevService';
const devService = new DevService();

export default class DevResource {

  async index(request, response) {
    try {
      const devs = await devService.findAll();

      return response.status(200).json(devs);
    } catch (error) {
      response.status(error.code).json(error);
    }
  }

  async store(request, response) {
    try {
      const body = request.body;
      const dev = await devService.save(body);

      return response.status(200).json(dev);
    } catch (error) {
      console.log(error);
      return response.status(error.code ? error.code : 500).send(error);
    }
  }

}
