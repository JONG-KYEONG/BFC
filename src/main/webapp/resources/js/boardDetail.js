const callConfirm = (type) => {
	if(confirm(`${type}하시겠습니까?`)){
		window.location.href = "boardEditDeleteRedirect.jsp?type=" + encodeURIComponent(type);
	} else {
		alert(`${type}하기가 취소되었습니다`);
	}
};



// confirm reply submission
const confirmSubmission = () => {
    const confirmed = confirm("댓글을 추가하시겠습니까?");
    if (!confirmed) {
        alert("댓글 추가가 취소되었습니다");
    }
    return confirmed;
}



// reply more button 클릭 시 수정, 삭제 toggle
document.addEventListener("DOMContentLoaded", () => {
    const moreButtons = document.querySelectorAll(".reply-more-button");
    const moreButtonLists = document.querySelectorAll(".reply-view-more-button-lists");
	const editButtons = document.querySelectorAll(".edit-reply");
    const cancelButtons = document.querySelectorAll(".cancel-edit");
    const textareas = document.querySelectorAll(".edit-reply-form > textarea");

    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto'; // 먼저 높이를 자동으로 설정하여 스크롤을 없앱니다.
        textarea.style.height = (textarea.scrollHeight || 57) + 'px'; // 내용의 높이에 맞게 조절합니다.
    }
    
    moreButtons.forEach((moreButton, index) => {
        const moreButtonList = document.getElementById(`reply-view-more-button-lists-${index}`);

        moreButton.onclick = (event) => {
            event.stopPropagation(); // 이벤트 전파를 막음
            if (moreButtonList.classList.contains("show")) {
                moreButtonList.classList.remove("show");
                setTimeout(() => {
                    moreButtonList.style.display = "none";
                }, 300); // transition 시간과 동일
            } else {
                moreButtonList.style.display = "block";
                setTimeout(() => {
                    moreButtonList.classList.add("show");
                }, 10); // 약간의 지연을 주어 display 변경 후 transition이 적용되도록 함
            }
        };
    });

    document.addEventListener("click", (event) => {
        moreButtonLists.forEach((moreButtonList, index) => {
            const moreButton = document.getElementById(`reply-more-button-${index}`);
            if (event.target !== moreButton && !moreButtonList.contains(event.target)) {
                if (moreButtonList.classList.contains("show")) {
                    moreButtonList.classList.remove("show");
                    setTimeout(() => {
                        moreButtonList.style.display = "none";
                    }, 300); // transition 시간과 동일
                }
            }
        });
    });
    
    editButtons.forEach((editButton, index) => {
        editButton.onclick = (event) => {
            event.preventDefault();
            const content = editButton.getAttribute("data-content");
            const editForm = document.getElementById(`edit-reply-form-${index}`);
            const textarea = editForm.querySelector('textarea');
            textarea.value = content;
            autoResizeTextarea(textarea); // 수정할 때 초기 높이를 조정
            document.getElementById(`reply-content-${index}`).style.display = 'none';
            editForm.style.display = 'flex';
        };
    });

    cancelButtons.forEach((cancelButton, index) => {
        cancelButton.onclick = (event) => {
            const editForm = document.getElementById(`edit-reply-form-${index}`);
            const originalContent = document.querySelector(`.edit-reply[data-index="${index}"]`).getAttribute("data-content");
            const textarea = editForm.querySelector('textarea');
            textarea.value = originalContent;
            autoResizeTextarea(textarea); // 취소할 때 높이를 조정
            editForm.style.display = 'none';
            document.getElementById(`reply-content-${index}`).style.display = 'block';
        };
    });
    
    // textarea의 내용이 변경될 때마다 높이를 자동으로 조절
    textareas.forEach(textarea => {
        textarea.addEventListener('input', () => autoResizeTextarea(textarea));
        autoResizeTextarea(textarea); // 초기 로드 시 높이를 조정
    });
});


// Auto-resize textarea
const textarea = document.getElementById("reply-write-area");
textarea.addEventListener("input", () => {
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = (textarea.scrollHeight) + "px"; // Set height to scrollHeight
});