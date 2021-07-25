<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$error }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите название категории </span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная величина {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import { minValue, required } from "vuelidate/lib/validators";
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      current: null
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  created(){
      const {id, title, limit} = this.categories[0];
      this.current = id;
      this.title = title;
      this.limit = limit;
  },
  methods: {
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      try{
          const categoryData={
              id: this.current,
              title: this.title,
              limit: this.limit
          }
            await this.$store.dispatch('updateCategory', categoryData);
            this.$message('Категория обновлена');
            this.$emit('updated', categoryData);
      }catch(e){
          console.log(e);
      }
    },
  },
  watch:{
      current(catId){
          const {title, limit} = this.categories.find(c=>c.id==catId);
          this.title = title;
          this.limit = limit; 
      }
  }
};
</script>