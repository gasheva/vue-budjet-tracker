<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />
      <!-- key - для отслеживания изменений в locale -->
      <Sidebar v-model="isOpen" :key="locale"/>

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/app/Loader.vue";
import Navbar from "../components/app/Navbarr.vue";
import Sidebar from "../components/app/Sidebar.vue";
import messages from "../plugins/messages";
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale(){
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
  components: { Navbar, Sidebar, Loader },
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  created(){
    const id = localStorage.getItem('id');
    console.log("[x]localStorage.getItem('id')"+ id);
    if (!id)
    {
      console.log("redirect to login");
      this.$router.push("/login?message=login");
    }
  },
  //при загрузке главного слоя начинаем подгрузку имени,
  //чтобы потом использовать имя в navbar
  async mounted() {
    if (!Object.keys(this.$store.getters.info)?.length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
};
</script>