<template>
  <div
    class="weather"
    v-for="time in times"
    :key="time.time"
  >
    <div class="time-zone">Waktu Indonesia Barat</div>
    <div class="current-time">{{ currentTime }}</div>
    <div class="date-time">{{ `${time.weekday}, ${formatedTime(time.date, "dd MMMM yyyy")}, ${time.timezone}` }}</div>
    <div class="greeting">
      Have a Good Day 😊
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import { fetchData } from "../services/apiService";
  import { format } from 'date-fns';

  export default {
    name: 'WeatherApp',
    data() {
      return {
        formatedTime: format,
        currentTime: new Date().toLocaleTimeString()
      };
    },

    created() {
      // Perbarui waktu setiap detik
      this.timer = setInterval(() => {
        this.currentTime = new Date().toLocaleTimeString();
      }, 1000);
    },

    unmounted() {
      clearInterval(this.timer);
    },

    setup() {
      const times = ref([]);
      const fetchDataFromAPI = async () => {
        try {
          const data = await fetchData('');
          times.value = data.wib;
        } catch (error) {
          console.log(error);
        }
      }

      fetchDataFromAPI();
      return {
        times,
        fetchDataFromAPI
      };
    }
  };
</script>

<style>
  .weather {
    min-width: 95vw;
    min-height: 40vh;
    border: 1px solid whitesmoke;
    border-radius: 10px;
    box-shadow: var(--box);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    padding: 20px 30px;
    color: rgb(51, 51, 51);
    margin-bottom: 20px;
  }

  .time-zone {
    font-weight: 700;
    line-height: 40px;
    font-size: 36px;
  }

  .current-time {
    font-weight: 900;
    line-height: 70px;
    font-size: 100px;
    margin-left: auto;
    margin-top: 20px;
  }

  .date-time {
    font-weight: 400;
    line-height: 40px;
    font-size: 32px;
    margin-left: auto;
    margin-top: 15px;
  }

  .greeting {
    font-weight: 600;
    line-height: 40px;
    font-size: 30px;
    margin-left: auto;
    margin-top: 10px;
  }
</style>