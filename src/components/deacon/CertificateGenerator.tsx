import React, { useRef } from 'react';
import { XMarkIcon, DocumentArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { Level } from '../../types/lms';
import { User, LevelAssignment } from '../../types/user';

interface CertificateGeneratorProps {
  level: Level;
  deacon: User;
  assignment: LevelAssignment;
  onClose: () => void;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ 
  level, 
  deacon, 
  assignment, 
  onClose 
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (certificateRef.current) {
      // In a real app, you would use a library like html2canvas or jsPDF
      // For now, we'll trigger the browser's print dialog
      window.print();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              <span>تحميل</span>
            </button>
            
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <PrinterIcon className="w-4 h-4" />
              <span>طباعة</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 font-cairo">شهادة إتمام المستوى</h2>
          </div>
        </div>

        {/* Certificate */}
        <div className="p-8">
          <div 
            ref={certificateRef}
            className="bg-white border-8 border-amber-400 rounded-3xl p-12 shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fed7aa 100%)',
              minHeight: '600px'
            }}
          >
            {/* Header with Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-6 space-x-reverse mb-6">
                <img 
                  src="/logo.jpg" 
                  alt="شعار المدرسة" 
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                />
                <div className="text-right">
                  <h1 className="text-3xl font-bold text-amber-900 font-cairo mb-2">
                    مدرسة الشمامسة
                  </h1>
                  <h2 className="text-xl text-amber-800 font-cairo">
                    القديس أثناسيوس الرسولي
                  </h2>
                </div>
              </div>
              
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mx-auto rounded-full"></div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-amber-900 font-cairo mb-4">
                شـهـادة إتـمـام
              </h2>
              <div className="text-2xl text-amber-800 font-cairo">
                {level.name}
              </div>
            </div>

            {/* Certificate Body */}
            <div className="text-center mb-12 space-y-6">
              <p className="text-xl text-gray-800 font-cairo leading-relaxed">
                تشهد مدرسة الشمامسة بأن
              </p>
              
              <div className="bg-white bg-opacity-50 rounded-2xl p-6 border-2 border-amber-300">
                <h3 className="text-3xl font-bold text-amber-900 font-cairo">
                  {deacon.firstName} {deacon.lastName}
                </h3>
              </div>
              
              <p className="text-xl text-gray-800 font-cairo leading-relaxed">
                قد أتم بنجاح جميع متطلبات
              </p>
              
              <div className="bg-amber-100 rounded-2xl p-4 border border-amber-300">
                <h4 className="text-2xl font-bold text-amber-900 font-cairo">
                  {level.name}
                </h4>
                <p className="text-amber-800 font-cairo mt-2">
                  {level.description}
                </p>
              </div>
              
              <p className="text-lg text-gray-800 font-cairo">
                بتقدير عام: <span className="font-bold text-amber-900">{assignment.progress}%</span>
              </p>
            </div>

            {/* Dates and Signatures */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="border-b-2 border-amber-400 pb-2 mb-2">
                  <p className="text-lg font-bold text-amber-900 font-cairo">
                    {formatDate(assignment.startDate)}
                  </p>
                </div>
                <p className="text-sm text-gray-700 font-cairo">تاريخ البداية</p>
              </div>
              
              <div className="text-center">
                <div className="border-b-2 border-amber-400 pb-2 mb-2">
                  <p className="text-lg font-bold text-amber-900 font-cairo">
                    {getCurrentDate()}
                  </p>
                </div>
                <p className="text-sm text-gray-700 font-cairo">تاريخ الإتمام</p>
              </div>
            </div>

            {/* Signature Section */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-b-2 border-gray-400 pb-2 mb-2 h-16"></div>
                <p className="text-sm text-gray-700 font-cairo">توقيع المدير</p>
              </div>
              
              <div className="text-center">
                <div className="border-b-2 border-gray-400 pb-2 mb-2 h-16"></div>
                <p className="text-sm text-gray-700 font-cairo">ختم المدرسة</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-amber-300">
              <p className="text-sm text-gray-600 font-cairo">
                صدرت هذه الشهادة في {getCurrentDate()}
              </p>
              <p className="text-xs text-gray-500 font-cairo mt-2">
                مدرسة الشمامسة - القديس أثناسيوس الرسولي
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;