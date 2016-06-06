import 'whatwg-fetch';
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */

/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
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

/**
 * post请求
 * @param  {String} url    api地址
 * @param  {Object} params 包含post内容的object
 * @return {Promise}        Promise
 */
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

/**
 * 获取文章列表
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} topicTab         主题分类
 * @param  {Number} page             页数
 * @return {Promise}                  Promise
 */
export const fetchTopicLists = ({ dispatch }, topicTab, page) => {
  const url = '/topics';
  const query = `tab=${topicTab}&page=${page}`;
  return _get({ url, query }, topicTab)
    .then((json) => {
      if (json.success) {
        return dispatch('FETCH_TOPIC_LISTS_SUCCESS', json.data, topicTab, page);
      }
      return Promise.reject(new Error('fetchTopicLists failure'));
    })
    .catch((error) => {
      dispatch('FETCH_TOPIC_LISTS_FAILURE', topicTab, page);
      return Promise.reject(error);
    });
};

/**
 * 获取某一文章
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} id               文章id
 * @return {Promise}                  Promise
 */
export const fetchTopic = ({ dispatch }, id) => {
  const url = `/topic/${id}`;
  return _get({ url })
    .then((json) => {
      if (json.success) {
        dispatch('FETCH_TOPIC_SUCCESS', json.data);
        return json.data.author.loginname;
      }
      return Promise.reject(new Error('fetchTopic failure'));
    })
    .catch((error) => {
      dispatch('FETCH_TOPIC_FAILURE');
      return Promise.reject(error);
    });
};

/**
 * 改变token的有效性
 * @param  {Function}  options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {Boolean} isAvail          token是否有效
 */
export const changeTokenAvail = ({ dispatch }, isAvail) => dispatch('CHANGE_TOKEN_AVAIL', isAvail);

/**
 * 改变token的值
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken            accesstoken的值
 */
export const changeToken = ({ dispatch }, accesstoken) => dispatch('CHANGE_TOKEN', accesstoken);

/**
 * 检验token的合法性
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
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
    dispatch('CHECK_TOKEN_FAILURE');
    return Promise.reject(error);
  });
};

/**
 * 获取用户信息
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} loginName        用户名
 * @return {Promise}                  Promise
 */
export const fetchUser = ({ dispatch }, loginName) => {
  const url = `/user/${loginName}`;
  return _get({ url })
  .then((json) => {
    if (json.success) {
      dispatch('FETCH_USER_SUCCESS', json.data);
      return json.data;
    }
    return Promise.reject(new Error('fetchUser failure'));
  })
  .catch((error) => {
    dispatch('FETCH_USER_FAILURE');
    return Promise.reject(error);
  });
};

/**
 * 改变用户信息
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {Object} info             包含用户信息的object
 */
export const changeUser = ({ dispatch }, info) => dispatch('CHANGE_USER', info);

/**
 * 加入收藏
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} topic_id         文章id
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const addCollection = ({ dispatch }, topic_id, accesstoken) => {
  const url = '/topic_collect/collect';
  const params = { accesstoken, topic_id };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return dispatch('ADD_COLLECTION_SUCCESS', topic_id);
      }
      return Promise.reject(new Error('addCollection failure'));
    });
};

/**
 * 取消收藏
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} topic_id         文章id
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const deCollection = ({ dispatch }, topic_id, accesstoken) => {
  const url = '/topic_collect/de_collect';
  const params = { accesstoken, topic_id };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return dispatch('DE_COLLECTION_SUCCESS', topic_id);
      }
      return Promise.reject(new Error('deCollection failure'));
    });
};

/**
 * 获取某一用户收藏的文章
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} loginName        用户名
 * @return {Promise}                  Promise
 */
export const fetchCollection = ({ dispatch }, loginName) => {
  const url = `/topic_collect/${loginName}`;
  return _get({ url })
    .then((json) => {
      if (json.success) {
        return dispatch('FETCH_COLLECTION_SUCCESS', json.data);
      }
      return Promise.reject(new Error('fetchCollection failure'));
    });
};

/**
 * 改变文章收藏状态
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {Boolen} status           是否收藏
 */
export const changeCollectStatus = ({ dispatch }, status) => dispatch('CHANGE_COLLECT_STATUS', status);

