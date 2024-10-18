import { createI18n } from "vue-i18n";

const messages = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre"
    },
    home: {
      header: "Aplicativo de Resumo de Texto com IA",
      welcome: "Bem-vindo ao Aplicativo de Resumo de Texto com IA! Este aplicativo utiliza o poder das APIs de Inteligência Artificial para fornecer resumos concisos de textos longos. Se você tem um artigo extenso, um trabalho de pesquisa ou qualquer outro documento de texto que deseja resumir rapidamente, nosso aplicativo pode ajudá-lo.",
      info: "Simplesmente cole seu texto na área de texto abaixo e clique no botão \"Enviar\"."
    },
    about: {
      header: "Sobre nós"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About"
    },
    home: {
      header: "AI Text Summarizer App",
      welcome: "Welcome to the AI Text Summarizer App! This app leverages the power of Artificial Intelligence APIs to provide concise summaries of long texts. Whether you have a lengthy article, research paper, or any other text document that you want to summarize quickly, our app can assist you.",
      info: "Simply paste your text into the text area below and click the \"Submit\" button.",
    },
    about: {
      header: "About us"
    }
  }
}

export default createI18n({
  locale: import.meta.env.VITE__DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE__FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages
})