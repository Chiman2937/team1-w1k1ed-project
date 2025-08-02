'use client';

import { useState } from 'react';
import { Modal } from 'react-simplified-package';

export default function DashboardPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsProfileModalOpen(true)}>Edit Profile</button>
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setIsSettingsModalOpen(true)}>App Settings</button>

      {/* Profile Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <h4>User Profile</h4>
        <p>Manage your personal details here.</p>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)}>
        <h4>Application Settings</h4>
        <p>Configure your application preferences.</p>
      </Modal>
    </div>
  );
}
