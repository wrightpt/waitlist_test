import { component$, useStore, useTask$ } from '@builder.io/qwik';

export const TypingText = component$(() => {
  const state = useStore({
    text: 'This text will appear with a typing effect.',
    currentIndex: 10, 
  });

  useTask$(() => {
    setTimeout(() => { 
      const intervalId = setInterval(() => { 
        if (state.currentIndex >= state.text.length) {
          clearInterval(intervalId); 
          return;
        }
        state.currentIndex++; // Increment the index
      }, 100); 

      return () => clearInterval(intervalId); 
    }, 500); 
  });

  return <div>{state.text.substring(0, state.currentIndex)}</div> 
});

export default TypingText;