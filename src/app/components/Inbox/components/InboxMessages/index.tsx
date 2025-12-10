'use client';

import React from 'react';
import { MoreOutlined, MoonOutlined, CameraOutlined, PictureOutlined, FileOutlined, PaperClipOutlined, SmileOutlined, ThunderboltOutlined, AudioOutlined } from '@ant-design/icons';
import styles from './InboxMessages.module.scss';

interface ChatData {
  id: number;
  name: string;
  message: string;
  time: string;
}

interface InboxMessagesProps {
  chatData: ChatData[];
  loading: boolean;
  dataType: string;
}

const InboxMessages: React.FC<InboxMessagesProps> = ({ chatData, loading, dataType }) => {
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

  
  const sampleMessages = [
    { sender: 'user', text: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?", time: '23:08' },
    { sender: 'ai', text: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?", time: '23:08' },
    { sender: 'user', text: "Yes, it's olivia.Mckinsey@gmail.com", time: '23:16' },
    { sender: 'ai', text: "Thanks! Looks like your reset wasn't completed. I've sent a new link - please check your inbox.", time: '23:16' },
    { sender: 'user', text: "I see it, resetting now...", time: '23:17' },
    { sender: 'user', text: "Done! I'm logged in. Thanks!", time: '23:20' },
    { sender: 'ai', text: "Perfect 🎉 Your plan is ready under \"My Programs\". Since you're starting out, I suggest our Premium Guide - it boosts results and is 20% off here 👉 www.Fit4Life.com/Premium", time: '23:20' },
    { sender: 'user', text: "Oh my god 😊 I'll try it ASAP, thank you so much!", time: '23:23' },
  ];

  return (
    <div className={styles.messagesPanel}>
      <div className={styles.messagesHeader}>
        <div className={styles.messageHeaderLeft}>
          <span className={styles.messageHeaderName}>Olivia Mckinsey</span>
        </div>
        <div className={styles.messageHeaderRight}>
          <button className={styles.iconButton}>
            <MoreOutlined />
          </button>
          <button className={styles.iconButton}>
            <MoonOutlined />
          </button>
          <button className={styles.iconButton}>
            <CameraOutlined />
          </button>
        </div>
      </div>

      <div className={styles.messagesArea}>
        <div className={styles.dateStamp}>
          <span className={styles.dateText}>28 August 2025</span>
        </div>

        {loading ? (
          <div className={styles.messageGroup}>
            <div className={styles.skeletonMessageLeft}>
              <SkeletonLine width="60px" height="8px" style={{ marginBottom: '6px' }} />
              <SkeletonLine width="320px" height="60px" />
            </div>

            <div className={styles.skeletonMessageRight}>
              <SkeletonLine width="60px" height="8px" style={{ marginBottom: '6px', marginLeft: 'auto' }} />
              <SkeletonLine width="250px" height="50px" style={{ marginLeft: 'auto' }} />
            </div>

            <div className={styles.skeletonMessageLeft}>
              <SkeletonLine width="60px" height="8px" style={{ marginBottom: '6px' }} />
              <SkeletonLine width="280px" height="50px" />
            </div>
          </div>
        ) : (
          <div className={styles.messageGroup}>
            {sampleMessages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.messageWrapper} ${
                  msg.sender === 'user' ? styles.messageWrapperLeft : styles.messageWrapperRight
                }`}
              >
                <div className={styles.messageTimestamp}>{msg.time}</div>
                <div
                  className={msg.sender === 'user' ? styles.messageBubbleLeft : styles.messageBubbleRight}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <button className={styles.inputIconButton}>
            <PictureOutlined />
          </button>
          <button className={styles.inputIconButton}>
            <FileOutlined />
          </button>
          <button className={styles.inputIconButton}>
            <PaperClipOutlined />
          </button>
          <button className={styles.inputIconButton}>
            <SmileOutlined />
          </button>
          <input type="text" placeholder="Type something..." className={styles.messageInput} />
          <button className={styles.inputIconButton}>
            ↩
          </button>
        </div>
        <button className={styles.aiButton}>
          <ThunderboltOutlined />
        </button>
        <button className={styles.micButton}>
          <AudioOutlined />
        </button>
      </div>
    </div>
  );
};

export default InboxMessages;