import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq">
      <h1 className="faq__title">FAQ</h1>
      <ul className="faq__list">
        <li>
          <strong>Q:</strong> What should I do if I encounter an issue?
          <br />
          <strong>A:</strong> Report the issue to the moderators for assistance.
        </li>
        <li>
          <strong>Q:</strong> Can I share personal information in the chat?
          <br />
          <strong>A:</strong> No, for your safety, do not share personal information.
        </li>
        <li>
          <strong>Q:</strong> Is spamming allowed in the chat?
          <br />
          <strong>A:</strong> No, spamming or flooding the chat with excessive messages is
          prohibited.
        </li>
        <li>
          <strong>Q:</strong> How should I behave in the chat?
          <br />
          <strong>A:</strong> Be respectful to others, use appropriate language, and avoid offensive
          content.
        </li>
        <li>
          <strong>Q:</strong> Can I stay off-topic in chat rooms?
          <br />
          <strong>A:</strong> No, please stay on topic to maintain a productive environment.
        </li>
      </ul>
    </div>
  );
};

export default FAQ;
