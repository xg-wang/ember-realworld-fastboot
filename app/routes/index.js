import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service fastboot;
  model() {
    return hash({
      articles: this.store.query('article', {
        limit: 10,
        offset: 0,
      }),
      tags: [],
    });
  }

  queryParams = {
    feed: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
    tag: {
      refreshModel: true,
    },
  };
}
