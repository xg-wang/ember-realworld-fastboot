/* eslint-disable ember/no-mixins */
import { errorsHashToArray } from '@ember-data/adapter/error';
import RESTAdapter from '@ember-data/adapter/rest';
import FastbootAdapter from 'ember-data-storefront/mixins/fastboot-adapter';
import { inject as service } from '@ember/service';
import ENV from 'ember-realworld/config/environment';

export default class ApplicationAdapter extends RESTAdapter.extend(FastbootAdapter) {
  @service session;

  host = ENV.APP.apiHost;

  headers = {
    Authorization: this.session.token ? `Token ${this.session.token}` : '',
  };

  handleResponse(status, headers, payload) {
    if (this.isInvalid(...arguments)) {
      if (typeof payload === 'string') {
        payload = JSON.parse(payload);
      }
      payload.errors = errorsHashToArray(payload.errors);
    }

    return super.handleResponse(status, headers, payload);
  }
}
