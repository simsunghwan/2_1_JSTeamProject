export async function getBoard() {
  const res = await fetch('http://localhost:3000/posts');
  const data = await res.json();
  return data;
}

export async function getBoardContent(id) {
  const res = await fetch(`http://localhost:3000/posts/${id}`);
  const data = await res.json();
  return data;
}

