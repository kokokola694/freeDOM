const DOMNodeCollection = require('./dom_node_collection');
let docLoaded = false;
const functionQueue = [];

window.$l = (input) => {
  if (typeof input === "function") {
    if (!docLoaded) {
      functionQueue.push(input);
    } else {
      input();
    }
  } else if (input instanceof HTMLElement) {
    return new DOMNodeCollection([input]);
  } else if (typeof input === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(input)));
  }
};

window.$l.extend = (...args) => {
  let merged = args[0];
  args.slice(1).forEach(arg => Object.assign(merged, arg));
  return merged;
}

window.$l.ajax = (options) => {
  const defaultRequest = {
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json'
  };

  const request = window.$l.extend(defaultRequest, options);

  return new Promise (
    function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(request.method, request.url);
      xhr.onload = () => {
          resolve(JSON.parse(xhr.response));
      };
      xhr.onerror = () => {
          reject(JSON.parse(xhr.statusText));
      };
      xhr.send(JSON.stringify(request.data));
    }
  )
}

document.addEventListener("DOMContentLoaded", function(){
  docLoaded = true;
  functionQueue.forEach(func => func());
  $l('.start-btn').on('click', (e) => {
    e.preventDefault();
    $l('.start-btn').html("RESTART");
    retrieveQuestions(3);
  });
});

const retrieveQuestions = (n) => {
  $l.ajax({
    method: "GET",
    url: `https://opentdb.com/api.php?amount=${n}`
  }).then(response => displayQuestions(response.results));
}

const displayQuestions = (results) => {
  const list = $l('.question-list');
  list.empty();
  results.forEach( (result, i) => {
    list.append(`
      <li id="q-${i}" class="question">
        <h3>${result.question}</h3>
        <ul class="ans-list ans-${i}">
        </ul>
      </li>`
    );
  });
  results.forEach((result, i) => {
    setupAnswers(result, i);
  })
  $l('.question-list').removeClass('hidden');

}

const setupAnswers = (result, i) => {
  const answers = $l(`.ans-${i}`);
  const result_ans = result.incorrect_answers.concat([result.correct_answer]);
  result_ans.forEach((ans, j) => {
    answers.append(`<li id='q-${i}-c-${j}' class='ans-choice'>${ans}</li>`);
  })

  result_ans.forEach((ans, j) => {
    $l(`#q-${i}-c-${j}`).on('click', () => {
      if (result.correct_answer === answers.children().nodes[j].innerHTML) {
        $l(`#q-${i}`).removeClass('red');
        $l(`#q-${i}`).addClass('green');
        $l(`#q-${i}-c-${j}`).addClass('bold');
        $l(`.ans-${i}`).children().off('click');
      } else {
        $l(`#q-${i}`).removeClass('green');
        $l(`#q-${i}`).addClass('red');
        $l(`#q-${i}-c-${j}`).addClass('bold');
        $l(`.ans-${i}`).children().off('click');
      }
    })
  })

}
