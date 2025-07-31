import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const prototypes = [
  {
    id: 'diagnostics-lite',
    name: 'Diagnostics Lite',
    description: 'Letsgo.',
    path: '/diagnostics-lite',
  },
  {
    id: 'prototype-b',
    name: 'Prototype B',
    description: 'This is the second prototype example',
    path: '/prototype-b',
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Internal Design Prototypes
          </h1>
          <p className="text-muted-foreground">
            Navigate to different prototype implementations
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {prototypes.map((prototype) => (
            <div
              key={prototype.id}
              className="relative group rounded-lg border border-border p-6 hover:shadow-md transition-all"
            >
              <h2 className="text-2xl font-semibold mb-2">{prototype.name}</h2>
              <p className="text-muted-foreground mb-4">
                {prototype.description}
              </p>

              <Link to={prototype.path}>
                <Button>View Prototype</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
