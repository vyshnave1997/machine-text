'use client';

import React, { useEffect, useState } from 'react';
import InboxNavbar from './components/InboxNavbar';
import InboxSidebar from './components/InboxSidebar';
import InboxChatList from './components/InboxChatList';
import InboxMessages from './components/InboxMessages';
import InboxDetails from './components/InboxDetails';
import styles from './inbox.module.scss';

interface InboxProps {
  selectedCategory?: string;
  showSkeleton?: boolean;
  apiData?: {
    type: string;
    data: any;
  } | null;
  loading?: boolean;
}

type ApiState = { type: string; data: any[] } | null;


const API_URLS = {
  messages: process.env.NEXT_PUBLIC_MESSAGES_API || 'https://jsonplaceholder.typicode.com/comments',
  users: process.env.NEXT_PUBLIC_USERS_API || 'https://dummyjson.com/users',
  groups: process.env.NEXT_PUBLIC_GROUPS_API || 'https://jsonplaceholder.typicode.com/albums',
  posts: process.env.NEXT_PUBLIC_POSTS_API || 'https://jsonplaceholder.typicode.com/posts',
  connections: process.env.NEXT_PUBLIC_CONNECTIONS_API || 'https://reqres.in/api/users?page=1',
};

const Inbox: React.FC<InboxProps> = ({ 
  selectedCategory, 
  showSkeleton = false, 
  apiData: _apiDataProp, 
  loading: _loadingProp 
}) => {
  const [selectedType, setSelectedType] = useState<string>(selectedCategory || 'messages');
  const [apiData, setApiData] = useState<ApiState>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForType = async (type: string) => {
    setLoading(true);
    setError(null);

    try {
      switch (type) {
        case 'messages': {
          const res = await fetch(API_URLS.messages);
          if (!res.ok) throw new Error('Failed to load messages');
          const json = await res.json();
          setApiData({ type, data: json });
          break;
        }

        case 'contacts':
        case 'team': {
          const res = await fetch(API_URLS.users);
          if (!res.ok) throw new Error('Failed to load users');
          const json = await res.json();
          const users = Array.isArray(json.users) ? json.users : [];
          setApiData({ type, data: users });
          break;
        }

        case 'groups': {
          const res = await fetch(API_URLS.groups);
          if (!res.ok) throw new Error('Failed to load groups');
          const json = await res.json();
          setApiData({ type, data: json });
          break;
        }

        case 'favorites': {
          const res = await fetch(API_URLS.posts);
          if (!res.ok) throw new Error('Failed to load favorites');
          const json = await res.json();
          setApiData({ type, data: json });
          break;
        }

        case 'connections': {
          const res = await fetch(API_URLS.connections);
          if (!res.ok) throw new Error('Failed to load connections');
          const json = await res.json();
          const users = Array.isArray(json.data) ? json.data : [];
          setApiData({ type, data: users });
          break;
        }

        default: {
          setApiData({ type, data: [] });
          break;
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Unknown error');
      setApiData({ type, data: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForType(selectedType);
  }, [selectedType]);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== selectedType) {
      setSelectedType(selectedCategory);
    }
  }, [selectedCategory, selectedType]);

  // Format chat data based on type
  function formatChatData(currentApiData: ApiState) {
    if (!currentApiData || !currentApiData.data) return [];

    switch (currentApiData.type) {
      case 'messages':
        return currentApiData.data.map((item: any) => ({
          id: item.id,
          name: (item.email && item.email.split('@')[0]) || item.name || `User ${item.id}`,
          message: (item.body && item.body.substring(0, 50) + '...') || 'No message',
          email: item.email,
          time: '2m ago',
        }));

      case 'contacts':
      case 'team':
        return currentApiData.data.map((item: any) => ({
          id: item.id,
          name: item.name || `${item.firstName ?? item.first_name ?? ''} ${item.lastName ?? item.last_name ?? ''}`.trim() || `User ${item.id}`,
          message: item.email || item.company?.name || item.username || 'No message',
          email: item.email,
          time: 'Active',
        }));

      case 'groups':
        return currentApiData.data.map((item: any) => ({
          id: item.id,
          name: item.title || item.name || `Group ${item.id}`,
          message: `Group with ${Math.floor(Math.random() * 20) + 5} members`,
          time: 'Updated',
        }));

      case 'connections':
        return currentApiData.data.map((item: any) => ({
          id: item.id,
          name: `${item.first_name ?? item.firstName ?? ''} ${item.last_name ?? item.lastName ?? ''}`.trim() || `User ${item.id}`,
          message: item.email || item.username || 'No message',
          email: item.email,
          time: 'Connected',
        }));

      case 'favorites':
        return currentApiData.data.map((item: any) => ({
          id: item.id,
          name: `Post ${item.id}`,
          message: (item.title || item.body || '').toString().substring(0, 50) + '...',
          time: 'Starred',
        }));

      default:
        return [];
    }
  }

  const effectiveApiData = _apiDataProp ?? apiData;
  const effectiveLoading = showSkeleton || (_loadingProp ?? loading);
  const chatData = effectiveApiData ? formatChatData(effectiveApiData) : [];

  return (
    <div className={styles.container}>
      <InboxNavbar 
        selectedType={selectedType} 
        onTypeChange={setSelectedType} 
      />

      <div className={styles.mainContent}>
        <InboxSidebar chatCount={chatData.length} />
        
        <InboxChatList 
          chatData={chatData} 
          loading={effectiveLoading} 
          error={error} 
        />
        
        <InboxMessages 
          chatData={chatData} 
          loading={effectiveLoading} 
          dataType={effectiveApiData?.type || ''} 
        />
        
        <InboxDetails 
          loading={effectiveLoading || !effectiveApiData} 
          dataType={effectiveApiData?.type || ''} 
          itemCount={chatData.length} 
        />
      </div>
    </div>
  );
};

export default Inbox;