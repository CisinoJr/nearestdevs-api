import { Router } from 'express';
import DevResource from '../app/resources/DevResource';
import SearchResource from '../app/resources/SearchResource';

const devResource = new DevResource();
const searchResource = new SearchResource();
const routes = Router();

routes.post('/api/devs', devResource.store);
routes.get('/api/devs', devResource.index);

routes.get('/api/search', searchResource.index);


module.exports = routes;