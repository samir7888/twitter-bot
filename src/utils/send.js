import { Resend } from 'resend';

// Initialize with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendEmail({ tweet }) {
  const safeTweet = String(tweet || '');
  const escapedTweet = escapeHtml(safeTweet).replace(/\n/g, '<br />');

  const content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <p style="margin: 0 0 12px; font-size: 16px;">Here is your tweet content:</p>
      <div style="background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 12px; padding: 16px; white-space: pre-wrap; word-break: break-word; line-height: 1.5;">
        ${escapedTweet || 'No tweet content provided.'}
      </div>
    </div>
  `;

  const text = `Here is your tweet content:\n\n${safeTweet}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'X-Automation <onboarding@resend.dev>',
      to: ['basnetsameer78@gmail.com'],
      subject: 'Here is your tweet content!',
      html: content,
      text,
    });

    if (error) {
      return console.error('Error sending email:', error.message);
    }

    console.log('Email sent successfully! ID:', data.id);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

