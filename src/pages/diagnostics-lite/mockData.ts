export type HealthMetric = {
  id: string;
  name: string;
  status: 'warning' | 'good' | 'neutral';
  value?: string;
  details?: string;
};

export type HealthInsight = {
  id: string;
  title: string;
  description: string;
};

export type HealthSummary = {
  summary: string;
  doctor: {
    name: string;
    title: string;
    avatar?: string;
  };
  insights: HealthInsight[];
  results: HealthMetric[];
};

export const mockHealthData: HealthSummary = {
  summary: 'Your results show that several key systems in your body — particularly your metabolism, hormones, nervous system, and muscle health — are under strain.',
  doctor: {
    name: 'Dr Matt Vickers',
    title: 'Clinical Lead and Specialist GP',
    avatar: '/avatar.png', // This is a placeholder, you'd need to add this asset
  },
  insights: [
    {
      id: '1',
      title: 'Your metabolism is under strain',
      description: 'A combination of insulin resistance, low muscle mass, visceral fat, and chronic inflammation is making it harder for your body to use energy efficiently, burn fat, or regulate appetite and mood.',
    },
    {
      id: '2',
      title: 'You\'re likely in early perimenopause',
      description: 'Your body is in the middle of a major hormonal transition and it\'s likely that your symptoms are not just unrelated annoyances, but deeply connected pieces of the same puzzle.',
    },
    {
      id: '3',
      title: 'Your muscle health needs attention',
      description: 'Low muscle mass can affect metabolism, energy levels, and overall health. Focused strength training could help improve this metric.',
    },
  ],
  results: [
    {
      id: 'heart',
      name: 'Heart health',
      status: 'warning',
      details: 'Your heart health indicators show some signs of strain that should be monitored.',
    },
    {
      id: 'body',
      name: 'Body composition',
      status: 'warning',
      details: 'Your body fat percentage is higher than optimal and muscle mass is below ideal range.',
    },
    {
      id: 'blood',
      name: 'Blood sugar',
      status: 'warning',
      details: 'Your blood glucose levels indicate early signs of insulin resistance.',
    },
    {
      id: 'cholesterol',
      name: 'Cholesterol levels',
      status: 'warning',
      details: 'Your LDL cholesterol is slightly elevated while HDL cholesterol is lower than optimal.',
    },
    {
      id: 'kidney',
      name: 'Kidney function',
      status: 'warning',
      details: 'Your kidney function tests show some minor abnormalities that should be monitored.',
    },
    {
      id: 'energy',
      name: 'Daily energy',
      status: 'good',
      details: 'Your energy levels throughout the day are within normal range.',
    },
    {
      id: 'hormonal',
      name: 'Hormonal balance',
      status: 'good',
      details: 'While transitioning to perimenopause, your hormonal levels are managing well.',
    },
  ],
};
