const fetchTrivia = async (numberOfQuestions, category, difficulty, type) => {
  const token = localStorage.getItem('token');
  const endpoint = `https://opentdb.com/api.php?amount=${numberOfQuestions}${category !== 'any' ? `&category=${category}` : ''}${difficulty !== 'any' ? `&difficulty=${difficulty}` : ''}${type !== 'any' ? `&type=${type}` : ''}&token=${token}`;
  const request = await fetch(endpoint);
  const data = await request.json();
  return data.results;
};

export default fetchTrivia;
