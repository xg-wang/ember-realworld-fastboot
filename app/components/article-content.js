import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';
import marked from 'marked';

export default class ArticleContentComponent extends Component {
  get safeMarkup() {
    return htmlSafe(marked(this.args.article.body));
  }
}
