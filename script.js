$(document).ready(function() {
    const memoInput = $("#memo-input");
    const addButton = $("#add-button");
    const memoList = $("#memo-list");
  
    let memos = [];
  
    // 檢查本地存儲中是否有備忘錄資料，如果有則載入
    if (localStorage.getItem("memos")) {
      memos = JSON.parse(localStorage.getItem("memos"));
      memos.forEach(memo => createMemoElement(memo));
    }
  
    function saveMemos() {
      localStorage.setItem("memos", JSON.stringify(memos));
    }
  
    function addMemo() {
      const memoText = memoInput.val().trim();
      if (memoText === "") {
        return;
      }
  
      const memo = {
        id: Date.now(),
        text: memoText,
        time: new Date().toLocaleString()
      };
  
      memos.push(memo);
  
      createMemoElement(memo);
      memoInput.val("");
  
      saveMemos(); // 儲存備忘錄資料到本地存儲
    }
  
    function deleteMemo(id) {
      memos = memos.filter(memo => memo.id !== id);
  
      $(`#memo-item-${id}`).remove();
      saveMemos(); // 儲存備忘錄資料到本地存儲
    }
  
    function createMemoElement(memo) {
      const memoItem = $("<li></li>").addClass("list-group-item memo-item").attr("id", `memo-item-${memo.id}`);
  
      const memoText = $("<span></span>").text(memo.text);
      const memoTime = $("<span></span>").addClass("text-muted ml-2").text(memo.time);
  
      const deleteButton = $("<span></span>").addClass("delete-button").text("刪除").css("color", "red").css("cursor", "pointer");
      deleteButton.click(() => deleteMemo(memo.id));
  
      memoItem.append(memoText);
      memoItem.append(memoTime);
      memoItem.append(deleteButton);
      memoList.append(memoItem);
    }
  
    addButton.click(addMemo);
  });
  