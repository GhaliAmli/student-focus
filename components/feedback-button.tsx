'use client';

import { useState } from 'react';
import { MessageSquare, X, CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Feedback, FeedbackFormData } from '@/types/feedback';

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FeedbackFormData>>({});
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    message: '',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create feedback object
    const feedback: Feedback = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      timestamp: new Date(),
      status: 'pending',
    };

    // Save to localStorage
    const existingFeedback = localStorage.getItem('studentfocus_feedback');
    const feedbackList: Feedback[] = existingFeedback ? JSON.parse(existingFeedback) : [];
    feedbackList.push(feedback);
    localStorage.setItem('studentfocus_feedback', JSON.stringify(feedbackList));

    // Show success message
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
      setIsOpen(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <>
      {/* Feedback Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="fixed bottom-6 left-6 rounded-full shadow-lg z-40 h-12 px-4"
        data-tutorial="feedback"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Feedback
      </Button>

      {/* Feedback Modal */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send Feedback
            </DialogTitle>
            <DialogDescription>
              We'd love to hear your thoughts! Your feedback helps us improve StudentFocus.
            </DialogDescription>
          </DialogHeader>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="feedback-name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="feedback-name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="Your name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="feedback-email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="feedback-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="feedback-message">
                  Feedback <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="feedback-message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Tell us what you think..."
                  rows={5}
                  className={errors.message ? 'border-red-500' : ''}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {formData.message.length} characters (minimum 10)
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full rounded-xl">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your feedback has been submitted successfully. We appreciate your input!
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
