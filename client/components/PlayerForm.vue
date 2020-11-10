<template>
  <section class="c-player-card">
    <div v-if="this.guess === 'Bingo!!!'" class="pyro">
      <div class="before"></div>
      <div class="after"></div>
    </div>
    <div class="c-form">
      <label class="c-label">Enter a number between 0 and 100</label>
      <input class="c-input" v-model="number" type="text" />
      <button class="c-button" @click="onClicked" :disabled="isDisabled">
        Submit
      </button>
    </div>
    <label v-if="this.guess !== ''" :class="'c-guess ' + setClass">{{
      guess
    }}</label>
    <transition name="stretch">
      <label class="c-error" v-if="error">{{ error }}</label>
    </transition>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerForm",
  props: {
    playerId: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    setClass() {
      return this.guess === "lower"
        ? "lower"
        : this.guess === "higher"
        ? "higher"
        : "bingo";
    },
  },
  data() {
    return {
      number: "",
      guess: "",
      error: "",
    };
  },
  methods: {
    async onClicked() {
      if (
        isNaN(this.number) ||
        this.number === "" ||
        this.number < 0 ||
        this.number > 100
      ) {
        this.error = "Please enter valid number!";
        this.guess = "";
        return;
      }

      await this.$axios
        .$post("/", {
          playerId: this.playerId,
          number: this.number,
        })
        .then((res) => {
          this.guess = res.guess;
          this.error = "";

          if (this.guess === "Bingo!!!") {
            this.$emit("done-bingo", true);
          }
        })
        .catch((error) => {
          this.error = error.message;
          this.guess = "";
        });
    },
  },
};
</script>

<style scoped>
@import "~/assets/styles/firework.css";
.c-player-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 5%;
  padding-top: 3%;
  height: 160px;
  animation: box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.c-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.c-form * {
  margin-bottom: 3%;
}

.c-label {
  width: 70%;
}

.c-input {
  width: 30%;
  height: 2em;
  border: 1px solid #e0e0e0;
  text-align: center;
}

.c-button:disabled {
  background-color: lightgreen;
}

.c-button {
  background-color: green;
  color: white;
  font-weight: bold;
  border: none;
  outline: none !important;
  border-radius: 2px;
  padding: 0.7em;
}

.c-guess {
  font-weight: bold;
}

.bingo {
  color: red;
  font-size: 1.5em;
  animation: slide-sideways 0.4s linear infinite both;
}

@keyframes slide-sideways {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

.lower {
  color: #cb410b;
  animation: slide-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-bottom {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

.higher {
  color: #cb410b;
  animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-top {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.c-button:active {
  animation: blink 0.4s both;
  outline: none;
}

.c-guess,
.c-error {
  padding-bottom: 4%;
}

.stretch-enter-active {
  animation: stretch-out 0.5s;
}

@media (min-width: 1025px) {
  .c-player-card {
    width: 30%;
    height: 250px;
    margin-bottom: 0;
  }

  .c-form * {
    margin-bottom: 5%;
  }

  .c-label {
    width: 60%;
  }

  .c-guess,
  .c-error {
    padding-bottom: 10%;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .c-player-card {
    /* height: 250px; */
    margin-bottom: 3%;
  }

  .c-label {
    width: 100%;
  }
}

@keyframes box-shadow {
  0% {
    transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    transform: translateZ(50px);
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
  }
}

@keyframes stretch-out {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>