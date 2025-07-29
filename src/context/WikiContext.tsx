'use client';
import { GetProfilePingResponse } from '@/api/profile/getProfilePingAPI';
import { PatchProfilePayload } from '@/api/profile/patchProfileAPI';
import { createContext, useContext, useState } from 'react';

interface WikiProfileContextType {
  wikiProfile: PatchProfilePayload | null;
  setWikiProfile: React.Dispatch<React.SetStateAction<PatchProfilePayload | null>>;
  editingInfo: GetProfilePingResponse | null;
  setEditingInfo: React.Dispatch<React.SetStateAction<GetProfilePingResponse | null>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  tempProfileImageFile: File | null;
  setTempProfileImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const wikiContext = createContext<WikiProfileContextType | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const WikiProvider = ({ children }: ProviderProps) => {
  // getProfileAPI 호출 결과
  const [wikiProfile, setWikiProfile] = useState<PatchProfilePayload | null>(null);
  // getProfilePingAPI 호출 결과 (접속한 페이지가 누군가에 의해 수정중인지?)
  const [editingInfo, setEditingInfo] = useState<GetProfilePingResponse | null>(null);
  // 내가 퀴즈를 맞추면 수정모드로 진입
  const [isEditing, setIsEditing] = useState(false);

  const [tempProfileImageFile, setTempProfileImageFile] = useState<File | null>(null);

  return (
    <wikiContext.Provider
      value={{
        wikiProfile,
        setWikiProfile,
        editingInfo,
        setEditingInfo,
        isEditing,
        setIsEditing,
        tempProfileImageFile,
        setTempProfileImageFile,
      }}
    >
      {children}
    </wikiContext.Provider>
  );
};

export const useWikiContext = (): WikiProfileContextType => {
  const context = useContext(wikiContext);
  if (context === null) {
    throw new Error('useWikiProfile must be used within a WikiProfileProvider');
  }
  return context;
};
