/**
 * Konami Code Demo Component
 * 
 * Provides easy testing for the Konami Code easter egg
 * Shows instructions and demo button
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Zap, Ghost } from 'lucide-react';
import { triggerKonamiCodeDemo } from '@/hooks/use-konami-code';

export function KonamiDemo() {
  const konamiSequence = [
    { key: '↑', name: 'Arrow Up' },
    { key: '↑', name: 'Arrow Up' },
    { key: '↓', name: 'Arrow Down' },
    { key: '↓', name: 'Arrow Down' },
    { key: '←', name: 'Arrow Left' },
    { key: '→', name: 'Arrow Right' },
    { key: '←', name: 'Arrow Left' },
    { key: '→', name: 'Arrow Right' },
    { key: 'B', name: 'B Key' },
    { key: 'A', name: 'A Key' },
  ];

  return (
    <Card className="rounded-2xl shadow-sm border-dashed border-2 border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5" />
          Konami Code Easter Egg
        </CardTitle>
        <CardDescription>
          Try the classic cheat code for a surprise!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Enter this sequence on your keyboard:</p>
          <div className="flex flex-wrap gap-1">
            {konamiSequence.map((item, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {item.key}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
          </p>
        </div>

        {/* Effects */}
        <div className="space-y-2">
          <p className="text-sm font-medium">What happens:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              <span>First time: Confetti explosion! 🎉</span>
            </div>
            <div className="flex items-center gap-2">
              <Ghost className="h-3 w-3" />
              <span>Then: Spooky Halloween theme activated! 👻</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              <span>Again: Deactivates spooky mode</span>
            </div>
          </div>
        </div>

        {/* Demo Button */}
        <div className="pt-2 border-t">
          <Button
            onClick={triggerKonamiCodeDemo}
            variant="outline"
            className="w-full rounded-xl"
          >
            <Gamepad2 className="h-4 w-4 mr-2" />
            Demo Konami Code
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Or try typing the sequence manually!
          </p>
        </div>

        {/* Console Tip */}
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-xs text-muted-foreground">
            <strong>Developer tip:</strong> Open console and type{' '}
            <code className="bg-muted px-1 rounded">triggerKonamiCode()</code> to test
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
