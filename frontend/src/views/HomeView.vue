<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { summarize } from '@/constants/endpoints';

import WelcomeText from "@/components/WelcomeText.vue";
import InfoText from "@/components/InfoText.vue";
import SummarizeTextArea from "@/components/SummarizeTextArea.vue";

// DEFINE REFS FOR THE DATA
const textToSummarize = ref<string>('');
const submitButton = ref<HTMLButtonElement | null>();
const summarizedTextArea = ref<HTMLTextAreaElement | null>(null);

const verifySummarizeTextLength = () => {
  // ENABLE OR DISABLE THE BUTTON BASED ON TEXTAREA VALUE
  let isTextBetweenRange: Boolean =
    textToSummarize.value.length >= 200 && textToSummarize.value.length <= 100000

  if (submitButton.value) {
    isTextBetweenRange
      ? submitButton.value.disabled = false
      : submitButton.value.disabled = true
  }
};

const submitData = () => {
  if (!textToSummarize.value) return;

  // ADD LOADING ANIMATION
  if (submitButton.value) {
    submitButton.value.classList.add("submit-button--loading");
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    inputs: textToSummarize.value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as RequestRedirect,
  };

  // SEND THE TEXT TO THE SERVER USING FETCH API
  fetch(summarize, requestOptions)
    .then((response) => response.json())
    .then((summary) => {
      // UPDATE THE OUTPUT TEXT AREA WITH THE NEW SUMMARY
      if (summary.data === undefined) {
        if (summarizedTextArea.value) {
          summarizedTextArea.value.value = "Error: Unable to summarize the text";
        }
      }

      if (summarizedTextArea.value) {
        summarizedTextArea.value.value = summary.data;
      }

      // REMOVE LOADING ANIMATION
      if (submitButton.value) {
        submitButton.value.classList.remove("submit-button--loading");
      }
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
          style="outline: none;"
          readonly
          :placeholder="$t('home.textAreaSummarized')"
        ></textarea>
      </div>
    </div>
  </main>
</template>
