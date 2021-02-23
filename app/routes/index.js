import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const NUMBER_OF_ARTICLES = 10;

export default class IndexRoute extends Route {
  @service session;

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

  model(params) {
    const { feed, page, tag } = params;

    let offset = (parseInt(page, 10) - 1) * NUMBER_OF_ARTICLES;
    if (feed === 'your') {
      return this.session.user.fetchFeed(page);
    } else {
      return this.store.query('article', {
        limit: NUMBER_OF_ARTICLES,
        offset,
        tag,
      });
    }
  }
}
