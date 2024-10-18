<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { summarize } from '@/constants/endpoints';

import WelcomeText from "@/components/WelcomeText.vue";
import InfoText from "@/components/InfoText.vue";
import SummarizeTextArea from "@/components/SummarizeTextArea.vue";

// DEFINE REFS FOR THE DATA
const textToSummarize = ref('');
const submitButton = ref(null);
const summarizedTextArea = ref(null);

const verifySummarizeTextLength = () => {
  // ENABLE OR DISABLE THE BUTTON BASED ON TEXTAREA VALUE
  let isTextBetweenRange = textToSummarize.value.length >= 200 && textToSummarize.value.length <= 100000
  if (isTextBetweenRange) {
    submitButton.value.disabled = false;
  } else {
    submitButton.value.disabled = true;
  }
};

const submitData = () => {
  if (!textToSummarize.value) return;

  // ADD LOADING ANIMATION
  submitButton.value.classList.add("submit-button--loading");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    text_to_summarize: textToSummarize.value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // SEND THE TEXT TO THE SERVER USING FETCH API
  fetch(summarize, requestOptions)
    .then((response) => response.text())
    .then((summary) => {
      // UPDATE THE OUTPUT TEXT AREA WITH THE NEW SUMMARY
      if (summarizedTextArea.value) {
        summarizedTextArea.value.value = summary;
      }

      // REMOVE LOADING ANIMATION
      submitButton.value.classList.remove("submit-button--loading");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

// USE ONMOUNTED TO INITIALIZE THINGS WHEN DOM IS READY
onMounted(() => {
  if (submitButton.value) {
    submitButton.value.disabled = true;
  }
});

// WATCH THE TEXTAREA INPUT TO VALIDATE AND ENABLE/DISABLE THE BUTTON
watch(textToSummarize, verifySummarizeTextLength);
</script>

<template>
  <main>
    <WelcomeText />
    <InfoText />
    <div class="container">
      <div class="text-box">
        <SummarizeTextArea v-model="textToSummarize" />

        <!-- TODO: Make a component -->
        <button ref="submitButton" class="submit-button" @click="submitData">
          <span class="submit-button-text">Summarize</span>
        </button>
      </div>
      <div class="text-box">
        <!-- TODO: Make a component -->
        <textarea
          ref="summarizedTextArea"
          name="summarized_text"
          readonly
          placeholder="Summarized text will appear here"
        ></textarea>
      </div>
    </div>
  </main>
</template>
