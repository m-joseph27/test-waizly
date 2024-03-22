<template>
  <WeatherApp />
  <TodoApps />
</template>

<script>
import TodoApps from './components/TodoApps.vue';
import WeatherApp from './components/WeatherApp.vue';

export default {
  name: 'App',
  components: {
    TodoApps,
    WeatherApp
  }
}
</script>