import { Check } from "lucide-react";

interface OrderStepperProps {
  currentStep: number;
  steps: string[];
}

export default function OrderStepper({ currentStep, steps }: OrderStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 border-2 border-neo-black flex items-center justify-center font-mono font-bold text-sm transition-colors duration-200 ${
                    isCompleted
                      ? "bg-neo-lime"
                      : isActive
                        ? "bg-neo-lime"
                        : "bg-neo-white"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} className="text-neo-black" />
                  ) : (
                    <span className={isFuture ? "text-neo-black/40" : "text-neo-black"}>
                      {stepNumber}
                    </span>
                  )}
                </div>

                {/* Label — hidden on mobile */}
                <span
                  className={`hidden sm:block mt-2 font-mono text-xs uppercase text-center max-w-[80px] leading-tight ${
                    isActive
                      ? "font-bold text-neo-black"
                      : isCompleted
                        ? "font-bold text-neo-black/70"
                        : "text-neo-black/40"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Connecting line (skip after last step) */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-3">
                  <div
                    className={`h-0.5 w-full transition-colors duration-200 ${
                      stepNumber < currentStep
                        ? "bg-neo-black"
                        : "bg-neo-black/20"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
