import React from 'react';

import { CreateEmailPayload } from '../CreateEditEmail.slice';

export const EmailTemplate = ({ htmlValue }: { htmlValue: string }) => (
  <div
    className="review-item-info"
    style={{
      flex: 1,
      width: '100%',
      minHeight: '500px',
      maxWidth: '640px',
      overflow: 'hidden',
      margin: 'auto',
    }}
    dangerouslySetInnerHTML={{ __html: htmlValue }}
  />
);

// For email templates, need to be inline style
const EmailTemplateContent = ({
  formFieldValue,
}: {
  formFieldValue: CreateEmailPayload;
}) => (
  <div
    className="email-template-content"
    style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '500px',
      maxWidth: '640px',
      overflow: 'hidden',
      margin: 'auto',
      padding: '0 24px',
    }}
  >
    <EmailTemplate htmlValue={formFieldValue.html} />
  </div>
);

export default EmailTemplateContent;
