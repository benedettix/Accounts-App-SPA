let btn = document.querySelector("#add-btn");
let input = document.querySelector("input");

btn.addEventListener("click", function () {
  let inputVal = input.value;

  fetch("/save", {
    method: "POST", // or 'PUT'
    body: JSON.stringify({ msg: inputVal }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then((json) => displayTodos());
});

async function displayTodos() {
  let response = await fetch("/get_data");
  let data = await response.json();
  let text = "";
  data.forEach((dat, index) => {
    text += `
    <div class="card">
    <div class="card-header">
        <button class="btn btn-sm btn-secondary float-left">Todo ${
          index + 1
        }</button>
        <button class="btn btn-sm btn-success float-right">${dat.date}</button>
    </div>
    <div class="card-body">
        <h3 class="text-center">${dat.msg}</h3>
    </div>
    <div class="card-footer  text-center">
        <button data-id="${
          dat._id
        }" class="btn btn-sm btn-danger">Delete</button>
    </div>
</div>
    `;
  });
  document.querySelector(".main-row").innerHTML = text;
  let allDeleteBtns = document.querySelectorAll("[data-id]");
  allDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", deleteTodo);
  });
}
displayTodos();

function deleteTodo(e) {
  let id = e.target.getAttribute("data-id");
  console.log(id);
  fetch(`/delete`, {
    method: "POST", // or 'PUT'
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.text())
    .then((json) => displayTodos());
}
