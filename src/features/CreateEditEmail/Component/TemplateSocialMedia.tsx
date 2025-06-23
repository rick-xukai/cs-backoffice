import React from 'react';

import {
  FacebookIconLink,
  InstagramIconLink,
  WebsiteIconLink,
} from '../../../constants/General';
import { CreateEmailPayload } from '../CreateEditEmail.slice';

// For email templates, need to be inline style
const TemplateSocialMedia = ({
  formFieldValue,
  userName,
}: {
  formFieldValue: CreateEmailPayload;
  userName: string;
}) => (
  <div
    className="social-media-item"
    style={{
      paddingBottom: '24px',
      width: '100%',
      maxWidth: '640px',
      marginTop: '40px',
      margin: 'auto',
    }}
  >
    <div
      className="item-info"
      style={{
        padding: '16px 0',
        background: '#EEEEF3',
      }}
    >
      <div
        className="info-media"
        style={{
          marginBottom:
            ((formFieldValue.facebookLink ||
              formFieldValue.instagramLink ||
              formFieldValue.websiteLink) &&
              24) ||
            0,
          textAlign: 'center',
        }}
      >
        {formFieldValue.facebookLink && (
          <button
            type="button"
            style={{
              border: 'none',
              width: '30px',
              height: '30px',
              padding: '0px',
              marginRight: '10px',
              background: 'transparent !important',
            }}
          >
            <a
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
              href={formFieldValue.facebookLink}
              target="_blank"
            >
              <img
                style={{ width: '30px', borderRadius: '50%' }}
                src={FacebookIconLink}
                alt=""
              />
            </a>
          </button>
        )}
        {formFieldValue.instagramLink && (
          <button
            type="button"
            style={{
              border: 'none',
              width: '30px',
              height: '30px',
              padding: '0px',
              marginRight: '10px',
              background: 'transparent !important',
            }}
          >
            <a
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
              href={formFieldValue.instagramLink}
              target="_blank"
            >
              <img
                style={{ width: '30px', borderRadius: '50%' }}
                src={InstagramIconLink}
                alt=""
              />
            </a>
          </button>
        )}
        {formFieldValue.websiteLink && (
          <button
            type="button"
            style={{
              border: 'none',
              width: '30px',
              height: '30px',
              padding: '0px',
              marginRight: '10px',
              background: 'transparent !important',
            }}
          >
            <a
              style={{ display: 'inline-block', width: '100%', height: '100%' }}
              href={formFieldValue.websiteLink}
              target="_blank"
            >
              <img
                style={{ width: '30px', borderRadius: '50%' }}
                src={WebsiteIconLink}
                alt=""
              />
            </a>
          </button>
        )}
      </div>
      <div className="info-email">
        <p
          style={{
            fontWeight: 500,
            textAlign: 'center',
            fontSize: '15px',
            color: '#717179',
          }}
        >
          {userName}
        </p>
        {formFieldValue.organiserEmail && (
          <p
            style={{
              fontWeight: 500,
              textAlign: 'center',
              fontSize: '15px',
              color: '#717179',
            }}
          >
            {formFieldValue.organiserEmail}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default TemplateSocialMedia;
