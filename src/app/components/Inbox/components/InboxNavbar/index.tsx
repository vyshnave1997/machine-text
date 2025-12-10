'use client';

import React from 'react';
import { Inbox, Users, Bot, Workflow, Megaphone, Settings } from 'lucide-react';
import styles from './InboxNavbar.module.scss';

interface InboxNavbarProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const InboxNavbar: React.FC<InboxNavbarProps> = ({ selectedType, onTypeChange }) => {
  const navItemClass = (type: string) =>
    `${styles.navItem} ${selectedType === type ? styles.navItemActive : ''}`;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>BOXpad</div>

      <div className={styles.nav}>
        <div className={navItemClass('inbox')} onClick={() => onTypeChange('inbox')}>
          <Inbox size={16} className={styles.navIcon} />
          <span>Inbox</span>
          {selectedType === 'inbox' && <div className={styles.activeIndicator}></div>}
        </div>

        <div className={navItemClass('contacts')} onClick={() => onTypeChange('contacts')}>
          <Users size={16} className={styles.navIcon} />
          <span>Contacts</span>
          {selectedType === 'contacts' && <div className={styles.activeIndicator}></div>}
        </div>

        <div className={navItemClass('team')} onClick={() => onTypeChange('team')}>
          <Bot size={16} className={styles.navIcon} />
          <span>AI Employees</span>
          {selectedType === 'team' && <div className={styles.activeIndicator}></div>}
        </div>

        <div className={navItemClass('workflows')} onClick={() => onTypeChange('workflows')}>
          <Workflow size={16} className={styles.navIcon} />
          <span>Workflows</span>
          {selectedType === 'workflows' && <div className={styles.activeIndicator}></div>}
        </div>

        <div className={navItemClass('campaigns')} onClick={() => onTypeChange('campaigns')}>
          <Megaphone size={16} className={styles.navIcon} />
          <span>Campaigns</span>
          {selectedType === 'campaigns' && <div className={styles.activeIndicator}></div>}
        </div>
      </div>

      <div className={styles.userSection}>
        <Settings size={18} className={styles.settingsIcon} />
        <div className={styles.avatar}>MJ</div>
        <span className={styles.userName}>Michael Johnson</span>
      </div>
    </div>
  );
};

export default InboxNavbar;