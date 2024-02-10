// import { component$, useStore } from '@builder.io/qwik';


// declare global {
//   const $: (handler: (evt: Event) => void) => void;
// }

// // Define the interface outside of the component
// interface UIState {
//     status: 'idle' | 'submitting' | 'success' | 'error';
//     errorMessage: string | null;
//   }


// export default component$(() => {
//   // State to handle submission progress
//   const uiState = useStore<UIState>({
//     status: 'idle', // 'idle', 'submitting', 'success', 'error'
//     errorMessage: null as string | null, // Now accepts both string and null
//   });


  
// // eslint-disable-next-line
// // eslint-disable-next-line @typescript-eslint/no-unused-vars

//   const handleSubmit = $(async (evt: Event) => {
//     evt.preventDefault();
//     uiState.status = 'submitting';    

//     // 1. Get email value from form
//     const email = (evt.target as HTMLFormElement).email.value;

//     try {
//       // 2. Implement your data submission logic 
//       //    Example using serverless function:
//       await fetch('/api/submit-waitlist', {
//         method: 'POST',
//         body: JSON.stringify({ email })
//       });

//       // 3. On success, update state
//       uiState.status = 'success';
//     } catch (error) {
//       uiState.status = 'error';
//       uiState.errorMessage = 'Something went wrong. Please try again.'; 
//     }    
//   });

//   return (
//     <div class="container">
//       <div class="header">
//         {/* ... Logo and Heading ... */}
//       </div>

//       <form id="waitingListForm" onSubmit$={handleSubmit}>
//         <label for="email">Email:</label>
//         <input type="email" id="email" name="email" required />

//         {/* Conditional Button Rendering */}
//         {uiState.status === 'idle' && (
//           <button type="submit">Join Waiting List</button>
//         )}
//         {uiState.status === 'submitting' && (
//           <button type="button" disabled>Submitting...</button>
//         )}
//         {uiState.status === 'success' && (
//           <p>Thank you for signing up!</p>
//         )}
//         {uiState.status === 'error' && (
//           <p class="error-message">{uiState.errorMessage}</p> 
//         )}
//       </form>

//       {/*   ... Rest of Your Form Content ... */}
//     </div>
//   );
// });
// import { component$, useStore, $ } from '@builder.io/qwik';

// interface UIState {
//   status: 'idle' | 'submitting' | 'success' | 'error';
//   errorMessage: string | null;
// }

// export default component$(() => {
//   const uiState = useStore<UIState>({
//     status: 'idle',
//     errorMessage: null,
//   });

//   return (
//     <div class="container">
      
//       {/* ... */}
//       <form
//         id="waitingListForm"
//         onSubmit$={$(async (event: SubmitEvent) => {
//           event.preventDefault();
//           uiState.status = 'submitting';
//           const form = event.target as HTMLFormElement;
//           const email = form.email.value;

//           try {
//             await fetch('/api/submit-waitlist', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ email }),
//             });
//             uiState.status = 'success';
//           } catch (error) {
//             uiState.status = 'error';
//             uiState.errorMessage = 'Something went wrong. Please try again.';
//           }
//         })}
//       >
//         <label for="email">Email:</label>
//         <input type="email" id="email" name="email" required />
//         {/* Conditional Button Rendering */}
//         {/* ... */}
//       </form>
//     </div>
//   );
// });


import { component$, useStore, $ } from '@builder.io/qwik';
import './login5.css'; // Assuming you have CSS modules set up or a similar mechanism to include CSS

interface UIState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string | null;
}

export default component$(() => {
  const uiState = useStore<UIState>({
    status: 'idle',
    errorMessage: null,
  });

  return (
    <div class="container">
      <div class="header">
        <img src="greennumber_monero_marketplace_logo._trusting_metro_future_stab_443cf9db-afb8-4b1e-9790-7f5a1ed76336.png" alt="Monero Logo" class="logo"/>
        <h1>Join the Waiting List for Monero Prediction Market</h1>
      </div>
      <form id="waitingListForm" onSubmit$={$(async (event: SubmitEvent) => {
        event.preventDefault();
        uiState.status = 'submitting';
        const form = event.target as HTMLFormElement;
        const email = form.email.value;

        try {
          await fetch('/api/submit-waitlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          uiState.status = 'success';
        } catch (error) {
          uiState.status = 'error';
          uiState.errorMessage = 'Something went wrong. Please try again.';
        }
      })}>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        {uiState.status === 'idle' && (
          <button type="submit">Join Waiting List</button>
        )}
        {uiState.status === 'submitting' && (
          <button type="button" disabled>Submitting...</button>
        )}
        {uiState.status === 'success' && (
          <p>Thank you for signing up!</p>
        )}
        {uiState.status === 'error' && (
          <p class="error-message">{uiState.errorMessage}</p>
        )}
      </form>
      <p>We will notify you when we launch!</p>
      <div class="login-link">
        {/* Already have an account? <a href="#">Login here.</a> */}
      </div>
    </div>
  );
});



