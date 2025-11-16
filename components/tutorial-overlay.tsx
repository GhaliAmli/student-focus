/**
 * Tutorial Overlay Component
 * 
 * Interactive step-by-step tutorial with animated tooltips
 * Features:
 * - Dynamic positioning with edge detection
 * - Smooth scrolling and repositioning
 * - Responsive design for all screen sizes
 * - Portal rendering for proper z-index layering
 */

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import { useTutorial } from '@/hooks/use-tutorial';

interface TooltipPosition {
  top: number;
  left: number;
  transform: string;
  maxWidth: number;
}

interface HighlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function TutorialOverlay() {
  const {
    isActive,
    currentStep,
    totalSteps,
    currentStepData,
    nextStep,
    previousStep,
    skipTutorial,
    closeTutorial,
  } = useTutorial();

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: 0,
    left: 0,
    transform: 'translate(-50%, 0)',
    maxWidth: 448, // 28rem
  });
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  /**
   * Calculate optimal tooltip position with edge detection
   */
  const calculateTooltipPosition = useCallback((
    element: HTMLElement,
    preferredPosition?: string
  ): TooltipPosition => {
    const position = preferredPosition || 'bottom';
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 448; // max-w-md
    const tooltipHeight = 300; // estimated height
    const padding = 20; // spacing from element
    const edgePadding = 16; // minimum distance from screen edge

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    let transform = 'translate(-50%, 0)';
    let maxWidth = Math.min(tooltipWidth, viewportWidth - edgePadding * 2);

    // Calculate available space in each direction
    const spaceAbove = rect.top;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceLeft = rect.left;
    const spaceRight = viewportWidth - rect.right;

    // Determine best position based on available space
    let finalPosition = position;

    if (position === 'bottom' && spaceBelow < tooltipHeight + padding) {
      if (spaceAbove > spaceBelow) {
        finalPosition = 'top';
      } else if (spaceRight > tooltipWidth / 2) {
        finalPosition = 'right';
      } else if (spaceLeft > tooltipWidth / 2) {
        finalPosition = 'left';
      }
    } else if (position === 'top' && spaceAbove < tooltipHeight + padding) {
      if (spaceBelow > spaceAbove) {
        finalPosition = 'bottom';
      } else if (spaceRight > tooltipWidth / 2) {
        finalPosition = 'right';
      } else if (spaceLeft > tooltipWidth / 2) {
        finalPosition = 'left';
      }
    } else if (position === 'left' && spaceLeft < tooltipWidth + padding) {
      if (spaceRight > spaceLeft) {
        finalPosition = 'right';
      } else if (spaceBelow > tooltipHeight) {
        finalPosition = 'bottom';
      } else {
        finalPosition = 'top';
      }
    } else if (position === 'right' && spaceRight < tooltipWidth + padding) {
      if (spaceLeft > spaceRight) {
        finalPosition = 'left';
      } else if (spaceBelow > tooltipHeight) {
        finalPosition = 'bottom';
      } else {
        finalPosition = 'top';
      }
    }

    // Calculate position based on final direction
    switch (finalPosition) {
      case 'top':
        top = rect.top - padding;
        left = rect.left + rect.width / 2;
        transform = 'translate(-50%, -100%)';
        
        // Adjust if too close to left edge
        if (left - maxWidth / 2 < edgePadding) {
          left = edgePadding + maxWidth / 2;
        }
        // Adjust if too close to right edge
        if (left + maxWidth / 2 > viewportWidth - edgePadding) {
          left = viewportWidth - edgePadding - maxWidth / 2;
        }
        break;

      case 'bottom':
        top = rect.bottom + padding;
        left = rect.left + rect.width / 2;
        transform = 'translate(-50%, 0)';
        
        // Adjust if too close to left edge
        if (left - maxWidth / 2 < edgePadding) {
          left = edgePadding + maxWidth / 2;
        }
        // Adjust if too close to right edge
        if (left + maxWidth / 2 > viewportWidth - edgePadding) {
          left = viewportWidth - edgePadding - maxWidth / 2;
        }
        break;

      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - padding;
        transform = 'translate(-100%, -50%)';
        
        // Adjust if too close to top edge
        if (top - tooltipHeight / 2 < edgePadding) {
          top = edgePadding + tooltipHeight / 2;
          transform = 'translate(-100%, 0)';
        }
        // Adjust if too close to bottom edge
        if (top + tooltipHeight / 2 > viewportHeight - edgePadding) {
          top = viewportHeight - edgePadding - tooltipHeight / 2;
          transform = 'translate(-100%, -100%)';
        }
        break;

      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + padding;
        transform = 'translate(0, -50%)';
        
        // Adjust if too close to top edge
        if (top - tooltipHeight / 2 < edgePadding) {
          top = edgePadding + tooltipHeight / 2;
          transform = 'translate(0, 0)';
        }
        // Adjust if too close to bottom edge
        if (top + tooltipHeight / 2 > viewportHeight - edgePadding) {
          top = viewportHeight - edgePadding - tooltipHeight / 2;
          transform = 'translate(0, -100%)';
        }
        break;
    }

    return { top, left, transform, maxWidth };
  }, []);

  /**
   * Update positions on scroll or resize
   */
  const updatePositions = useCallback(() => {
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    
    // Update highlight position
    setHighlightPosition({
      top: rect.top - 4,
      left: rect.left - 4,
      width: rect.width + 8,
      height: rect.height + 8,
    });

    // Update tooltip position
    const position = calculateTooltipPosition(
      targetElement,
      currentStepData?.position || 'bottom'
    );
    setTooltipPosition(position);
  }, [targetElement, currentStepData, calculateTooltipPosition]);

  /**
   * Find and setup target element
   */
  useEffect(() => {
    if (!isActive || !currentStepData?.target) {
      setTargetElement(null);
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const element = document.querySelector(currentStepData.target!) as HTMLElement;
      if (element) {
        setTargetElement(element);
        
        // Scroll element into view with offset
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
        
        window.scrollTo({
          top: middle,
          behavior: 'smooth',
        });

        // Update positions after scroll
        setTimeout(updatePositions, 500);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isActive, currentStepData, updatePositions]);

  /**
   * Handle scroll and resize events
   */
  useEffect(() => {
    if (!targetElement) return;

    const handleUpdate = () => {
      // Cancel previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Schedule update on next frame
      animationFrameRef.current = requestAnimationFrame(updatePositions);
    };

    // Attach listeners
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    // Initial update
    handleUpdate();

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetElement, updatePositions]);

  /**
   * Mount check for portal
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isActive || !isMounted) return null;

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  const isCenterPosition = !currentStepData?.target || currentStepData.position === 'center';

  const overlayContent = (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[90] animate-in fade-in duration-300"
        onClick={closeTutorial}
      />

      {/* Highlight Target Element */}
      {targetElement && (
        <>
          {/* Highlight Border with Glow */}
          <div
            className="fixed z-[95] pointer-events-none transition-all duration-300 ease-out"
            style={{
              top: `${highlightPosition.top}px`,
              left: `${highlightPosition.left}px`,
              width: `${highlightPosition.width}px`,
              height: `${highlightPosition.height}px`,
              border: '3px solid hsl(var(--primary))',
              borderRadius: '12px',
              boxShadow: '0 0 0 4px hsl(var(--primary) / 0.2), 0 0 0 9999px rgba(0, 0, 0, 0.4)',
              animation: 'tutorial-pulse 2s ease-in-out infinite',
            }}
          />
          
          {/* Arrow Pointer */}
          {!isCenterPosition && (
            <div
              className="fixed z-[96] pointer-events-none transition-all duration-300 ease-out"
              style={{
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
                transform: tooltipPosition.transform,
              }}
            >
              <div
                className="absolute w-0 h-0"
                style={{
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: '12px solid hsl(var(--primary))',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  ...(currentStepData?.position === 'top' && {
                    borderTop: 'none',
                    borderBottom: '12px solid hsl(var(--card))',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }),
                  ...(currentStepData?.position === 'bottom' && {
                    borderBottom: 'none',
                    borderTop: '12px solid hsl(var(--card))',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }),
                  ...(currentStepData?.position === 'left' && {
                    borderLeft: 'none',
                    borderRight: '12px solid hsl(var(--card))',
                    borderTop: '12px solid transparent',
                    borderBottom: '12px solid transparent',
                    right: '-12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }),
                  ...(currentStepData?.position === 'right' && {
                    borderRight: 'none',
                    borderLeft: '12px solid hsl(var(--card))',
                    borderTop: '12px solid transparent',
                    borderBottom: '12px solid transparent',
                    left: '-12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }),
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Tutorial Card */}
      <div
        ref={tooltipRef}
        className={`fixed z-[100] transition-all duration-300 ease-out ${
          isCenterPosition
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            : ''
        }`}
        style={
          !isCenterPosition
            ? {
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
                transform: tooltipPosition.transform,
                maxWidth: `${tooltipPosition.maxWidth}px`,
              }
            : {
                maxWidth: '90vw',
                width: '448px',
              }
        }
      >
        <Card className="shadow-2xl border-2 border-primary/20 animate-in zoom-in duration-300">
          <CardContent className="pt-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {currentStepData?.icon && (
                  <div className="text-4xl flex-shrink-0">{currentStepData.icon}</div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg leading-tight break-words">
                    {currentStepData?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Step {currentStep + 1} of {totalSteps}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeTutorial}
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <Progress value={progressPercentage} className="h-2" />

            {/* Description */}
            <div className="max-h-[40vh] overflow-y-auto">
              <p className="text-sm text-muted-foreground leading-relaxed break-words">
                {currentStepData?.description}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTutorial}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipForward className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Skip Tutorial</span>
                <span className="sm:hidden">Skip</span>
              </Button>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousStep}
                    className="rounded-xl"
                  >
                    <ChevronLeft className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="rounded-xl"
                >
                  <span className="hidden sm:inline">
                    {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
                  </span>
                  <span className="sm:hidden">
                    {currentStep === totalSteps - 1 ? '✓' : '→'}
                  </span>
                  {currentStep < totalSteps - 1 && (
                    <ChevronRight className="h-4 w-4 sm:ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes tutorial-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.01);
          }
        }
      `}</style>
    </>
  );

  // Use portal to render at document body level
  return createPortal(overlayContent, document.body);
}
