import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useOptionsStore = defineStore('options', () => {

  type Options = {
    borderWidth: number
    borderRadius: number
    backgroundColor: string
    borderColor: string
  }

  const options = reactive<Options>({
    borderWidth : 0,
    borderRadius : 5,
    backgroundColor : '#000',
    borderColor : '#fff',
  });



  return {
    options,
  };
});
