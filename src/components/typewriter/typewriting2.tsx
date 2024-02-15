import { component$, useStore, useTask$ } from '@builder.io/qwik';
import styles from './TextLoading.css';

interface TextItem {
  text: string;
  typed: string;
}

const TextLoading = component$((props: { isVisible: boolean }) => {
  const state = useStore({
    items: [
      // ... your text items here ...
    ] as TextItem[],
  });

  // Typing effect handler
  const typeText = (item: TextItem, charIndex = 0) => {
    if (charIndex < item.text.length) {
      item.typed += item.text[charIndex];
      charIndex++;
      requestAnimationFrame(() => typeText(item, charIndex));
    }
  };

//   useClientEffect$(() => {
//     if (props.isVisible) {
//       state.items.forEach((item) => {
//         typeText(item);
//       });
//     }
//   });

  return (
    <div class={styles.container}>
      <div id="type-container">
        <ul class="gradient-text-list">
          {state.items.map((item, index) => (
            <li key={index}>{item.typed}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default TextLoading;
