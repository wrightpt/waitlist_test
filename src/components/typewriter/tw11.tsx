import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';

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
    isTypingEnabled: props.isVisible, // Initialize based on the prop
  });

  useVisibleTask$(({ track }) => {
    track(() => state.isTypingEnabled); // Track the state variable for changes

    if (!state.isTypingEnabled) return; // Guard for non-visible states

    let activeItemIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (activeItemIndex >= state.items.length) {
        // All items have been typed
        return;
      }

      const currentItem = state.items[activeItemIndex];
      if (charIndex < currentItem.text.length) {
        // Update the typed property to simulate typing
        currentItem.typed += currentItem.text[charIndex++];
        state.items = [...state.items]; // Trigger reactivity by creating a new array
        setTimeout(typeNextChar, 100); // Schedule the next character to be typed
      } else {
        // Move to the next item and reset character index
        activeItemIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 100); // Schedule the next character to be typed
      }
    };

    typeNextChar(); // Start the typing effect
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