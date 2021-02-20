import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task, lastValue } from 'ember-concurrency-decorators';

export default class ArticleListComponent extends Component {
  @service session;
  @service store;
  @service fastboot;

  @tracked
  articles = [];

  constructor() {
    super(...arguments);
    this.articles = this.args.articles;
  }

  @task
  loadArticles = function* () {
    let NUMBER_OF_ARTICLES = 10;
    let offset = (parseInt(this.args.page, 10) - 1) * NUMBER_OF_ARTICLES;
    if (this.args.feed === 'your') {
      this.articles = yield this.session.user.fetchFeed(this.args.page);
      let request = this.session.user.fetchFeed(this.args.page);

      if (this.fastboot.isFastBoot) {
        this.fastboot.deferRendering(request);
      }

      let articles = yield request;

      return articles;
    } else {
      let request = this.store.query('article', {
        limit: NUMBER_OF_ARTICLES,
        offset,
        tag: this.args.tag,
      });

      if (this.fastboot.isFastBoot) {
        this.fastboot.deferRendering(request);

        this.articles = yield request;
        return;
      }

      this.articles = yield request;
    }
  };
}
