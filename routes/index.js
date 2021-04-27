// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

const {getRSPGreetingMessage, getMainGreetingMessage, getRSPMessage} = require('../data/messages')

router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
  );

  // 생성된 채팅방에 메세지 전송 (3)
  const messages = await Promise.all([
    conversations.map((conversation) =>
      // libKakaoWork.sendMessage(getRSPGreetingMessage(conversation.id))
      libKakaoWork.sendMessage(getMainGreetingMessage(conversation.id))
    ),
  ]);

  // 응답값은 자유롭게 작성하셔도 됩니다.
  res.json({
    users,
    conversations,
    messages,
  });
});


router.post('/request', async (req, res, next) => {
  const { message, value } = req.body;

  switch (value) {
    case 'select_task':
      // 작업선택용 모달 전송
      return res.json({
        view: {
		  title: "작업 선택하기",
		  accept: "확인",
		  decline: "취소",
		  value: "select_task_results",
		  blocks: [
			{
			  type: "select",
			  name: "select_task",
			  options: [
				{
				  text: "1회분 자동 급식하기",
				  value: "1"
				},
				{
				  text: "도그TV 틀어주기",
				  value: "2"
				},
				{
				  text: "무인 공놀이 틀기",
				  value: "3"
				}
			  ],
			  required: true,
			  placeholder: "작업을 선택해주세요"
			}
		  ]
		},
      });
      break;
	default:
		break;
  }

  res.json({});
});


router.post('/callback', async (req, res, next) => {
	const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)
	
	switch (value) {
			// case 'select_task_results':
			// var task_result = "";
			// switch (actions.select_task) {
			// 	case "1":
			// 		task_result = "1회분 자동 급식"
			// 		break;
			// 	case "2":
			// 		task_result = "도그TV 틀어주기"
			// 		break;
			// 	case "3":
			// 		task_result = "무인 공놀이"
			// 		break;
			// }			
			
			// await libKakaoWork.sendMessage({
			// 	conversationId: message.conversation_id,
			// 	text: "작업 수행 결과",
			// 	blocks: [
			// 		{
			// 			type: "text",
			// 			text: task_result +" 작업을 완료했습니다",
			// 			markdown: true,
			// 		},
			// 	],
			// });
			// break;
			
		case 'game_rsp':
			await libKakaoWork.sendMessage(getRSPGreetingMessage(message.conversation_id));
			break;
			
    	default:
			break;
  	}

  	res.json({ result: true });
});



module.exports = router;