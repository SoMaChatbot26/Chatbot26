

const getRSPGreetingMessage = (conversationId) => {
	return {
		conversationId,
        text: '가위바위보 대회 개최',
        blocks: [
			// {
			//   	type: "image_link",
			//   	url: "https://limitcone.com/images/img_cjsd_banner360p.png"
			// },
			{
				type: "text",
				text: "한창완님이 대회를 열었습니다. 개발팀에서 가위바위보 최고를 가려보세요.",
				markdown: true
			},
			{
				type: "description",
				term: "참여기한",
				content: {
					type: "text",
					text: "21년 4월 24일 11시 6분까지",
					markdown: false
				},
				accent: true
			},
			{
				type: "button",
				text: "대회 참여하기",
				value: 'select_task',
				style: "default",
				action_type: "call_modal"
			},
		],
	};
}

const getMainGreetingMessage = (conversationId) => {
	return {
		conversationId,
        text: '천하제일사내대회 시작하기',
        blocks: [
			{
				type: "image_link",
				url: "https://limitcone.com/images/img_cjsd_banner360p.png"
			},
			{
				type: "button",
				action_type: "submit_action",
				action_name: "game_rsp",
				value: "game_rsp",
				text: "천하제일 가위바위보 대회",
				style: "default"
			},
			{
				type: "button",
				action_type: "submit_action",
				value: "game_lotto",
				text: "천하제일 로또 대회",
				style: "default"
			},
			{
				type: "divider"
			},
			{
				type: "button",
				action_type: "submit_action",
				value: "ranking",
				text: "랭킹 확인",
				style: "default"
			},
			{
				type: "button",
				action_type: "call_modal",
				value: "rule",
				text: "룰 확인",
				style: "default"
			},
		],
	};
}

const getRSPMessage = (conversationId) => {
	return {
		conversationId,
        text: '가위 바위 보!',
        blocks: [
			{
				type: "button",
				action_type: "submit_action",
				value: "game_rsp_scissors",
				text: "가위 ✌",
				style: "default"
			},
			{
				type: "button",
				action_type: "submit_action",
				value: "game_rsp_rock",
				text: "바위 ✊",
				style: "default"
			},
			{
				type: "button",
				action_type: "submit_action",
				value: "game_rsp_paper",
				text: "보 🖐",
				style: "default"
			},
			{
				type: "button",
				action_type: "submit_action",
				value: "game_rsp_cancel",
				text: "포기하기 👻",
				style: "danger"
			},
		],
	};
}

module.exports = {getRSPGreetingMessage, getMainGreetingMessage, getRSPMessage};