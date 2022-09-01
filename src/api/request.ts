export const request = async (url: string) => {
  try {
    const res = await fetch(`${url}`);

    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 호출 오류');
  } catch (e) {
    if (e instanceof Error) {
      alert(e.message);
    }
  }
};
