import { component$, useStore, useTask$ } from '@builder.io/qwik';

interface TextItem {
  text: string;
  typed: string;
}

export const TextLoading = component$((props: { isVisible: boolean }) => {
  const state = useStore({
    console: console.log('state.items'),
    items: [
      { text: 'What do shares of ownership in a machine learning model look like?', typed: '' },
      { text: 'Can we tailor models to invest on behalf of your best interest?', typed: '' },
      { text: 'A marketplace where models compete for your dollars?', typed: '' },
      { text: 'Tailor the experience to match your risk tolerance, goals, and intentions.', typed: '' },
      { text: 'If this is what excites you, welcome to the Future!', typed: '' },
    ],
  });





  useTask$(({ track }) => {
    track(props, 'isVisible'); // Ensure Qwik re-runs this task if 'isVisible' changes

    if (!props.isVisible) return;  // Stop typing if not visible

    let i = 0;
    let activeItemIndex = 0;

    const typeNextChar = () => {
      if (i >= state.items[activeItemIndex].text.length) {
        activeItemIndex++;  // Go to the next item
        i = 0;
        if (activeItemIndex >= state.items.length) return; // Reached the end
      }

      state.items[activeItemIndex].typed += state.items[activeItemIndex].text[i++];
      state.items = [...state.items]; // Force Qwik to re-render

      setTimeout(() => {  // Use setTimeout for pacing instead of requestAnimationFrame
        typeNextChar(); 
      }, 100); // Adjust delay here for typing speed
    };

    typeNextChar(); //  Initiate the effect if it's visible 
  });

  // ... your rendering logic ... 
});


  // Typing effect logic, adapted for client-side execution
//   const runTypingEffect = () => {
//     console.log('runTypingEffect');
//     state.items.forEach((item, index) => {
//       let i = 0;
//       const typeNextChar = () => {
        // Check to ensure execution is client-side
        // if (i < item.text.length && typeof window !== 'undefined') {
        //   const newTypedValue = item.typed + item.text[i++];
          // Update the typed property in a way that triggers Qwik reactivity
//           state.items[index] = { ...item, typed: newTypedValue };
//           requestAnimationFrame(typeNextChar);
//         }
//       };
//       requestAnimationFrame(typeNextChar);
//     });
//   };

  // Automatically run the typing effect when the component is visible
//   if (props.isVisible && typeof window !== 'undefined') {
//     runTypingEffect();
//   }

  return (
    <ul class="gradient-text-list">
      {state.items.map((item, index) => (
        <li key={index}>{item.typed}</li>
      ))}
    </ul>
  );
});

export default TextLoading;
