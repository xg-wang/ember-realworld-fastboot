import Transform from '@ember-data/serializer/transform';

export default class ArrayTransform extends Transform {
  deserialize(serialized) {
    if (Ember.isArray(serialized)) {
      return Ember.A(serialized);
    } else {
      return Ember.A();
    }
  }

  serialize(deserialized) {
    if (Ember.isArray(deserialized)) {
      return Ember.A(deserialized);
    } else {
      return Ember.A();
    }
  }
}
