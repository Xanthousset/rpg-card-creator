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
    print: {
      cutLines: boolean
    }
  }

  const isFront = ref<boolean>(true)

  const options = reactive<Options>({
    borderRadius : 5,
    front: {
      borderWidth : 0,
      backgroundColor : '#F1F1F1',
      borderColor : '#F1F1F1',
    },
    back: {
      borderWidth : 0,
      backgroundColor : '#F1F1F1',
      borderColor : '#F1F1F1',
    },
    print: {
      cutLines: true,
    }
  });



  return {
    options,
    isFront
  };
});
