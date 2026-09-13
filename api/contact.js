function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

module.exports = async function contactHandler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    console.error('Web3Forms contact delivery is not configured.');
    return response.status(503).json({ ok: false, error: 'Email delivery is temporarily unavailable.' });
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {};

  // Bots commonly fill fields hidden from people. Return success without sending.
  if (clean(body.website, 200)) {
    return response.status(200).json({ ok: true });
  }

  const fullName = clean(body.fullName, 120);
  const organisation = clean(body.organisation, 160);
  const email = clean(body.email, 254).toLowerCase();
  const enquiryType = clean(body.enquiryType, 80);
  const message = clean(body.message, 5000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fullName || !emailPattern.test(email) || !enquiryType || message.length < 10) {
    return response.status(400).json({
      ok: false,
      error: 'Please provide your name, a valid email address, an enquiry type and a message.'
    });
  }

  try {
    const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `Website enquiry: ${enquiryType}`,
        from_name: 'Diplomatic Informer Trade & Investment Website',
        name: fullName,
        organisation: organisation || 'Not provided',
        email,
        enquiry_type: enquiryType,
        message
      })
    });

    const providerResult = await web3FormsResponse.json().catch(() => ({}));
    if (!web3FormsResponse.ok || !providerResult.success) {
      console.error('Web3Forms rejected contact submission:', web3FormsResponse.status, providerResult.message || 'Unknown error');
      return response.status(502).json({ ok: false, error: 'We could not send your enquiry. Please try again.' });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form delivery failed:', error);
    return response.status(502).json({ ok: false, error: 'We could not send your enquiry. Please try again.' });
  }
};
