import { component$, useLexicalScope, useStore, useVisibleTask$, $ } from '@builder.io/qwik';
// import styles from './TextLoading.module.css';

interface TextItem {
  text: string;
  typed: string;
}

const TextLoading = component$((props: { isVisible: boolean }) => {
  useLexicalScope();
  const state = useStore({
    items: [
      { text: 'What do shares of ownership in a machine learning model look like?', typed: '' },
      { text: 'Can we tailor models to invest on behalf of your best interest?', typed: '' },
      { text: 'A marketplace where models compete for your dollars?', typed: '' },
      { text: 'Tailor the experience to match your risk tolerance, goals, and intentions.', typed: '' },
      { text: 'If this is what excites you, welcome to the Future!', typed: '' },
    ] as TextItem[],
  });

//   const typeText = $(() => {
//     state.items.forEach((item, index) => {
//       let i =  0;
//       const typeNextChar = () => {
//         item.typed += item.text[i];
//         i++;
//         if (i < item.text.length) setTimeout(typeNextChar,  50); // Delay between characters
//       };
//       typeNextChar();
//     });
//   });




//   const typeText = () => {
//     state.items.forEach((item, index) => {
//       let i = 0;
//       const typeNextChar = () => {
//         item.typed += item.text[i];
//         i++;
//         if (i < item.text.length) {
//           setTimeout(typeNextChar, 50); // Delay between characters
//         }
//       };
//       typeNextChar();
//     });
//   };

// const typeText = $(() => {
//     state.items.forEach((item, index) => {
//       let i = 0;
//       const typeNextChar = () => {
//         item.typed += item.text[i];
//         i++;
//         if (i < item.text.length) {
//           setTimeout(typeNextChar, 50); // Delay between characters
//         }
//       };
//       typeNextChar();
//     });
//   });


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

  useVisibleTask$(({ track }) => {
    track(() => props.isVisible);
    if (props.isVisible) {
      typeText();
    }
  });



  return (
//     <div class={styles.container}>
//       <div id="type-container">
//         <ul class="gradient-text-list">
//           {state.items.map((item, index) => (
//             <li key={index}>{item.typed}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// });
<ul class="gradient-text-list">
  {state.items.map((item, index) => (
    <>
      <li key={index}>{item.typed}</li>
      {index !== state.items.length - 1 && <a href="#your-link" class="divider-link"></a>}
    </>
  ))}
</ul>
);
});

export default TextLoading;