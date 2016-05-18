import 'whatwg-fetch';
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */

// get请求
const _get = ({ url, query }) => {
  let _url;
  if (query) {
    _url = `https://cnodejs.org/api/v1${url}?${query}`;
  } else {
    _url = `https://cnodejs.org/api/v1${url}`;
  }

  return fetch(_url)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      return Promise.reject(new Error(res.status));
    });
};

// post请求
const _post = (url, params) => {
  return fetch(`https://cnodejs.org/api/v1${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  });
};

// 获取文章列表
export const fetchTopicLists = ({ dispatch }, topicTab) => {
  const url = '/topics';
  const query = `tab=${topicTab}`;
  _get({ url, query }, topicTab)
    .then((json) => {
      if (json.success) {
        return dispatch('FETCH_TOPIC_LISTS_SUCCESS', json.data, topicTab);
      }
      return Promise.reject(new Error('fetchTopicLists failure'));
    })
    .catch((error) => {
      console.log(error);
      dispatch('FETCH_TOPIC_LISTS_FAILURE', topicTab);
    });
};

// 获取某一文章
export const fetchTopic = ({ dispatch }, id) => {
  const url = `/topic/${id}`;
  _get({ url })
    .then((json) => {
      if (json.success) {
        return dispatch('FETCH_TOPIC_SUCCESS', json.data);
      }
      return Promise.reject(new Error('fetchTopic failure'));
    })
    .catch((error) => {
      console.log(error);
      dispatch('FETCH_TOPIC_FAILURE');
    });
};

// 改变token的有效性
export const changeTokenAvail = ({ dispatch }, isAvail) => dispatch('CHANGE_TOKEN_AVAIL', isAvail);

// 改变token值
export const changeToken = ({ dispatch }, value) => dispatch('CHANGE_TOKEN', value);

// 检验token的合法性
export const checkToken = ({ dispatch }, accesstoken) => {
  const url = '/accesstoken';
  const params = { accesstoken };
  return _post(url, params)
  .then((json) => {
    if (json.success) {
      dispatch('CHECK_TOKEN_SUCCESS');
      return json.loginname;
    }
    return Promise.reject(new Error('checkToken failure'));
  })
  .catch((error) => {
    console.log(error);
    dispatch('CHECK_TOKEN_FAILURE');
  });
};

// 获取用户信息
export const fetchUser = ({ dispatch }, loginName) => {
  const url = `/user/${loginName}`;
  return _get({ url })
  .then((json) => {
    if (json.success) {
      dispatch('FETCH_USER_SUCCESS', json.data);
      return loginName;
    }
    return Promise.reject(new Error('fetchUser failure'));
  })
  .catch((error) => {
    console.log(error);
    dispatch('FETCH_USER_FAILURE');
  });
};

// 加入收藏
export const addCollection = ({ dispatch }, topic_id, accesstoken) => {
  const url = '/topic_collect/collect';
  const params = { accesstoken, topic_id };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return dispatch('ADD_COLLECTION_SUCCESS', topic_id);
      }
      return Promise.reject(new Error('addCollection failure'));
    })
    .catch((error) => console.log(error));
};

// 取消收藏
export const deCollection = ({ dispatch }, topic_id, accesstoken) => {
  const url = '/topic_collect/de_collect';
  const params = { accesstoken, topic_id };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return dispatch('DE_COLLECTION_SUCCESS', topic_id);
      }
      return Promise.reject(new Error('deCollection failure'));
    })
    .catch((error) => console.log(error));
};

// 获取收藏文章
export const fetchCollection = ({ dispatch }, loginName) => {
  const url = `/topic_collect/${loginName}`;
  _get({ url })
    .then((json) => {
      if (json.success) {
        return dispatch('FETCH_COLLECTION_SUCCESS', json.data);
      }
      return Promise.reject(new Error('fetchCollection failure'));
    })
    .catch((error) => console.log(error));
};

// 改变收藏状态
export const changeCollectStatus = ({ dispatch }, status) => dispatch('CHANGE_COLLECT_STATUS', status);

export const replyTopic = ({ dispatch }, topic_id, accesstoken, content) => {
  const url = `/topic/${topic_id}/replies`;
  const params = { accesstoken, topic_id, content };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return console.log('reply success');
      }
      return Promise.reject(new Error('repy failure'));
    })
    .catch((error) => console.log(error));
};
