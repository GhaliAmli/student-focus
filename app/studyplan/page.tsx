'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Sparkles, Plus, Trash2, Calendar as CalendarIcon, Clock, Target, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Exam } from '@/types';

export default function StudyPlanPage() {
  const { studyPlans, addStudyPlan } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  
  const [exams, setExams] = useState<Exam[]>([]);
  const [formData, setFormData] = useState({
    subject: '',
    examDate: new Date(),
    topics: '',
    importance: 'medium' as 'low' | 'medium' | 'high',
  });

  const getDefaultEndDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  };

  const [planSettings, setPlanSettings] = useState({
    hoursPerDay: 3,
    startDate: new Date(),
    endDate: getDefaultEndDate(),
    goals: '',
  });

  const addExam = () => {
    if (!formData.subject) return;

    const topicsArray = formData.topics
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    setExams([
      ...exams,
      {
        id: Date.now().toString(),
        subject: formData.subject,
        date: formData.examDate,
        topics: topicsArray,
        importance: formData.importance,
      },
    ]);

    setFormData({
      subject: '',
      examDate: new Date(),
      topics: '',
      importance: 'medium',
    });
  };

  const removeExam = (id: string) => {
    setExams(exams.filter((e) => e.id !== id));
  };

  const generateStudyPlan = async () => {
    if (exams.length === 0) return;

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockPlan = `# Your Personalized Study Plan

## Overview
Based on your ${exams.length} upcoming exam(s) and ${planSettings.hoursPerDay} hours available per day, here's your optimized study schedule.

## Week 1: Foundation Building
**Monday - Wednesday**
- ${exams[0]?.subject}: Review fundamental concepts (2 hours/day)
- Practice problems from ${exams[0]?.topics[0] || 'core topics'} (1 hour/day)

**Thursday - Friday**
- ${exams[1]?.subject || exams[0]?.subject}: Deep dive into ${exams[1]?.topics[0] || exams[0]?.topics[1] || 'advanced topics'} (2 hours/day)
- Create summary notes (1 hour/day)

**Weekend**
- Review all topics covered this week
- Complete practice tests
- Identify weak areas

## Week 2: Practice & Reinforcement
**Monday - Wednesday**
${exams.map((exam, i) => `- ${exam.subject}: Focus on ${exam.topics.slice(0, 2).join(' and ')} (${Math.floor(planSettings.hoursPerDay / exams.length)} hours/day)`).join('\n')}

**Thursday - Friday**
- Mixed practice sessions
- Timed mock exams
- Review mistakes and gaps

**Weekend**
- Final review sessions
- Rest and mental preparation

## Week 3: Exam Week
**Leading up to exams:**
${exams.map((exam) => `- ${format(exam.date, 'MMM dd')}: ${exam.subject} exam - Light review only, focus on rest`).join('\n')}

## Study Tips
✓ Take 10-minute breaks every hour
✓ Use active recall and spaced repetition
✓ Stay hydrated and get 7-8 hours of sleep
✓ Review notes before bed for better retention
✓ Practice under exam conditions

## Daily Schedule Template
- Morning (2 hours): Focus on most difficult subjects
- Afternoon (1 hour): Practice problems and review
- Evening: Light review and preparation for next day

---
*This plan is generated based on your inputs. Adjust as needed based on your progress and comfort level.*`;

      setGeneratedPlan(mockPlan);
      
      // Save to store
      addStudyPlan({
        id: Date.now().toString(),
        title: `Study Plan - ${format(new Date(), 'MMM yyyy')}`,
        description: `Plan for ${exams.length} exam(s)`,
        startDate: planSettings.startDate,
        endDate: planSettings.endDate,
        goals: planSettings.goals.split('\n').filter((g) => g.trim()),
        hoursPerDay: planSettings.hoursPerDay,
        exams: exams,
        generatedPlan: mockPlan,
      });

      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Study Planner
        </h1>
        <p className="text-muted-foreground">
          Generate a personalized study plan based on your exams and schedule
        </p>
      </div>

      {!generatedPlan ? (
        <>
          {/* Add Exams Section */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>1. Add Your Exams</CardTitle>
              <CardDescription>List all upcoming exams you need to prepare for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Mathematics"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="importance">Importance</Label>
                  <select
                    id="importance"
                    value={formData.importance}
                    onChange={(e) => setFormData({ ...formData, importance: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topics">Topics (comma-separated)</Label>
                <Input
                  id="topics"
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  placeholder="e.g., Calculus, Linear Algebra, Statistics"
                />
              </div>

              <div className="space-y-2">
                <Label>Exam Date</Label>
                <Calendar
                  mode="single"
                  selected={formData.examDate}
                  onSelect={(date) => date && setFormData({ ...formData, examDate: date })}
                  className="rounded-xl border w-fit"
                />
              </div>

              <Button onClick={addExam} className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                Add Exam
              </Button>

              {/* Exams List */}
              {exams.length > 0 && (
                <div className="space-y-2 mt-6">
                  <h4 className="font-medium">Your Exams ({exams.length})</h4>
                  {exams.map((exam, index) => (
                    <div
                      key={`exam-${index}-${exam.id}`}
                      className="flex items-start justify-between p-3 rounded-xl border bg-card"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{exam.subject}</p>
                          <Badge
                            variant={exam.importance === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {exam.importance}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Topics: {exam.topics.join(', ')}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {format(exam.date, 'MMMM dd, yyyy')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExam(exam.id)}
                        className="rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Study Settings */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>2. Configure Your Schedule</CardTitle>
              <CardDescription>Tell us about your availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hoursPerDay">Available Hours Per Day</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="hoursPerDay"
                    type="number"
                    min="1"
                    max="12"
                    value={planSettings.hoursPerDay}
                    onChange={(e) =>
                      setPlanSettings({ ...planSettings, hoursPerDay: parseInt(e.target.value) })
                    }
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">hours/day</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Calendar
                    mode="single"
                    selected={planSettings.startDate}
                    onSelect={(date) => date && setPlanSettings({ ...planSettings, startDate: date })}
                    className="rounded-xl border w-fit"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Target End Date</Label>
                  <Calendar
                    mode="single"
                    selected={planSettings.endDate}
                    onSelect={(date) => date && setPlanSettings({ ...planSettings, endDate: date })}
                    className="rounded-xl border w-fit"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Personal Goals (optional, one per line)</Label>
                <Textarea
                  id="goals"
                  value={planSettings.goals}
                  onChange={(e) => setPlanSettings({ ...planSettings, goals: e.target.value })}
                  placeholder="e.g., Score above 90%, Master all practice problems, Complete all past papers"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Card className="rounded-2xl shadow-sm bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Ready to Generate Your Plan?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {exams.length === 0
                      ? 'Add at least one exam to generate your study plan'
                      : `We'll create a personalized ${Math.ceil((planSettings.endDate.getTime() - planSettings.startDate.getTime()) / (1000 * 60 * 60 * 24))}-day study plan for your ${exams.length} exam(s)`}
                  </p>
                </div>

                <Button
                  onClick={generateStudyPlan}
                  disabled={exams.length === 0 || isGenerating}
                  size="lg"
                  className="rounded-xl"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating Your Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate My Study Plan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Generated Plan Display */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Your Personalized Study Plan
                  </CardTitle>
                  <CardDescription>Generated on {format(new Date(), 'MMMM dd, yyyy')}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setGeneratedPlan(null);
                    setExams([]);
                  }}
                  className="rounded-xl"
                >
                  Create New Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap bg-muted/30 p-6 rounded-xl">
                  {generatedPlan}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{exams.length}</div>
                <p className="text-xs text-muted-foreground">Subjects to cover</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{planSettings.hoursPerDay}h</div>
                <p className="text-xs text-muted-foreground">Per day</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Duration</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.ceil((planSettings.endDate.getTime() - planSettings.startDate.getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <p className="text-xs text-muted-foreground">Days</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Previous Plans */}
      {studyPlans.length > 0 && !generatedPlan && (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Previous Study Plans</CardTitle>
            <CardDescription>Your past generated plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studyPlans.map((plan) => (
                <div key={plan.id} className="p-4 rounded-xl border bg-card">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{plan.title}</p>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>{format(plan.startDate, 'MMM dd')} - {format(plan.endDate, 'MMM dd')}</span>
                        <span>{plan.hoursPerDay}h/day</span>
                        <span>{plan.exams.length} exams</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGeneratedPlan(plan.generatedPlan || '')}
                      className="rounded-xl"
                    >
                      View Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
