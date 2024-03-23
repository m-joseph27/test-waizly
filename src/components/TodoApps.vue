<template>
  <main class="todo-apps">
    <section class="greeting">
      <h3 class="title">✍️ ToDo App With Vue</h3>
    </section>

    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodo">
          <h3>What are you gonna do today 🙂?</h3>
          <input
            type="text"
            placeholder="type here"
            v-model="text"
          />

          <input type="submit" value="Add todo" />
        </form>
      </section>
    </div>

    <div class="todo-section">
      <section class="todo-list">
        <div class="input-section">
          <input
            type="text"
            placeholder="Search todos"
            v-model="searchTerm"
            @input="filterTodos"
            class="search-bar"
          />
        </div>
        <h2 v-show="todos.length === 0" class="not-found">No Todos today 😞</h2>

        <div class="list">
          <div
            v-for="todo in todos"
            :class="`todo-item ${todo.done && 'done'}`"
            :key="todo"
          >
            <label>
              <input type="checkbox" v-model="todo.done" />
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.todo" />
            </div>

            <div class="actions">
              <button class="delete" @click="showConfirmation(todo)">
                <div>
                  <fa icon="trash" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";
  import PopUp from "../common/PopUp.js";

  const todos = ref([]);
  const text = ref("");
  const searchTerm = ref("");
  const originalTodos = ref([]);

  function addTodo() {
    if (text.value.trim() === "") {
      return;
    }

    todos.value.unshift({
      todo: text.value,
      done: false,
    });

    text.value = "";
    updateOriginalTodos();
  }

  function deleteTodo(todo) {
    todos.value = todos.value.filter((x) => x !== todo);
    updateOriginalTodos();
  }

  function showConfirmation(todo) {
    PopUp.confirm(
      'Are you sure?',
      'todo will be lost forever',
      'Sure',
      'No'
    )
    .then((result) => {
      if (result.isConfirmed) {
        PopUp.success('Todo delete successfully');
        deleteTodo(todo);
      }
    });
  }

  function filterTodos() {
    const searchLower = searchTerm.value.trim().toLowerCase();
    if (searchLower === "") {
      todos.value = [...originalTodos.value];
      return;
    }

    todos.value = originalTodos.value.filter(todo =>
      todo.todo.toLowerCase().includes(searchLower)
    );
  }

  function updateOriginalTodos() {
    originalTodos.value = [...todos.value];
  }

  watch(
    todos,
    (newTodoValue) => {
      localStorage.setItem("todos", JSON.stringify(newTodoValue));
    },
    { deep: true }
  );

  onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem("todos")) || [];
  });
</script>

<style>
  .todo-apps {
    min-width: 800px;
  }
  input:not([type="radio"]):not([type="checkbox"]),
  button {
    border: none;
    outline: none;
    background: none;
    cursor: initial;
  }

  section {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5em;
  }

  h3 {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  h4 {
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .greeting .title {
    display: flex;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .greeting .title input {
    margin-left: 0.5rem;
    flex: 1 1 0%;
    min-width: 0;
  }

  .greeting .title,
  .greeting .title input {
    color: white;
    font-size: 2rem;
    font-weight: 700;
  }

  .create-todo input[type="text"] {
    display: block;
    width: 100%;
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
    color: black;
    background-color: whitesmoke;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 1.5rem;
  }

  .create-todo .cate-option {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .create-todo .cate-option label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background-color: #101c43;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    cursor: pointer;
  }

  input[type="checkbox"] {
    height: 25px;
    width: 25px;
    color: green;
  }

  .bubble.personal::after {
    background-color: var(--personal);
    box-shadow: var(--personal-glow);
  }

  input:checked ~ .bubble::after {
    width: 10px;
    height: 10px;
    opacity: 1;
  }

  .create-todo .cate-option label div {
    color: white;
    font-size: 1.125rem;
    margin-top: 1rem;
  }

  .create-todo input[type="submit"] {
    display: block;
    width: 100%;
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
    color: #fff;
    background-color: green;
    border-radius: 0.5rem;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    background-color: #f1816a;
  }

  .create-todo input[type="submit"]:hover {
    opacity: 0.75;
  }

  .todo-list .list {
    margin: 1rem 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .todo-list .todo-item {
    display: flex;
    align-items: center;
    background-color: #b758216f;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    margin-bottom: 1rem;
  }

  .todo-item label {
    display: block;
    margin-right: 1rem;
    cursor: pointer;
  }

  .todo-item .todo-content {
    flex: 1 1 0%;
  }

  .todo-item .todo-content input {
    color: white;
    font-size: 1.125rem;
    width: 100%;
  }

  .todo-item .actions {
    display: flex;
    align-items: center;
  }

  .todo-item .actions button {
    display: block;
    padding: 0.5rem;
    border-radius: 0.25rem;
    color: #fff;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .todo-item .actions button:hover {
    opacity: 0.75;
  }

  .todo-item .actions .edit {
    margin-right: 0.5rem;
    background-color: var(--primary);
  }

  .todo-item .actions .delete {
    background-color: var(--danger);
  }

  .todo-item.done .todo-content input {
    text-decoration: line-through;
    color: rgba(48, 47, 47, 0.681);
  }

  .input-section,
  .todo-section {
    border: 1px solid rgb(243, 243, 243);
    border-radius: 10px;
    margin-top: 30px;
  }

  .search-bar {
    display: block;
    width: 100%;
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
    background-color: green;
    border-radius: 0.5rem;
    box-shadow: var(--personal-glow);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    background-color: white !important;
  }

  .not-found {
    margin-top: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>