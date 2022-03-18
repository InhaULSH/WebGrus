import React, { useRef } from 'react';

const EditWrite = ({ write, editWriting }) => {
	const textRef = useRef();
	const titleRef = useRef();

	// 글 추가
	const editing = () => {
		const editWrite = {
			_id: write._id,
			id: write.id,
			title: titleRef.current.value,
			description: textRef.current.value,
			author: write.author,
			date: write.date,
		};
		editWriting(editWrite); // 새로 쓴 글 상위 컴포넌트로 전달
	};

	return (
		<form>
			제목 : <input ref={titleRef} type="text"></input>
			내용 : <textarea ref={textRef}></textarea>
			<input type="button" value="글 수정" onClick={editing}></input>
		</form>
	);
};

export default EditWrite;
