import SearchService from "../services/SearchService";

export default class SearchResource {
  async index(request, response) {
    try {
      const result = await new SearchService().index(request.query);
      return response.status(200).json(result);
    } catch (error) {
      response.status(error.code).json(error);
    }
  }
}
