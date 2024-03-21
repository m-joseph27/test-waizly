<template>
  <main class="app">
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
        <h2 v-show="todos.length === 0">No Todos today 😞</h2>

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
              <button class="delete" @click="deleteTodo(todo)">
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

  const todos = ref([]);
  const text = ref("");

  function addTodo() {
    if (text.value.trim() === "") {
      return;
    }

    todos.value.unshift({
      todo: text.value,
      done: false,
    });

    text.value = "";
  }

  function deleteTodo(todo) {
    todos.value = todos.value.filter((x) => x !== todo);
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

<script>
  export default {
    name: "TodoApps",
  }
</script>