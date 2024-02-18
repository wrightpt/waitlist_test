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
    track(() => state.isTypingEnabled); // Use the state variable for tracking

    console.log('isVisible:', props.isVisible)
    console.log('useTask$');

    // console.log('Checking client-side:', typeof window === 'undefined');
    console.log(`Window object defined: ${typeof window !== 'undefined'}`);

 if (!props.isVisible || typeof window === 'undefined') return;


    //   if (!props.isVisible || typeof window === 'undefined') return;
    // if (!state.isTypingEnabled || typeof window === 'undefined') return;
    // if (!state.isTypingEnabled || typeof window === 'undefined') return; 


    console.log('isVisible is true, starting typing effect');
    let i =   0;
    let activeItemIndex =   0;

    const typeNextChar = () => {
        console.log( 'i:', i, 'typed:');
      if (i >= state.items[activeItemIndex].text.length) {
        activeItemIndex++;
        console.log( 'activeItemIndex:', activeItemIndex, 'i:', i, 'typed:'),

        i =   0;
        if (activeItemIndex >= state.items.length) return;
        console.log('activeItemIndex:', activeItemIndex, 'i:', i, 'typed:', state.items[activeItemIndex].typed);
      }

      // Update the typed property in a way that triggers Qwik reactivity
    //   state.items[activeItemIndex] = {
    //     ...state.items[activeItemIndex],
    //     typed: state.items[activeItemIndex].typed + state.items[activeItemIndex].text[i++]
    //   };

    // state.items = state.items.map((item, idx) => 
    // idx === activeItemIndex 
    //     ? {...item, typed: item.typed + item.text[i++]}  
    //     : item
        // ).slice(0); 
        // Adding 'slice(0)' creates a guaranteed new reference
    //     state.items = state.items.map((item, idx) => 
    //     idx === activeItemIndex 
    //         ? {...item, typed: item.typed + item.text[i++]}  
    //         : {...item}  // Create a new copy even if unchanged 
    // ).slice(0);

    state.items = state.items.map((item, idx) =>  
    idx === activeItemIndex  
      ? {...item, typed: item.typed + item.text[i++]}   
      : {...item}  // Create a new copy even if unchanged
  ).slice(0); // Adding 'slice(0)' creates a guaranteed new reference

      // Force a re-render by updating the state with a new array reference
      state.items = [...state.items];
      console.log('state');


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
