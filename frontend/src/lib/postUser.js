export async function postUser(url, data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const res = await response.json();

  if (
    res.response ==
    'SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: users.username'
  ) {
    return 'Username already exists';
  }
  return res;
}
