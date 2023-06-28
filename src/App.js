import { useGobalContext } from "./context";
import Form from "./components/Form";
import Modal from "./components/Modal";
import Loading from "./components/Loading";

function App() {
  const { waiting, loading, index, questions, nextQuestion, checkAnswer } =
    useGobalContext();

  if (waiting) {
    return <Form />;
  }

  if (loading) {
    return <Loading />;
  }

  const { incorrect_answer, correct_answer, question } = questions[index];
  const answers = [...incorrect_answer];

  if (incorrect_answer.length > 1) {
    let num = Math.floor(Math.random() * 4);
    if (num == 3) {
      answers.push(correct_answer);
    } else {
      answers.push(answers[num]);
      answers[num] = correct_answer;
    }
  } else {
    let num = Math.floor(Math.random() * 2);
    answers.push(answers[num]);
    answers[num] = correct_answer;
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Modal />
      <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px]">
        <p className="text-right pb-2 text-green-600">
          Number: <span>{index + 1 / question.length}</span>
        </p>
        <div className="mt-3">
          <p
            className="text-center font-medium text-2xl lg:text-3xl leading-loose"
            dangerouslySetInnerHTML={{ __html: question }}
          />
          <div className="grid grid-col-1 my-5 space-y-2 place-content-center">
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => checkAnswer(answer === correct_answer)}
                  key={index}
                  className="bg-blue-500 w-4/5 rounded-lg mx-auto text-white p-2 hover:bg-blue-400"
                  dangerouslySetInnerHTML={{
                    __html: answer,
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={nextQuestion}
            className="py-2 px-7 text-medium flex rounded-lg text-white bg-yellow-600 hover:bg-green-700"
          >
            Next Question
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
