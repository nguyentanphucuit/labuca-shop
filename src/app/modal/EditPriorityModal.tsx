"use client";
import { useEffect, useState } from "react";

interface EditPriorityModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: { publicId: string; priority: number } | null;
  onUpdate: (publicId: string, priority: number) => void;
}

const EditPriorityModal = ({ isOpen, onClose, banner, onUpdate }: EditPriorityModalProps) => {
  const [priority, setPriority] = useState(banner?.priority ?? 0);

  useEffect(() => {
    if (banner) {
      setPriority(banner.priority);
    }
  }, [banner]);

  const handleSave = () => {
    if (banner) {
      onUpdate(banner.publicId, priority);
      onClose();
    }
  };

  if (!isOpen || !banner) return null;

  const displayName = banner.publicId.split("/").pop() || banner.publicId;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Chỉnh sửa ưu tiên Banner</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Tên Banner:</label>
              <p className="text-sm text-gray-500 font-mono bg-gray-50 p-2 rounded mt-1">
                {displayName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ưu tiên (số càng cao, hiển thị càng trước):
              </label>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Giá trị từ 0-100. Banner có ưu tiên cao nhất sẽ hiển thị đầu tiên.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPriorityModal;
