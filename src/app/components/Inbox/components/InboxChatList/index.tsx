'use client';

import React from 'react';
import { SearchOutlined, EditOutlined, DownOutlined, FilterOutlined } from '@ant-design/icons';
import { PanelRight } from 'lucide-react';
import styles from './InboxChatList.module.scss';

interface ChatData {
  id: number;
  name: string;
  message: string;
  time: string;
  email?: string;
}

interface InboxChatListProps {
  chatData: ChatData[];
  loading: boolean;
  error: string | null;
}

const InboxChatList: React.FC<InboxChatListProps> = ({ chatData, loading, error }) => {
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

  const SkeletonCircle = ({ size = '32px' }: { size?: string }) => (
    <div
      className={styles.skeletonCircle}
      style={{
        width: size,
        height: size,
      }}
    />
  );

  const getInitials = (name = 'U N') => {
    return name
      .split(' ')
      .map((word) => (word ? word[0] : ''))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles.chatList}>
      <div className={styles.chatListHeader}>
        <div className={styles.chatListTop}>
          <div className={styles.smallAvatar}>
            <PanelRight size={14} />
          </div>
          <span className={styles.chatListUser}>Michael Johnson</span>
          <button className={styles.editBtn}>
            <EditOutlined />
          </button>
        </div>

        <div className={styles.searchBar}>
          <SearchOutlined className={styles.searchIcon} />
          <input type="text" placeholder="Search Chat" className={styles.searchInput} />
          <FilterOutlined className={styles.filterIcon} />
        </div>

        <div className={styles.filterDropdown}>
          <button className={styles.filterButton}>
            Open <DownOutlined className={styles.dropdownIcon} />
          </button>
          <button className={styles.filterButton}>
            Newest <DownOutlined className={styles.dropdownIcon} />
          </button>
        </div>
      </div>

      <div className={styles.chatItems}>
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className={styles.chatItem}>
              <SkeletonCircle size="32px" />
              <div className={styles.chatContent}>
                <div className={styles.chatSkeletonTop}>
                  <SkeletonLine width="100px" height="10px" />
                  <SkeletonLine width="35px" height="8px" />
                </div>
                <SkeletonLine width="90%" height="8px" style={{ marginTop: '6px' }} />
              </div>
            </div>
          ))
        ) : error ? (
          <div style={{ padding: 16, color: '#ef4444', fontSize: '12px' }}>Error: {error}</div>
        ) : (
          chatData.map((chat) => (
            <div key={chat.id} className={styles.chatItem}>
              <div
                className={styles.chatAvatar}
                style={{
                  background: `hsl(${(chat.id % 12) * 30}, 70%, 60%)`,
                }}
              >
                {getInitials(chat.name)}
              </div>
              <div className={styles.chatContent}>
                <div className={styles.chatSkeletonTop}>
                  <div className={styles.chatName}>{chat.name}</div>
                  <div className={styles.chatTime}>{chat.time}</div>
                </div>
                <div className={styles.chatMessage}>{chat.message}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InboxChatList;