/* eslint-disable consistent-return */
const returnSwitchParam = (numberOfQuestions, category, difficulty, type) => {
  if (category !== 'any' && difficulty !== 'any' && type !== 'any') {
    return 'FULL_ENDPOINT';
  }
  if (category !== 'any' && difficulty === 'any' && type === 'any') {
    return 'ONLY_CATEGORY';
  }
  if (category !== 'any' && difficulty !== 'any' && type === 'any') {
    return 'CATEGORY_AND_DIFFICULT';
  }
  if (category !== 'any' && difficulty === 'any' && type !== 'any') {
    return 'CATEGORY_AND_TYPE';
  }
  if (category === 'any' && difficulty !== 'any' && type === 'any') {
    return 'ONLY_DIFFICULTY';
  }
  if (category === 'any' && difficulty !== 'any' && type !== 'any') {
    return 'DIFFICULTY_AND_TYPE';
  }
  if (category === 'any' && difficulty === 'any' && type !== 'any') {
    return 'ONLY_TYPE';
  }
  if (category === 'any' && difficulty === 'any' && type === 'any') {
    return 'ONLY_NUMBER_OF_QUESTIONS';
  }
};

const returnEndPoint = (numberOfQuestions, category, difficulty, type) => {
  const token = localStorage.getItem('token');
  const fullEndPoint = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
  const onlyCategory = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&token=${token}`;
  const categoryAndDifficulty = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&token=${token}`;
  const categoryAndType = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&type=${type}&token=${token}`;
  const onlyDifficulty = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}&token=${token}`;
  const difficultyAndType = `https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}&type=${type}&token=${token}`;
  const onlyType = `https://opentdb.com/api.php?amount=${numberOfQuestions}&type=${type}&token=${token}`;
  const onlyNumberOfQuestions = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;

  const param = returnSwitchParam(numberOfQuestions, category, difficulty, type);

  switch (param) {
    case 'ONLY_NUMBER_OF_QUESTIONS':
      return onlyNumberOfQuestions;
    case 'ONLY_TYPE':
      return onlyType;
    case 'DIFFCULTY_AND_TYPE':
      return difficultyAndType;
    case 'ONLY_DIFFICULTY':
      return onlyDifficulty;
    case 'CATEGORY_AND_TYPE':
      return categoryAndType;
    case 'CATEGORY_AND_DIFFICULTY':
      return categoryAndDifficulty;
    case 'ONLY_CATEGORY':
      return onlyCategory;
    case 'FULL_ENDPOINT':
      return fullEndPoint;
    default:
      return onlyNumberOfQuestions;
  }
};

const fetchTrivia = async (numberOfQuestions, category, difficulty, type) => {
  const endpoint = returnEndPoint(numberOfQuestions, category, difficulty, type);
  const request = await fetch(endpoint);
  const data = await request.json();
  return data.results;
};

export default fetchTrivia;
