const $delBtn = document.querySelector("#delBtn");

$delBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const $showDel = document.getElementById("deleteBox");
  $showDel.classList.replace('hidden', 'show');
})

const $deleteBtn = document.getElementById("deleteBtn");
$deleteBtn.addEventListener("click", async () => {
  const $delUserIdInput = document.getElementById("delUserIdInput");
  const $userId = $delUserIdInput.value;

  if ($userId === "") {
    alert("삭제할 아이디를 입력 해주세요");
    return;
  }
  //삭제 함수 호출
  await deleteUser($userId);
});

async function deleteUser(userId) {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();

  const user = data.find((user) => user.userId === userId);
  if (!user) {
    alert("해당 아이디를 가진 유저가 없습니다");
    return;
  }

  await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "DELETE",
  });
  alert("사용자 정보가 삭제되었습니다.");
}

