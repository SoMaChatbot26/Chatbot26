const rsp = (val) => {
	const list = ["가위", "바위", "보"];
	const random = Math.floor(Math.random() * 3);
	const human = list[parseInt(val)];
	const bot = list[random];
	
	let winCnt = 0;
	let drawCnt = 0;
	let winner = '';
	if (human === bot) {
		winner = '비김'
		drawCnt += 1;
	} else {
		human === "가위" ? (winner = bot === "바위" ? "봇" : "당신") : "";
		human === "바위" ? (winner = bot === "보" ? "봇" : "당신") : "";
		human === "보" ? (winner = bot === "가위" ? "봇" : "당신") : "";
	}
	
	if (winner === '당신')
		winCnt += 1;
	let msg = `당신 : ${human} vs 봇 : ${bot} \n ${winner === "비김" ? "비겼습니다." : winner + "이 이겼습니다."}`
	
	
	//START 한창완 조건에 따른 결과이미지를 위한 로직입니다.
	let condition = getAlphabetFromKorean(bot) + getAlphabetFromKorean(human);
	//END 한창완 조건에 따른 결과이미지를 위한 로직입니다.
	
	
	return {
		winner: winner,
		msg: msg,
		win_cnt: winCnt,
		draw_cnt: drawCnt,
		point: 2 * winCnt + drawCnt,
		condition}
}

const getAlphabetFromKorean = (condition) => {
	switch (condition) {
		case "가위": return "s";
		case "바위": return "r";
		case "보":
		default:
			return "p";
	}
}

module.exports = { rsp };