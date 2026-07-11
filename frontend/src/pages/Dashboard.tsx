import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  PlusCircle,
  History
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ResumeUpload from '../components/ResumeUpload';
import ResumeResults from '../components/ResumeResults';
import ResumeBuilder from './ResumeBuilder'; // Assuming you saved the builder here
import Navbar from '../components/Navbar'; // The responsive navbar from earlier

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'builder'>('analysis');

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data.data);
  };

  const handleNewUpload = () => {
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 1. Integrated Responsive Navbar */}
      <Navbar 
        user={user} 
        handleLogout={logout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'analysis' ? (
            /* --- ANALYSIS VIEW --- */
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Welcome Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Hey, {user?.name?.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-slate-500 font-medium mt-1">
                    {analysisData 
                      ? "We've finished scanning your profile." 
                      : "Ready to see how your resume performs?"}
                  </p>
                </div>
                
                {analysisData && (
                   <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNewUpload}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <History size={18} /> Re-upload
                  </motion.button>
                )}
              </div>

              {/* Quick Stats Grid (Visible after analysis) */}
              

              {!analysisData ? (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-[2.5rem] p-2 shadow-xl shadow-blue-900/5 border border-slate-100">
                      <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border-2 border-dashed border-slate-200">
                         <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar Info */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-[2rem] text-white shadow-lg">
                      <Sparkles className="mb-4 opacity-80" />
                      <h3 className="font-bold text-lg mb-2">AI Optimization</h3>
                      <p className="text-indigo-100 text-sm leading-relaxed">
                        Our AI compares your resume against 50,000+ job descriptions to give you real-time feedback.
                      </p>
                    </div>
                    <div onClick={() => setActiveTab('builder')} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-blue-400 transition-all group">
                      <PlusCircle className="mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-slate-900">Need a new resume?</h3>
                      <p className="text-slate-500 text-sm mt-1">Try our builder with professional templates.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <ResumeResults analysis={analysisData} />
              )}
            </motion.div>
          ) : (
            /* --- BUILDER VIEW --- */
            <motion.div
              key="builder"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ResumeBuilder />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;