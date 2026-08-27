import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Conversation, ChatState } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

interface ChatStore extends ChatState {
  setCurrentConversation: (id: string) => void;
  setSelectedModel: (model: string) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  addMessage: (message: Message) => void;
  createConversation: () => void;
  deleteConversation: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
  clearCurrentConversation: () => void;
  getMessages: () => Message[];
}

export const useChatStore = create<ChatStore>(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      selectedModel: 'gpt-4',
      isLoading: false,
      sidebarOpen: true,
      darkMode: true,

      setCurrentConversation: (id: string) => set({ currentConversationId: id }),

      setSelectedModel: (model: string) => set({ selectedModel: model }),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      addMessage: (message: Message) => {
        set((state) => {
          const conversations = state.conversations.map((conv) => {
            if (conv.id === state.currentConversationId) {
              return {
                ...conv,
                messages: [...conv.messages, message],
                updatedAt: new Date(),
              };
            }
            return conv;
          });
          return { conversations };
        });
      },

      createConversation: () => {
        const newConversation: Conversation = {
          id: generateId(),
          title: 'New Conversation',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          conversations: [newConversation, ...state.conversations],
          currentConversationId: newConversation.id,
        }));
      },

      deleteConversation: (id: string) => {
        set((state) => {
          const conversations = state.conversations.filter((conv) => conv.id !== id);
          const currentId =
            state.currentConversationId === id
              ? conversations[0]?.id || null
              : state.currentConversationId;
          return {
            conversations,
            currentConversationId: currentId,
          };
        });
      },

      updateConversationTitle: (id: string, title: string) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === id ? { ...conv, title } : conv
          ),
        }));
      },

      clearCurrentConversation: () => {
        set({ currentConversationId: null });
      },

      getMessages: () => {
        const state = get();
        if (!state.currentConversationId) return [];
        const conv = state.conversations.find(
          (c) => c.id === state.currentConversationId
        );
        return conv?.messages || [];
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);
