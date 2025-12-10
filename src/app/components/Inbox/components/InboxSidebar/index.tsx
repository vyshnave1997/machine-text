'use client';

import React, { useState } from 'react';
import { UserOutlined, TeamOutlined, DownOutlined } from '@ant-design/icons';
import styles from './InboxSidebar.module.scss';

interface InboxSidebarProps {
  chatCount: number;
}

const InboxSidebar: React.FC<InboxSidebarProps> = ({ chatCount }) => {
  const [teamsExpanded, setTeamsExpanded] = useState(true);
  const [usersExpanded, setUsersExpanded] = useState(true);
  const [channelsExpanded, setChannelsExpanded] = useState(true);

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Inbox</div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemContent}>
            <UserOutlined className={styles.menuIcon} />
            <span>My Inbox</span>
          </div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemContent}>
            <TeamOutlined className={styles.menuIcon} />
            <span>All</span>
          </div>
          <span className={styles.badge}>28</span>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemContent}>
            <UserOutlined className={styles.menuIcon} />
            <span>Unassigned</span>
          </div>
          <span className={styles.badge}>5</span>
        </div>
      </div>

      <div className={styles.section}>
        <div 
          className={styles.sectionTitle} 
          onClick={() => setTeamsExpanded(!teamsExpanded)}
          style={{ cursor: 'pointer' }}
        >
          <span>Teams</span>
          <DownOutlined 
            className={styles.expandIcon} 
            style={{ transform: teamsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          />
        </div>

        {teamsExpanded && (
          <>
            <div className={styles.menuItem}>
              <div className={styles.menuItemContent}>
                <div className={`${styles.teamDot} ${styles.teamDotGray}`}></div>
                <span>Sales</span>
              </div>
              <span className={styles.badge}>7</span>
            </div>

            <div className={styles.menuItem}>
              <div className={styles.menuItemContent}>
                <div className={`${styles.teamDot} ${styles.teamDotGray}`}></div>
                <span>Customer Support</span>
              </div>
              <span className={styles.badge}>16</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.section}>
        <div 
          className={styles.sectionTitle}
          onClick={() => setUsersExpanded(!usersExpanded)}
          style={{ cursor: 'pointer' }}
        >
          <span>Users</span>
          <DownOutlined 
            className={styles.expandIcon}
            style={{ transform: usersExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          />
        </div>
      </div>

      <div className={styles.section} style={{ marginTop: 'auto' }}>
        <div 
          className={styles.sectionTitle}
          onClick={() => setChannelsExpanded(!channelsExpanded)}
          style={{ cursor: 'pointer' }}
        >
          <span>Channels</span>
          <DownOutlined 
            className={styles.expandIcon}
            style={{ transform: channelsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          />
        </div>

        {channelsExpanded && (
          <div className={styles.menuItem}>
            <div className={styles.menuItemContent}>
              <div className={`${styles.teamDot} ${styles.teamDotGreen}`}></div>
              <span>FitLife</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxSidebar;