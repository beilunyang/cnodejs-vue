import 'whatwg-fetch';

export const fetchTopicLists = ({ dispatch }, topicTab) => {
  fetch(`https://cnodejs.org/api/v1/topics?tab=${topicTab}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((json) => dispatch('GET_TOPIC_LISTS_SUCCESS', json.data, topicTab))
    .catch(() => dispatch('GET_TOPIC_LISTS_FAILURE', topicTab));
};

export const fetchTopic = ({ dispatch }, id) => {
  fetch(`https://cnodejs.org/api/v1/topic/${id}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((json) => dispatch('GET_TOPIC_SUCCESS', json.data))
    .catch(() => dispatch('GET_TOPIC_FAILURE'));
};
