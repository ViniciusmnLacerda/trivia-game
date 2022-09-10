const fetchTrivia = async (numberOfQuestions, category, difficulty, type) => {
  const token = localStorage.getItem('token');
  const fullEndPoint = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
  const noType = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&token=${token}`;
  const noTypeNoDifficulty = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&token=${token}`;
  const noTypeNoDifficultyNocategory = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
  const request = await fetch(endpoint);
  const data = await request.json();
  return data.results;
};

export default fetchTrivia;
