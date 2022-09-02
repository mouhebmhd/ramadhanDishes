<template>
  <div class="col salat-time p-2 m-0" id="salat-time">
    <p class="timeNow h1 p-1">{{ time }}</p>
    <p class="day h4 p-1">{{ day }},</p>
    <p class="date h4 p-1">{{ date }},</p>
    <p class="nextPrayerMessage h5 p-1">Next Prayer,</p>
    <p class="nextPrayerTime h4 p-1">{{ nextPrayerTime }}</p>
    <p class="remainingTime h6 p-1">
      {{ remainingUntilMaghrib }} until Maghrib
    </p>
    <div class="col d-flex flex-column p-4 mt-0">
      <div class="salatContainer d-flex justify-content-between">
        <p class="salatName">Fajr</p>
        <p class="salatTime">{{ salatTimes.Fajr }}</p>
      </div>
      <div class="salatContainer d-flex justify-content-between">
        <p class="salatName">Shuruq</p>
        <p class="salatTime">{{ salatTimes.Sunrise }}</p>
      </div>
      <div class="salatContainer d-flex justify-content-between">
        <p class="salatName">Dhuhr</p>
        <p class="salatTime">{{ salatTimes.Dhuhr }}</p>
      </div>
      <div class="salatContainer d-flex justify-content-between">
        <p class="salatName">Asr</p>
        <p class="salatTime">{{ salatTimes.Asr }}</p>
      </div>
      <div class="salatContainer d-flex justify-content-between">
        <p class="salatName">Maghrib</p>
        <p class="salatTime">{{ salatTimes.Maghrib }}</p>
      </div>
      <div class="salatContainer d-flex justify-content-between">
        <p class="salatName">Isha</p>
        <p class="salatTime">{{ salatTimes.Isha }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "salat-time",
  components: {},
  data() {
    return {
      date: "",
      time: "",
      salatTimes: {},
      day: "",
      fullDate: "",
      nextPrayerTime: "",
      remainingUntilMaghrib: 0,
    };
  },
  mounted() {
    axios.get("http://localhost:3080/getPrayerTimes/").then((response) => {
      this.time = response.data.time;
      this.day =
        response.data.prayerTimes.data[
          response.data.date - 1
        ].date.gregorian.weekday.en;
      this.fullDate =
        response.data.prayerTimes.data[response.data.date - 1].date;
      this.date =
        this.fullDate.hijri.day +
        "th " +
        this.fullDate.hijri.month.en +
        " " +
        this.fullDate.hijri.year;
      this.salatTimes =
        response.data.prayerTimes.data[response.data.date - 1].timings;
      this.remainingUntilMaghrib = this.calculateRemainingTime(this.salatTimes);
      this.fullDate =
        response.data.prayerTimes.data[response.data.date - 1].date.readable;
    });
  },
  methods: {
    calculateRemainingTime(salatTimes) {
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let maghribHours = parseInt(salatTimes.Maghrib.substr(0, 2));
      let maghribMinutes = parseInt(salatTimes.Maghrib.substr(3, 2));
      let timeDiff =
        maghribHours * 60 + maghribMinutes - (hours * 60 + minutes);
      return (
        parseInt(timeDiff / 60) +
        "h " +
        (timeDiff - parseInt(timeDiff / 60) * 60) +
        "min"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.timeNow {
  color: #574746;
  font-weight: bolder !important;
}
.day,
.date,
.nextPrayerMessage {
  color: #574746;
}
.nextPrayerTime {
  color: #247d64;
}
.salatTime,
.salatName {
  color: #574746;
  font-size: 1.1rem;
}
.salatContainer {
  border-bottom: 2px solid #574746;
}
.d-flex {
  row-gap: 2px;
}
.nextPrayerTime {
  font-weight: 500 !important;
}
.remainingTime {
  font-weight: bolder;
  color: #247d64;
}
</style>
