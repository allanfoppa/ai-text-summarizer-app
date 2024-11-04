<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';

const route = useRoute();
const router = useRouter();

const { locale } = useI18n();

watch(
  () => route.params.lang,
  (newLang) => {
    if (newLang && locale.value !== newLang) {
      locale.value = newLang;
    }
  },
  { immediate: true }
);

const goTo = (path) => {
  router.push({ path: `/${locale.value}${path}` });
};
</script>

<template>
  <nav class="nav">
    <RouterLink class="nav__link" :to="{ path: `/${$route.params.lang || 'pt'}/home` }"> {{ $t("nav.home") }} </RouterLink>
    <RouterLink class="nav__link" :to="{ path: `/${$route.params.lang || 'pt'}/about` }"> {{ $t("nav.about") }} </RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.nav__link {
  color: #000;
  text-decoration: none;
  padding: 0 1rem;
  border-left: 1px solid var(--color-text);
}

.nav__link:first-of-type {
  border: 0;
}

.router-link-exact-active {
  color: var(--main-color);
  text-decoration: underline;
}

.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 1024px) {
  .nav {
    font-size: 1rem;
    padding-bottom: 2rem;
  }
}
</style>
