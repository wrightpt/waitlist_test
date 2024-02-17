
// import Img3 from '~/routes/3.png?jsx';
import { component$, useStore, $ } from '@builder.io/qwik';
import './login5.css'; // Assuming you have CSS modules set up or a similar mechanism to include CSS
// import logo from './3.png';
import logo1 from './1.webp';
// import faceImage from './9.png'
// import componentStyles from './login5.css';
import TextLoading from "../components/typewriter/tw5";





interface UIState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string | null;
}

export default component$(() => {
  const uiState = useStore<UIState>({
    status: 'idle',
    errorMessage: null,
  });

   const isVisible = true; // Replace with actual logic to determine visibility


  return (

    
    <div> {/* Single parent div */}

   


      <div class="gradient-text"> Monero Prediction Market
      <div>
      <h1>Insights into Action </h1>
      
      <TextLoading isVisible={isVisible} />
      {/* {showTextLoading ? <TextLoading /> : null} */}



      {/* <TextLoading isVisible={isVisible} /> */}
    </div>

      <div id="type-container">

    
  </div>

      
      
      
      
      </div>

      <div class="full-page-background"></div> 
      {/* This div should be outside and before your main content container */}


    <div class="container">
      <div class="header">
      <img src={logo1} alt="Monero Prediction Market Logo" width="768" height="768" class="logo" />

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


    </div>
  );
});





