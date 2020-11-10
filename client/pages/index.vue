<template>
  <div class="c-main">
    <HeaderBanner />
    <label v-if="error" class="c-error">An error occured: {{ error }}</label>
    <section class="c-gameblock">
      <PlayerForm
        v-for="playerId in players"
        :key="playerId"
        :playerId="playerId"
        :isDisabled="isDisabled"
        @done-bingo="isDisabled = $event"
      />
    </section>
  </div>
</template>

<script>
import HeaderBanner from "@/components/HeaderBanner";
import PlayerForm from "@/components/PlayerForm";

export default {
  components: {
    HeaderBanner,
    PlayerForm,
  },
  data() {
    return {
      players: [],
      isDisabled: false,
      error: "",
    };
  },
  async asyncData({ $axios }) {
    const res = await $axios.get("/").catch((error) => {
      return { error: error.message };
    });

    return { players: res.data };
  },
};
</script>

<style >
@import "~/assets/styles/firework.css";
.c-main {
  margin: 1% auto;
  text-align: center;
  width: 100%;
  border: 2.5px solid grey;
  border-radius: 5px;
  border-color: #e0e0e0;
  padding: 1% 2%;

  color: #707070;
}

.c-gameblock {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 1%;
}

.c-error {
  color: #c51244;
  font-weight: bold;
}

@media (min-width: 768px) {
  .c-main {
    margin: 5% auto;
    width: 90%;
    padding: 5% 5%;
  }
}
</style>
