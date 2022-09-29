/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */
import { Factory } from 'miragejs';

/*
 * New Faker Github repository: https://github.com/faker-js/faker#readme
 * Guide: https://fakerjs.dev/guide/
 */
import { faker } from '@faker-js/faker';

export default {
  product: Factory.extend({
    title() {
      return faker.lorem.words();
    },
    price() {
      return faker.commerce.price();
    },
  }),
};
