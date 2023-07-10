$(document).ready(function () {
    const memoInput = $("#memo-input");
    const addButton = $("#add-button");
    const memoList = $("#memo-list");

    let memos = [];

    function addMemo() {
        const memoText = memoInput.val().trim();
        if (memoText === "") {
            return;
        }

        const memo = {
            id: Date.now(),
            text: memoText,
            time: new Date().toLocaleString() // 新增備忘錄時間
        };

        memos.push(memo);

        createMemoElement(memo);
        memoInput.val("");
    }

    function deleteMemo(id) {
        memos = memos.filter(memo => memo.id !== id);

        $(`#memo-item-${id}`).remove();
    }

    function createMemoElement(memo) {
        const memoItem = $("<li></li>").addClass("list-group-item memo-item").attr("id", `memo-item-${memo.id}`);

        const memoText = $("<span></span>").text(memo.text);
        const memoTime = $("<span></span>").addClass("text-muted ml-2").text(memo.time); // 顯示備忘錄時間

        const deleteButton = $("<span></span>").addClass("delete-button").text("刪除").css("color", "red").css("cursor", "pointer");
        deleteButton.click(() => deleteMemo(memo.id));

        memoItem.append(memoText);
        memoItem.append(memoTime);
        memoItem.append(deleteButton);
        memoList.append(memoItem);
    }

    addButton.click(addMemo);
});
