
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface AdminSaveButtonProps {
  onSave: () => void;
}

const AdminSaveButton = ({ onSave }: AdminSaveButtonProps) => {
  return (
    <div className="flex justify-end mt-6">
      <Button onClick={onSave} className="btn-anime">
        <Save className="mr-2 h-4 w-4" />
        Save Changes to Database
      </Button>
    </div>
  );
};

export default AdminSaveButton;
