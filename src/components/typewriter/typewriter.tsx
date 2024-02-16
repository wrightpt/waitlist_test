import { component$, useStore, $ } from '@builder.io/qwik';

interface TextItem {
  text: string;
  typed: string;
}

const TextLoading = component$((props: { isVisible: boolean }) => {
  const state = useStore({
    items: [
      { text: 'What do shares of ownership in a machine learning model look like?', typed: '' },
      { text: 'Can we tailor models to invest on behalf of your best interest?', typed: '' },
      { text: 'A marketplace where models compete for your dollars?', typed: '' },
      { text: 'Tailor the experience to match your risk tolerance, goals, and intentions.', typed: '' },
      { text: 'If this is what excites you, welcome to the Future!', typed: '' },
    ] as TextItem[],
  });

  const typeText = $(() => {
    state.items.forEach((item) => {
      let i = 0;
      const typeNextChar = () => {
        if (i < item.text.length) {
          item.typed += item.text[i++];
          requestAnimationFrame(typeNextChar);
        }
      };
      requestAnimationFrame(typeNextChar);
    });
  });

  // Track props.isVisible using a QRL
  $(() => {
    if (props.isVisible) {
      typeText();
    }
  });

  return (
    <ul class="gradient-text-list">
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
