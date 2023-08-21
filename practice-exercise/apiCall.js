export const fetchPostData = async () => {
  try {
    const response = await fetch('./data.json');
    const data = response.json();
    return data;
  } catch (error) {
    console.warn(error.message);
    return [];
  }
};
