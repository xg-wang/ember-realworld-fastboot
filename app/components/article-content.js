import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/string';

export default class ArticleContentComponent extends Component {
  @tracked marked = null;

  constructor() {
    super(...arguments);
    import('marked').then((module) => {
      this.marked = module.default;
    });
  }

  get safeMarkup() {
    return htmlSafe(this.marked?.(this.args.article.body));
  }
}
