import { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import { mockHealthData, HealthInsight, HealthMetric } from './mockData';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';

const DiagnosticsLite = () => {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const { summary, doctor, insights, results } = mockHealthData;

  // Force mobile viewport
  useEffect(() => {
    // Set viewport meta tag to ensure mobile rendering
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content =
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 max-w-md mx-auto overflow-hidden">
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-medium mb-1 mx-16 text-white">
            Your health insights are ready
          </h1>
        </div>

        {/* Summary card */}
        <Card className="relative bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Summary</h3>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-300 mb-4">{summary}</p>
            <div className="flex items-center mt-4">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex-shrink-0 mr-3">
                {doctor.avatar && (
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="h-full w-full rounded-full"
                  />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm text-white">{doctor.name}</p>
                <p className="text-xs text-gray-400">{doctor.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights section */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Insights</h3>
            <div className="flex items-center text-orange-400 text-sm">
              <span>{insights.length} to review</span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex space-x-3 px-1 py-2 w-max">
                {insights.map((insight: HealthInsight) => (
                  <Card
                    key={insight.id}
                    className="relative overflow-hidden flex-shrink-0 w-[85%] max-w-[280px] shadow-sm hover:shadow-lg transition-shadow bg-gray-800 border-gray-700"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-base font-semibold mb-2 text-white">
                          {insight.title}
                        </h4>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {insight.description}
                      </p>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pagination indicators */}
            <div className="flex justify-center mt-3 space-x-1.5">
              {insights.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === 0 ? 'w-4 bg-orange-500' : 'w-1.5 bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Results pagination dots */}
        <div className="flex justify-center space-x-1 my-4 sm:my-6">
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          <div className="h-2 w-2 rounded-full bg-gray-600"></div>
        </div>

        {/* Results section */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Results</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-300">
              <span>Most important</span>
            </div>
          </div>

          <div className="space-y-2">
            {results.map((result: HealthMetric) => (
              <Card
                key={result.id}
                className={cn(
                  'relative overflow-hidden active:bg-gray-700 transition-colors cursor-pointer bg-gray-800 border-gray-700',
                )}
                onClick={() =>
                  setActiveInsight(
                    activeInsight === result.id ? null : result.id,
                  )
                }
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        'h-8 w-8 rounded-full flex items-center justify-center mr-3',
                        result.status === 'warning'
                          ? 'text-orange-400'
                          : 'text-green-400',
                      )}
                    >
                      {result.status === 'warning' ? (
                        <AlertCircle className="h-6 w-6" />
                      ) : (
                        <CheckCircle className="h-6 w-6" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-white">{result.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
                {activeInsight === result.id && result.details && (
                  <div className="px-4 pb-4 text-sm text-gray-300">
                    {result.details}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsLite;
