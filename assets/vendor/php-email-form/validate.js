/**
* PHP Email Form Validation - v3.11
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      let submitBtn = thisForm.querySelector('button[type="submit"]');
      let originalBtnText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            try {
              grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
                .then(token => {
                  formData.set('recaptcha-response', token);
                  php_email_form_submit(thisForm, action, formData);
                })
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData, submitBtn, originalBtnText);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData, submitBtn, originalBtnText) {

    // We want to send an email instead of using AJAX
    const toEmail = "ciphcreativeagency@gmail.com";

    // Gather all form data
    const name = formData.get('name') || 'N/A';
    const email = formData.get('email') || 'N/A';
    const website = formData.get('website') || 'N/A';
    const service = formData.get('service') || 'General Inquiry';
    const message = formData.get('message') || '';

    // Construct the subject
    const subject = encodeURIComponent(`New Quote Request for ${service} from ${name}`);

    // Construct the email body
    let bodyText = `CIPH CREATIVE AGENCY - QUOTE REQUEST\n\n`;
    bodyText += `Customer Name: ${name}\n`;
    bodyText += `Customer Email: ${email}\n`;
    bodyText += `Website: ${website}\n`;
    bodyText += `Service Requested: ${service}\n\n`;
    bodyText += `Project Description:\n${message}\n`;

    const body = encodeURIComponent(bodyText);

    // Create the mailto link
    const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    // Simulate a brief loading state for UX, then redirect
    setTimeout(() => {
      thisForm.querySelector('.loading').classList.remove('d-block');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      // Open the user's email client
      window.location.href = mailtoLink;

      // Show success message and reset form
      thisForm.querySelector('.sent-message').innerHTML = "Opening your email client...";
      thisForm.querySelector('.sent-message').classList.add('d-block');

      setTimeout(() => {
        thisForm.querySelector('.sent-message').classList.remove('d-block');
        thisForm.reset();
      }, 5000);

    }, 800);
  }

  function displayError(thisForm, error, submitBtn, originalBtnText) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    if (submitBtn && originalBtnText) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
