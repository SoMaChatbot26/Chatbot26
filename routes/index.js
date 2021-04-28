// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

const {getRSPGreetingMessage, getMainGreetingMessage, getRSPMessage} = require('../data/messages')
const { mainMsg, rspMsg, winMsg, drawMsg, loseMsg, rankResMsg } = require('../messages/messages');
const {rankResModal} = require('../modals/modals');

const { rsp } = require('../games/rsp-game');
const rank = require('../rank-server');

let db = {
	"asdf": {
		score: 10,
		timestamp: 1619497965,
	},
	"zxcv": {
		score: 4,
		timestamp: 1619497965,
	},
};
// console.log(db);

// 임시
let tmp = {};

// 전체 초기 메세지 전송
// TODO: /chatbot 구현하기
// router.get('/', async (req, res, next) => {
//   // 유저 목록 검색 (1)
//   const users = await libKakaoWork.getUserList();

//   // 검색된 모든 유저에게 각각 채팅방 생성 (2)
//   const conversations = await Promise.all(
//     users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
//   );

//   // 생성된 채팅방에 메세지 전송 (3)
//   const messages = await Promise.all([
//     conversations.map((conversation) =>
// 	  libKakaoWork.sendMessage(mainMsg(conversation.id)),
//       // libKakaoWork.sendMessage(getRSPGreetingMessage(conversation.id))
//       // libKakaoWork.sendMessage(getMainGreetingMessage(conversation.id))
//     ),
//   ]);

//   // 응답값은 자유롭게 작성하셔도 됩니다.
//   res.json({
//     users,
//     conversations,
//     messages,
//   });
// });

// 지정 이메일로 초기 메세지 보내기 (테스팅용)
router.get('/teamOnly', async (req, res, next) => {
	let emails = [];
	
	//알림!
	//https://swm-chatbot-maoezt-okflk2.run.goorm.io?to=<여기에 이메일 목록을 ,로 구분해서 쓰면 여러명에게 전송 가능합니다>
	if (req.query.to) {
		emails = req.query.to.split(",");
	} else {
		// emails.push("kwpark96@naver.com");
		// emails.push("kians2@naver.com");
	}
	
	const users = await Promise.all(
		emails.map((email) => libKakaoWork.getUserByEmail({ email: email }))
	);
	const conversations = await Promise.all(
		users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
	);
	const messages = await Promise.all([
		conversations.map((conversation) =>
						  libKakaoWork.sendMessage(mainMsg(conversation.id))
						 ),
	]);
	res.json({users});
});

// /request : modal 띄우기
router.post('/request', async (req, res, next) => {
	console.log(req.body);
	const { message, value} = req.body;
	const resAll = rank.showRank(rank.getAllRank());
	
	switch (value) {
		case 'show_rank_detail':
			return res.json(rankResModal(resAll));
			break;
		
		default:
			break;
	}
	res.json({"success":true});
});

// /callback : message 응답하기
router.post('/callback', async (req, res, next) => {
	const { message, action_name, action_time, value, react_user_id} = req.body;
	// const topTenRank = rank.getTopTenRank(rank.getAllRank());
	// const resTopTen = rank.showRank(topTenRank);

	switch (action_name) {
		// [천하제일 사내 가위바위보] [다음 라운드로]
		case 'participate_rsp':
		case 'go_next_round':
			await libKakaoWork.sendMessage(rspMsg(message.conversation_id));
			break;	
		// [가위] [바위] [보]
		case 'rsp_done':
			const {winner, msg, win_cnt, draw_cnt, condition} = rsp(value);
			const user = await libKakaoWork.getUserInfo({user_id: react_user_id});
			// TODO: 유저 가위바위보 결과 저장
			if (!tmp.hasOwnProperty(react_user_id)) {
				tmp[react_user_id] = {
					cur_win: win_cnt,
					cur_draw: draw_cnt
				}
			} else {
				tmp[react_user_id].cur_win += win_cnt;
				tmp[react_user_id].cur_draw += draw_cnt;
			}
			const {cur_win, cur_draw} = tmp[react_user_id];
			if (winner === '당신') {
				await libKakaoWork.sendMessage(winMsg(message.conversation_id, msg, JSON.stringify(cur_win), JSON.stringify(cur_draw), condition));
			} else if (winner === '비김') {
				await libKakaoWork.sendMessage(drawMsg(message.conversation_id, msg, JSON.stringify(cur_win), JSON.stringify(cur_draw), condition));
			} else {
				rank.saveInfo(react_user_id, user.name, cur_win * 2 + cur_draw);
				await libKakaoWork.sendMessage(loseMsg(message.conversation_id, msg, JSON.stringify(cur_win), JSON.stringify(cur_draw), condition));
				// TODO: 유저 가위바위보 결과 초기화
				tmp[react_user_id].cur_win = 0;
				tmp[react_user_id].cur_draw = 0;
			}
			break;
		// [포기하기] [메인 페이지로]
		case 'show_main':
			// TODO: 유저 가위바위보 결과 초기화 0000
			
			await libKakaoWork.sendMessage(mainMsg(message.conversation_id));
			break;
		// [천하제일 사내 랭킹 보기]
		case 'show_rank_info':
			const topTenRank = rank.getTopTenRank(rank.getAllRank());
			const resTopTen = rank.showRank(topTenRank);
			await libKakaoWork.sendMessage(rankResMsg(message.conversation_id, resTopTen));
			break;
		// [천하제일 게임 룰 설명]
		case 'rule':
			// TODO: 룰 설명하는 메세지 보내기
			// await libKakaoWork.sendMessage(ruleMsg(message.conversation_id));
			break;
		default:
			break;
	}
	res.json({ success: true });
});


module.exports = router;