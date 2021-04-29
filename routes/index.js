// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

const { mainMsg, rspMsg, winMsg, drawMsg, loseMsg, rankResMsg, ruleMsg } = require('../messages/messages');
const { rankResModal, lottoModal } = require('../modals/modals');
const lottoController = require('../controller/lottoController');

const { rsp } = require('../games/rsp-game');
const rank = require('../rank-server');

let db = {};

// 워크스페이스의 모든 유저에게 초기 메세지 전송
router.post('/chatbot', async (req, res, next) => {
	const users = await libKakaoWork.getAllUserList();
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

// 워크스페이스의 모든 유저 목록 검색 (테스팅용)
router.get('/allUsers', async (req, res, next) => {
	const users = await libKakaoWork.getAllUserList();
	// console.log("users.length: " + users.length); // 190
	res.json(users);
});

// 지정 이메일로 초기 메세지 보내기 (테스팅용)
router.get('/teamOnly', async (req, res, next) => {
	let emails = [];
	
	//알림!
	//https://swm-chatbot-maoezt-okflk2.run.goorm.io?to=<여기에 이메일 목록을 ,로 구분해서 쓰면 여러명에게 전송 가능합니다>
	if (req.query.to) {
		emails = req.query.to.split(",");
	} else {
		
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
	const { message, value} = req.body;
	const resAll = rank.showRank(rank.getAllRank());
	
	switch (value) {
		case 'rank_detail':
			return res.json(rankResModal(resAll));
			break;
		// 메인 페이지에서 천하제일 로또 추첨 버튼 누르면 -> 모달 발생
		case 'lotto':
			return res.json(lottoModal);
			break;
		default:
			break;
	}
	res.json({"success":true});
});

// /callback : message 응답하기
router.post('/callback', async (req, res, next) => {
	const { message, actions, action_name, action_time, value, react_user_id} = req.body;

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
			// 유저 가위바위보 결과 저장
			if (!db.hasOwnProperty(react_user_id)) {
				db[react_user_id] = {
					cur_win: win_cnt,
					cur_draw: draw_cnt
				}
			} else {
				db[react_user_id].cur_win += win_cnt;
				db[react_user_id].cur_draw += draw_cnt;
			}
			const {cur_win, cur_draw} = db[react_user_id];
			if (winner === '당신') {
				await libKakaoWork.sendMessage(winMsg(message.conversation_id, msg, JSON.stringify(cur_win), JSON.stringify(cur_draw), condition));
			} else if (winner === '비김') {
				await libKakaoWork.sendMessage(drawMsg(message.conversation_id, msg, JSON.stringify(cur_win), JSON.stringify(cur_draw), condition));
			} else {
				rank.saveInfo(react_user_id, user.name, cur_win * 2 + cur_draw);
				await libKakaoWork.sendMessage(loseMsg(message.conversation_id, msg, JSON.stringify(cur_win), JSON.stringify(cur_draw), condition));
				// 유저 가위바위보 결과 초기화
				db[react_user_id].cur_win = 0;
				db[react_user_id].cur_draw = 0;
			}
			break;
		// [포기하기] [메인 페이지로]
		case 'show_main':
			// 유저 가위바위보 결과 초기화
			if (db.hasOwnProperty(react_user_id)) {
				db[react_user_id].cur_win = 0;
				db[react_user_id].cur_draw = 0;
			}
			await libKakaoWork.sendMessage(mainMsg(message.conversation_id));
			break;
		// [천하제일 사내 랭킹 보기]
		case 'show_rank_info':
			const topTenRank = rank.getTopTenRank(rank.getAllRank());
			const resTopTen = rank.showRank(topTenRank);
			await libKakaoWork.sendMessage(rankResMsg(message.conversation_id, resTopTen));
			break;
		// [천하제일 게임 룰 설명]
		case 'show_rule_info':
			await libKakaoWork.sendMessage(ruleMsg(message.conversation_id));
			break;	
		default:
			break;
	}

	switch (value) {
		// 천하제일 로또 추첨 결과 발표	
		case 'lotto':
			await libKakaoWork.sendMessage(lottoController.lotto_game(message.conversation_id, actions.lotto_choice1, actions.lotto_choice2, actions.lotto_choice3)); 	
			break;
		default:
			break;
	}
	
	res.json({ success: true });
});


module.exports = router;