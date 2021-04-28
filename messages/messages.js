const mainMsg = (conversationId) => {
	return {
		conversationId,
		text : "천하제일 사내대회",
		blocks : [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/banner_main.png"
			},
			{
			  "type": "text",
			  "text": "*어떤 게임을 고르시겠습니까?*",
			  "markdown": true
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "participate_rsp",
			  "value": "rsp",
			  "text": "천하제일 사내 가위바위보",
			  "style": "default"
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_rank_info",
			  "value": "rank",
			  "text": "랭킹 확인",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_rule_info",
			  "value": "rule",
			  "text": "게임 설명",
			  "style": "default"
			}
		]
	};
}

const rspMsg = (conversationId) => {
	return {
		conversationId,
		text: "천하제일 사내 가위바위보",
		blocks: [
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "0",
			  "text": "가위 ✌",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "1",
			  "text": "바위 ✊",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "rsp_done",
			  "value": "2",
			  "text": "보 🖐",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "cancel",
			  "text": "포기하기",
			  "style": "danger"
			}
		]
	};
}

const winMsg = (conversationId, msg, winCnt, drawCnt, condition) => {
	return {
		conversationId,
		text: "승리",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/result_win_" + condition + ".png"
			},
			{
				"type": "description",
				"term": "승리",
				"content": {
					"type": "text",
					"text": winCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "비김",
				"content": {
					"type": "text",
					"text": drawCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "점수",
				"content": {
					"type": "text",
					"text": (parseInt(winCnt) * 2 + parseInt(drawCnt)) + "점",
					"markdown": false
				},
				"accent": true
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "go_next_round",
			  "value": "next_round",
			  "text": "다음 라운드로",
			  "style": "default"
			}
		]
	};
}

const drawMsg = (conversationId, msg, winCnt, drawCnt, condition) => {
	return {
		conversationId,
		text: "무승부",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/result_draw_" + condition + ".png"
			},
			{
				"type": "description",
				"term": "승리",
				"content": {
					"type": "text",
					"text": winCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "비김",
				"content": {
					"type": "text",
					"text": drawCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "점수",
				"content": {
					"type": "text",
					"text": (parseInt(winCnt) * 2 + parseInt(drawCnt)) + "점",
					"markdown": false
				},
				"accent": true
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "go_next_round",
			  "value": "next_round",
			  "text": "다음 라운드로",
			  "style": "default"
			}
		]
	};
}

const loseMsg = (conversationId, msg, winCnt, drawCnt, condition) => {
	return {
		conversationId,
		text: "패배",
		blocks: [
			{
				type: "image_link",
				url: "https://swm-chatbot-maoezt-okflk2.run.goorm.io/result_lose_" + condition + ".png"
			},
			{
				"type": "description",
				"term": "승리",
				"content": {
					"type": "text",
					"text": winCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "비김",
				"content": {
					"type": "text",
					"text": drawCnt + "회",
					"markdown": false
				},
				"accent": true
			},
			{
				"type": "description",
				"term": "최종점수",
				"content": {
					"type": "text",
					"text": (parseInt(winCnt) * 2 + parseInt(drawCnt)) + "점",
					"markdown": false
				},
				"accent": true
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "retry",
			  "text": "메인으로",
			  "style": "default"
			}
		]
	};
}

const rankResMsg = (conversationId , res) => {
	return {
		conversationId,
		text: "랭킹 보기",
		blocks: [
			{
			  "type": "text",
			  "text": "*천하제일 사내대회 가위바위보 랭킹*",
			  "markdown": true
			},
			{
			  "type": "divider"
			},
			{
			  "type": "text",
			  "text": res,
			  "markdown": true
			},
			{
			  "type": "button",
			  "text": "랭킹 더보기",
			  "action_type": "call_modal",
			  "value": "show_rank_detail",
			  "style": "default"
			},
			{
			  "type": "action",
			  "elements": [
				{
				  "type": "button",
				  "text": "메인 페이지로",
				  "action_type": "submit_action",
				  "action_name": "show_main",
				  "value": "main",
				  "style": "primary"
				},
				{
				  "type": "button",
				  "text": "게임 끝내기",
				  "action_type": "submit_action",
				  "action_name": "show_main",
				  "value": "finish",
				  "style": "danger"
				}
			  ]
			},
		]
	};
}

module.exports = { mainMsg, rspMsg, winMsg, drawMsg, loseMsg, rankResMsg };