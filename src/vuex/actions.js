import 'whatwg-fetch';
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
export const fetchTopicLists = ({ dispatch }, topicTab) => {
  fetch(`https://cnodejs.org/api/v1/topics?tab=${topicTab}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((json) => dispatch('FETCH_TOPIC_LISTS_SUCCESS', json.data, topicTab))
    .catch(() => dispatch('FETCH_TOPIC_LISTS_FAILURE', topicTab));
};

export const fetchTopic = ({ dispatch }, id) => {
  fetch(`https://cnodejs.org/api/v1/topic/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((json) => dispatch('FETCH_TOPIC_SUCCESS', json.data))
    .catch(() => dispatch('FETCH_TOPIC_FAILURE'));
};

export const changeTokenAvail = ({ dispatch }, isAvail) => dispatch('CHANGE_TOKEN_AVAIL', isAvail);

export const changeToken = ({ dispatch }, value) => dispatch('CHANGE_TOKEN', value);

export const checkToken = ({ dispatch }, accesstoken) => {
  const pro = new Promise((resolve) => {
    fetch('https://cnodejs.org/api/v1/accesstoken', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accesstoken,
      }),
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((json) => {
      dispatch('CHECK_TOKEN_SUCCESS');
      resolve(json.loginname);
    })
    .catch(() => {
      dispatch('CHECK_TOKEN_FAILURE');
    });
  });
  return pro;
};

export const fetchUser = ({ dispatch }, loginName) => {
  return fetch(`https://cnodejs.org/api/v1/user/${loginName}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((json) => {
      dispatch('FETCH_USER_SUCCESS', json.data);
      return loginName;
    })
    .catch(() => dispatch('FETCH_USER_FAILURE'));
};

export const addCollection = ({ dispatch }, topic_id, accesstoken) => {
  return fetch('https://cnodejs.org/api/v1/topic_collect/collect', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accesstoken,
      topic_id,
    }),
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
  .then((json) => {
    if (json.success) {
      return dispatch('ADD_COLLECTION_SUCCESS', topic_id);
    }
    throw new Error('collect failure');
  })
  .catch(() => console.log('add collection failure'));
};

export const fetchCollection = ({ dispatch }, loginName) => {
  fetch(`https://cnodejs.org/api/v1/topic_collect/${loginName}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((json) => dispatch('FETCH_COLLECTION_SUCCESS', json.data))
    .catch(() => console.log('fetch collection failure'));
};

export const changeCollectStatus = ({ dispatch }, status) => dispatch('CHANGE_COLLECT_STATUS', status);

