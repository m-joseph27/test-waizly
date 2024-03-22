<template>
  <div>Ini Halaman Weather</div>
</template>

<script>
  import { fetchData, sendData } from "../services/apiService";

  export default {
    name: 'WeatherApp',
    mounted() {
      this.fetchDataFromAPI();
    },
    methods: {
      async fetchDataFromAPI() {
      try {
          const data = await fetchData('');
          console.log('Data from API:', data);
      } catch (error) {
          // Tangani kesalahan jika ada
      }
      },
      async sendDataToAPI() {
      try {
          const postData = { /* Data yang akan dikirim */ };
          const responseData = await sendData('/example_endpoint', postData);
          console.log('Response from API:', responseData);
      } catch (error) {
          // Tangani kesalahan jika ada
      }
      }
    }
  };
</script>