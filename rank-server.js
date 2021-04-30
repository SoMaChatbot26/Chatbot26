// let usersInfo = [];

let usersInfo = [];


exports.showRank = (rankInfo) => {
	console.log(usersInfo);
	if(!rankInfo.length)
		return '랭킹이 아직 없습니다';
	
	let ret = ``;
	for (let info of rankInfo) {
		ret += `${info.rank}등` + '  ' + `${info.name}`+ ' : ' +`${info.point}점\n`;
	}
	
	return ret
}

exports.getTopTenRank = (allRankInfo) => {
	let cut = Math.min(10, allRankInfo.length);
	return allRankInfo.slice(0, cut);
};

exports.getAllRank = () => {
	if (!usersInfo.length)
		return [];
	
	let allRankInfo = [];
	allRankInfo.push({"rank": 1, "name": usersInfo[0].name, "point": usersInfo[0].point});
	
	for (let i = 1; i < Object.keys(usersInfo).length; i++) {
		if (usersInfo[i].point === usersInfo[i-1].point) {// 같은 점수일 경우 같은 등수로 처리
			allRankInfo.push({"rank": allRankInfo[i-1].rank, "name": usersInfo[i].name, "point": usersInfo[i].point});
			continue;
		};
		allRankInfo.push({"rank": i+1, "name": usersInfo[i].name, "point": usersInfo[i].point});
	};

	return allRankInfo;
};

exports.saveInfo = (reactUserId, reactUserName, point) => { // user 객체, 응답 사용자 id, 최종점수
	const userInfo = usersInfo.find((obj) => obj.id === reactUserId);
	const hasRank = userInfo ? true : false;
	
	if (hasRank) {
		userInfo.point = Math.max(userInfo.point, point);
	} else {
		usersInfo.push({id: reactUserId, name: reactUserName, point: point});
	}
	
	// 점수 기준 내림차순으로 정렬
	usersInfo.sort((rank1, rank2) => {
		return rank2.point - rank1.point;
	});
};