import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';

export default class TagListComponent extends Component {
  @service session;
  @service fastboot;
  @tracked tags = [];

  constructor() {
    super(...arguments);
    if (!this.fastboot.isFastBoot) {
      this.loadTags.perform();
    }
  }

  @task({ restartable: true })
  *loadTags() {
    let { tags } = yield this.session.fetch('/tags');
    this.tags = tags;
  }
}
