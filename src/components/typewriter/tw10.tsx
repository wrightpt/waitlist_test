import { component$, useStore, useTask$,  } from '@builder.io/qwik';

interface TextItem {
  text: string;
  typed: string;
}

export const TextLoading = component$((props: { isVisible: boolean }) => {
  const state = useStore({
    items: [
      { text: 'What do shares of ownership in a machine learning model look like?', typed: '' },
      { text: 'Can we tailor models to invest on behalf of your best interest?', typed: '' },
      { text: 'A marketplace where models compete for your dollars?', typed: '' },
      { text: 'Tailor the experience to match your risk tolerance, goals, and intentions.', typed: '' },
      { text: 'If this is what excites you, welcome to the Future!', typed: '' },
    ],
    isTypingEnabled: props.isVisible // Initialize based on the prop
  });

  useTask$(({ track }) => {
    track(() => props.isVisible);
    track(() => state.isTypingEnabled); // Track the state variable for changes

    // Update the isTypingEnabled state variable based on the isVisible prop
    state.isTypingEnabled = props.isVisible;

    if (!state.isTypingEnabled || typeof window === 'undefined') return;


    console.log('isVisible is true, starting typing effect');
    let i =   0;
    let activeItemIndex =   0;

    const typeNextChar = () => {
      if (i >= state.items[activeItemIndex].text.length) {
        activeItemIndex++;
        i =   0;
        if (activeItemIndex >= state.items.length) return;
      }

      // Update the typed property in a way that triggers Qwik reactivity
      state.items = state.items.map((item, idx) =>  
        idx === activeItemIndex  
          ? {...item, typed: item.typed + item.text[i++]}   
          : {...item}  // Create a new copy even if unchanged
      ).slice(0); // Adding 'slice(0)' creates a guaranteed new reference


      setTimeout(typeNextChar,   100);
    };

    typeNextChar();
  });

  // Rendering logic
  return (
    <ul class="gradient-text-list">
      {state.items.map((item, index) => (
        <li key={index}>{item.typed}</li>
      ))}
    </ul>
  );
});

export default TextLoading;