/**
 * 获取未读消息数
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const fetchMsgCount = ({ dispatch }, accesstoken) => {
  const url = '/message/count';
  const query = `accesstoken=${accesstoken}`;
  return _get({ url, query })
    .then((json) => {
      if (json.success) {
        return dispatch('FETCH_MSG_COUNT_SUCCESS', json.data);
      }
      return Promise.reject(new Error('fetchMsgCount failure'));
    });
};

/**
 * 获取未读和已读消息
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const fetchMessages = ({ dispatch }, accesstoken) => {
  const url = '/messages';
  const query = `accesstoken=${accesstoken}`;
  return _get({ url, query })
    .then((json) => {
      if (json.success) {
        return dispatch('FETCH_MESSAGES_SUCCESS', json.data);
      }
      return Promise.reject(new Error('fetchMessages failure'));
    })
    .catch((error) => {
      dispatch('FETCH_MESSAGES_FAILURE');
      return Promise.reject(error);
    });
};

/**
 * 标记全部消息为已读
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const markAllMsg = ({ dispatch }, accesstoken) => {
  const url = '/message/mark_all';
  const params = {
    accesstoken,
  };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        dispatch('MARK_ALLMSG_SUCCESS');
        return console.log('mark_all success');
      }
      return Promise.reject(new Error('mark_all failure'));
    });
};

/**
 * 删除token
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 */
export const delToken = ({ dispatch }) => dispatch('DEL_TOKEN');

/**
 * 发布文章
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} title            文章标题
 * @param  {String} content          文章内容
 * @param  {String} tab              文章分类
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const pubTopic = ({ dispatch }, title, content, tab, accesstoken) => {
  const url = '/topics';
  const params = {
    title,
    content,
    tab,
    accesstoken,
  };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        return Promise.resolve(json.topic_id);
      }
      return Promise.reject(new Error('pubTopic failure'));
    })
    .catch((error) => {
      dispatch('PUB_TOPIC_FAILURE');
      return Promise.reject(error);
    });
};

/**
 * 点赞或取消点赞
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {String} reply_id         回复id
 * @param  {String} accesstoken      accesstoken的值
 * @return {Promise}                  Promise
 */
export const star = ({ dispatch }, reply_id, accesstoken) => {
  const url = `/reply/${reply_id}/ups`;
  const params = { accesstoken };
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        console.log('star/unstar success');
        return json.action;
      }
      return Promise.reject(new Error('star failure'));
    });
};

/**
 * 发表评论
 * @param  {Function} options.dispatch    store对象解构出来的函数，无需手动提供
 * @param  {String} options.topic_id    文章id
 * @param  {String} options.content     回复内容
 * @param  {String} options.accesstoken accesstoken的值
 * @param  {String} options.reply_id    回复id
 * @param  {Object} options.replyData   包含回复内容，作者，时间，头像的object
 * @return {Promise}                     Promise
 */
export const reply = ({ dispatch }, { topic_id, content, accesstoken, reply_id, replyData }) => {
  const url = `/topic/${topic_id}/replies`;
  let params;
  if (reply_id) {
    params = { content, accesstoken, reply_id };
  } else {
    params = { content, accesstoken };
  }
  return _post(url, params)
    .then((json) => {
      if (json.success) {
        console.log('reply success');
        /* eslint-disable no-param-reassign */
        replyData.reply_id = json.reply_id;
        return replyData;
      }
      return Promise.reject(new Error('reply failure'));
    })
    .then((r) => dispatch('ADD_REPLIES', r))
    .catch((error) => {
      dispatch('REPLY_FAILURE');
      return Promise.reject(error);
    });
};

/**
 * 改变登入用户的信息
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {Object} user             包含登入用户信息的object
 */
export const changeLoginUser = ({ dispatch }, user) => dispatch('CHANGE_LOGIN_USER', user);

/**
 * 初始化提示
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 */
export const initHint = ({ dispatch }) => dispatch('INIT_HINT');

/**
 * 显示提示
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 */
export const showHint = ({ dispatch }) => dispatch('SHOW_HINT');

/**
 * 自定义提示
 * @param  {Function} options.dispatch store对象解构出来的函数，无需手动提供
 * @param  {Object} info             自定义信息
 */
export const customHint = ({ dispatch }, info) => dispatch('CUSTOM_HINT', info);
