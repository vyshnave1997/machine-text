'use client';

import React, { useState } from 'react';
import { DownOutlined, UserOutlined, PlusOutlined, MinusSquareOutlined } from '@ant-design/icons';
import styles from './InboxDetails.module.scss';

interface InboxDetailsProps {
  loading: boolean;
  dataType: string;
  itemCount: number;
}

const InboxDetails: React.FC<InboxDetailsProps> = ({ loading, dataType, itemCount }) => {
  const [chatDataExpanded, setChatDataExpanded] = useState(true);
  const [contactDataExpanded, setContactDataExpanded] = useState(true);
  const [contactLabelsExpanded, setContactLabelsExpanded] = useState(true);
  const [notesExpanded, setNotesExpanded] = useState(true);
  const [otherChatsExpanded, setOtherChatsExpanded] = useState(true);

  const SkeletonLine = ({
    width = '100%',
    height = '12px',
    style = {},
  }: {
    width?: string;
    height?: string;
    style?: React.CSSProperties;
  }) => (
    <div
      className={styles.skeletonLine}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );

  return (
    <div className={styles.detailsPanel}>
      <div className={styles.detailsHeader}>
        <span>Details</span>
        <MinusSquareOutlined className={styles.collapseIcon} />
      </div>

      {loading ? (
        <>
          <div className={styles.detailsSection}>
            <SkeletonLine width="100%" height="14px" style={{ marginBottom: '16px' }} />
            <SkeletonLine width="120px" height="10px" style={{ marginBottom: '8px' }} />
            <SkeletonLine width="100px" height="10px" />
          </div>
        </>
      ) : (
        <>
          {/* Chat Data Section */}
          <div className={styles.detailsSection}>
            <div 
              className={styles.sectionHeader}
              onClick={() => setChatDataExpanded(!chatDataExpanded)}
            >
              <span className={styles.sectionTitle}>Chat Data</span>
              <DownOutlined 
                className={styles.expandIcon}
                style={{ transform: chatDataExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </div>

            {chatDataExpanded && (
              <>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Assignee</span>
                  <div className={styles.detailValue}>
                    <UserOutlined className={styles.userIcon} />
                    <span>James West</span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Team</span>
                  <div className={styles.detailValue}>
                    <UserOutlined className={styles.userIcon} />
                    <span>Sales Team</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Contact Data Section */}
          <div className={styles.detailsSection}>
            <div 
              className={styles.sectionHeader}
              onClick={() => setContactDataExpanded(!contactDataExpanded)}
            >
              <span className={styles.sectionTitle}>Contact Data</span>
              <DownOutlined 
                className={styles.expandIcon}
                style={{ transform: contactDataExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </div>

            {contactDataExpanded && (
              <>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>First Name</span>
                  <span className={styles.detailValue}>Olivia</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Last Name</span>
                  <span className={styles.detailValue}>Mckinsey</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Phone number</span>
                  <span className={styles.detailValue}>+1 (312) 555-0134</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>olivia.Mckinsey@gmail.com</span>
                </div>

                <button className={styles.seeAllButton}>See all</button>
              </>
            )}
          </div>

          {/* Contact Labels Section */}
          <div className={styles.detailsSection}>
            <div 
              className={styles.sectionHeader}
              onClick={() => setContactLabelsExpanded(!contactLabelsExpanded)}
            >
              <span className={styles.sectionTitle}>Contact Labels</span>
              <DownOutlined 
                className={styles.expandIcon}
                style={{ transform: contactLabelsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </div>

            {contactLabelsExpanded && (
              <div className={styles.labelsList}>
                <div className={styles.label + ' ' + styles.labelBlue}>
                  <span>⚪</span>
                  <span>Closed Won</span>
                </div>
                <div className={styles.label + ' ' + styles.labelGreen}>
                  <span>⚪</span>
                  <span>Chicago</span>
                </div>
                <button className={styles.addLabelButton}>
                  <PlusOutlined />
                </button>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className={styles.detailsSection}>
            <div 
              className={styles.sectionHeader}
              onClick={() => setNotesExpanded(!notesExpanded)}
            >
              <span className={styles.sectionTitle}>Notes</span>
              <DownOutlined 
                className={styles.expandIcon}
                style={{ transform: notesExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </div>

            {notesExpanded && (
              <div className={styles.notesSection}>
                <div className={styles.noteCard}>Add a note</div>
                <div className={styles.noteCard}>Strong potential for future upgrades</div>
              </div>
            )}
          </div>

          {/* Other Chats Section */}
          <div className={styles.detailsSection}>
            <div 
              className={styles.sectionHeader}
              onClick={() => setOtherChatsExpanded(!otherChatsExpanded)}
            >
              <span className={styles.sectionTitle}>Other Chats</span>
              <DownOutlined 
                className={styles.expandIcon}
                style={{ transform: otherChatsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              />
            </div>

            {otherChatsExpanded && (
              <div className={styles.chatItem}>
                <div className={styles.chatItemLeft}>
                  <div className={styles.chatIcon}>F</div>
                  <span className={styles.chatName}>Fit4Life</span>
                </div>
                <span className={styles.chatDate}>08/08/25</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InboxDetails;