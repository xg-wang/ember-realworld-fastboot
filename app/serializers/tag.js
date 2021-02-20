import ApplicationSerializer from './application';

export default class TagSerializer extends ApplicationSerializer {
  normalizeResponse(store, primaryModelClass, payload) {
    return {
      data: payload.tags.map((item, idx) => {
        return {
          type: 'tag',
          id: idx,
          attributes: {
            name: item,
          },
        };
      }),
    };
    // super.normalizeResponse(store, primaryModelClass, { data: dataPayload });
  }
}
