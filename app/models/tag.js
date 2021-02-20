import Model, { attr, belongsTo } from '@ember-data/model';

export default class TagModel extends Model {
  @attr name;
}
