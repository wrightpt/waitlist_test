import { component$, useLexicalScope } from '@builder.io/qwik';
import styles from './TextLoading.css';

// Corrected the component$ usage and fixed the QRL import statement
const TextLoading = component$((props: { isVisible: boolean }) => {
    useLexicalScope();

    return props.isVisible ? (
        <div class={styles.container}>
            <div id="type-container">
                <ul class="gradient-text-list">
                    {/* ...Your list items with the text content... */}
                </ul>
            </div>
        </div>
    ) : null;
});
