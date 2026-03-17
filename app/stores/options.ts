import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useOptionsStore = defineStore('options', () => {

  type Options = {
    borderRadius: number
    front: {
      borderWidth: number
      backgroundColor: string
      borderColor: string
    }
    back: {
      borderWidth: number
      backgroundColor: string
      borderColor: string
    }
  }

  const isFront = ref<boolean>(true)

  const options = reactive<Options>({
    borderRadius : 5,
    front: {
      borderWidth : 0,
      backgroundColor : '#000',
      borderColor : '#fff',
    },
    back: {
      borderWidth : 0,
      backgroundColor : '#000',
      borderColor : '#fff',
    }
  });



  return {
    options,
    isFront
  };
});
