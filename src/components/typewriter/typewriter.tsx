import { component$, useStore, $, useTask$ } from '@builder.io/qwik';

interface TextItem {
  text: string;
  typed: string;
}

function runTypingEffect(items: TextItem[]) {
  items.forEach((item: TextItem) => {
    let i = 0;
    const typeNextChar = () => {
      if (i < item.text.length) {
        item.typed += item.text[i++];
        // Note: This manipulation won't automatically trigger Qwik reactivity.
        requestAnimationFrame(typeNextChar);
      }
    };
    requestAnimationFrame(typeNextChar);
  });
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

    typingActive: false  // Introduce a new state variable



  
    
  });

  const startTypingEffect = $((event: Event) => {
    runTypingEffect(state.items);
  });

 



  useTask$(() => {
    if (props.isVisible) {
      console.log('isVisible is true, starting typing effect');
      runTypingEffect(state.items); // Call your function here with the properly typed items
    }
  });

  return (
    <ul class="gradient-text-list">
      <runTypingEffect />
      {state.items.map((item, index) => (
        <>
          <li key={index}>{item.typed}</li>
          {index !== state.items.length - 1 && (
            <a href="#your-link" class="divider-link"></a>
          )}
        </>
      ))}
    </ul>
  );
});

export default TextLoading;
