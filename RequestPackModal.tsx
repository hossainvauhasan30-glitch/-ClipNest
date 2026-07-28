import React, { useState } from 'react';
import { addRequestToFirebase } from '../lib/firebase';
import { Send, X, CheckCircle2, Sparkles, Film } from 'lucide-react';

interface RequestPackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestPackModal: React.FC<RequestPackModalProps> = ({
  isOpen,
  onClose
}) => {
  const [dramaName, setDramaName] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dramaName.trim()) return;

    setSubmitting(true);
    await addRequestToFirebase({
      dramaName,
      requestedBy: requestedBy || 'Anonymous Editor',
      notes
    });

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDramaName('');
      setNotes('');
      setRequestedBy('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-xl flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Request a K-Drama Scene Pack
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Can't find a drama or episode? Request a 4K 60fps render below.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Request Submitted!</h3>
            <p className="text-xs text-slate-400">Our encoders will prepare and publish this scene pack soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                K-Drama Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Taxi Driver Season 2 or Death's Game"
                value={dramaName}
                onChange={(e) => setDramaName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Your Editor Handle / Name
              </label>
              <input
                type="text"
                placeholder="e.g. Alex_AE or Anonymous"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Specific Scenes or Quality Preference
              </label>
              <textarea
                placeholder="e.g. Episode 08 car chase scene in 4K 60FPS or raw S-Log3 flat profile"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting Request...' : 'Send Request to Encoders'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
