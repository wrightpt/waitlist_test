import { component$, useStore, $ , useTask$ } from '@builder.io/qwik';

interface TextItem {
  text: string;
  typed: string;
}

export const TextLoading = component$((props: { isVisible: boolean }) => {
  console.log('TextLoading');
  console.log(`Component render, isVisible: ${props.isVisible}`);


  const state = useStore({

    items: [

      { text: 'What do shares of ownership in a machine learning model look like?', typed: '' },
      { text: 'Can we tailor models to invest on behalf of your best interest?', typed: '' },
      { text: 'A marketplace where models compete for your dollars?', typed: '' },
      { text: 'Tailor the experience to match your risk tolerance, goals, and intentions.', typed: '' },
      { text: 'If this is what excites you, welcome to the Future!', typed: '' },
    ] as TextItem[],
    console: console.log('state.items'),
    typingActive: false  // Introduce a new state variable


  });


  useTask$(() => {
    if (props.isVisible) {
      state.typingActive = true;  //  Start typing effect 

      state.items.forEach((item) => {
        let i = 0;
        const typeNextChar = () => {
          if (!state.typingActive) return; // Stop typing if prop changes 

          if (i < item.text.length) {
            item.typed += item.text[i++];
            state.items = [...state.items]; // Trigger update
          }

          requestAnimationFrame(typeNextChar);
        };
        requestAnimationFrame(typeNextChar);
      });
    } else {
      state.typingActive = false; // Stop typing
    }
  });
  // , 
  // [props.isVisible]); // useEffect will re-run when isVisible changes




  useTask$(() => {
    if (props.isVisible) {
      console.log('isVisible is true, starting typing effect');
      state.items.forEach((item) => {
        let i = 0;
        const typeNextChar = () => {
          if (i < item.text.length) {
            item.typed += item.text[i++];
            // Trigger a reactive update
            state.items = [...state.items];
          }
        };
        requestAnimationFrame(typeNextChar);
      });
    }
  });

  return (
    <ul class="gradient-text-list">
      {state.items.map((item, index) => (
        <li key={index}>{item.typed}</li>
      ))}
    </ul>
  );
});

export default TextLoading;

