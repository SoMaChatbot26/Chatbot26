const Config = require('config');

const axios = require('axios');
const kakaoInstance = axios.create({
  baseURL: 'https://api.kakaowork.com',
  headers: {
    Authorization: `Bearer ${Config.keys.kakaoWork.bot}`,
  },
});

exports.getUserList = async () => {
  const res = await kakaoInstance.get('/v1/users.list');
  return res.data.users;
};

exports.openConversations = async ({ userId }) => {
  const data = {
    user_id: userId,
  };
  const res = await kakaoInstance.post('/v1/conversations.open', data);
  return res.data.conversation;
};

exports.sendMessage = async ({ conversationId, text, blocks }) => {
  const data = {
    conversation_id: conversationId,
    text,
    ...blocks && { blocks },
  };
  const res = await kakaoInstance.post('/v1/messages.send', data);
  return res.data.message;
};
	
exports.getUserByEmail = async ({ email }) => {
	const data = {
		params: {
			email: email,
		}
	};
	const res = await kakaoInstance.get('/v1/users.find_by_email', data);
	return res.data.user;
};
	
exports.getUserInfo = async ({ user_id }) => {
	const res = await kakaoInstance.get('/v1/users.info?user_id='+user_id);
	return res.data.user;
};

// 전체 유저 목록 검색
exports.getAllUserList = async () => {
	let res = await kakaoInstance.get('/v1/users.list?limit=100');
	let { users, cursor } = res.data;
	while (cursor) {
		res = await kakaoInstance.get('/v1/users.list?cursor='+cursor);
		users.push(...res.data.users);
		cursor = res.data.cursor;
	}
	return users;
};