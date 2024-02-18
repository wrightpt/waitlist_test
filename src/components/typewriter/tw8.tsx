import { component$, useStore, useTask$ } from '@builder.io/qwik';

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
  });

  useTask$(({ track }) => {
    track(() => props.isVisible);

    if (!props.isVisible) return;

    let i =   0;
    let activeItemIndex =   0;

    const typeNextChar = () => {
      if (i >= state.items[activeItemIndex].text.length) {
        activeItemIndex++;
        i =   0;
        if (activeItemIndex >= state.items.length) return;
      }

      // Update the typed property in a way that triggers Qwik reactivity
      state.items[activeItemIndex] = {
        
        ...state.items[activeItemIndex],
        typed: state.items[activeItemIndex].typed + state.items[activeItemIndex].text[i++]
      };

      // Force a re-render by updating the state with a new array reference
      state.items = [...state.items];
      console.log('state.items:', state.items.map(item => item.typed).join('|'));
    //   console.log('activeItemIndex:', activeItemIndex, 'i:', i, 'typed:', state.items[activeItemIndex].typed);


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
