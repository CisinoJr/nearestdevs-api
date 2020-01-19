import parseStringAsArray from '../utils/parseStringAsArray';
import DevService from './DevService';

const devService = new DevService();

export default class SearchService {

  async index(search) {
    try {
      const { latitude, longitude, techs } = search;
      const techsArray = parseStringAsArray(techs, ',');
      const filter = {
        techs: { $in: techsArray },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000,
          }
        }
      }

      return devService.filter(filter);
    } catch (error) {
      throw error;
    }
  }

}
