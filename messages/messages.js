const mainMsg = (conversationId) => {
	return {
		conversationId,
		text : "천하제일 사내대회",
		blocks : [
			{
			  "type": "header",
			  "text": "천하제일 사내대회",
			  "style": "blue"
			},
			{
				type: "image_link",
				url: "https://limitcone.com/images/img_cjsd_banner360p.png"
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
			  "text": "천하제일 사내 랭킹 보기",
			  "style": "default"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_rule_info",
			  "value": "rule",
			  "text": "천하제일 게임 룰 설명",
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
			  "type": "header",
			  "text": "천하제일 사내 가위바위보",
			  "style": "blue"
			},
			{
			  "type": "text",
			  "text": "가위바위보!",
			  "markdown": true
			},
			{
			  "type": "divider"
			},
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
			  "type": "divider"
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

const winMsg = (conversationId, msg, winCnt, drawCnt) => {
	return {
		conversationId,
		text: "당신이 이겼습니다",
		blocks: [
			{
			  "type": "header",
			  "text": "천하제일 가위바위보",
			  "style": "blue"
			},
			{
			  "type": "text",
			  "text": msg,
			  "markdown": true
			},
			{
			  "type": "text",
			  "text": "이긴 횟수 : " + winCnt,
			  "markdown": true
			},
			{
			  "type": "text",
			  "text": "비긴 횟수 : " + drawCnt,
			  "markdown": true
			},
			{
				"type": "text",
				"text": "현재 점수 : " + (parseInt(winCnt) * 2 + parseInt(drawCnt)),
				"markdown": true
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

const loseMsg = (conversationId, msg, winCnt, drawCnt) => {
	return {
		conversationId,
		text: "봇이 이겼습니다",
		blocks: [
			{
			  "type": "header",
			  "text": "천하제일 가위바위보",
			  "style": "blue"
			},
			{
			  "type": "text",
			  "text": msg,
			  "markdown": true
			},
			{
			  "type": "text",
			  "text": "이긴 횟수 : " + winCnt,
			  "markdown": true
			},
			{
			  "type": "text",
			  "text": "비긴 횟수 : " + drawCnt,
			  "markdown": true
			},
			{
				"type": "text",
				"text": "최종 점수 : " + (parseInt(winCnt) * 2 + parseInt(drawCnt)),
				"markdown": true
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "action_type": "submit_action",
			  "action_name": "show_main",
			  "value": "retry",
			  "text": "재도전 - 메인페이지로",
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

module.exports = { mainMsg, rspMsg, winMsg, loseMsg, rankResMsg };