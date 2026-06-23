import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";

interface BidSubmitFormProps {
  jobId: number;
  jobTitle: string;
  budget: string;
  onSubmit?: (bid: BidData) => void;
  onCancel?: () => void;
}

interface BidData {
  proposal: string;
  timeline: string;
  quote: string;
  milestoneBreakdown: { name: string; percentage: number; amount: string }[];
}

export function BidSubmitForm({ jobId, jobTitle, budget, onSubmit, onCancel }: BidSubmitFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<BidData>({
    proposal: "",
    timeline: "",
    quote: "",
    milestoneBreakdown: [
      { name: "Milestone 1", percentage: 50, amount: (parseInt(budget) * 0.5).toFixed(2) },
      { name: "Milestone 2", percentage: 50, amount: (parseInt(budget) * 0.5).toFixed(2) },
    ],
  });

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quote = e.target.value;
    setFormData({
      ...formData,
      quote,
      milestoneBreakdown: formData.milestoneBreakdown.map((m) => ({
        ...m,
        amount: (parseInt(quote || "0") * m.percentage / 100).toFixed(2),
      })),
    });
  };

  const handleMilestoneChange = (index: number, percentage: number) => {
    const newBreakdown = [...formData.milestoneBreakdown];
    newBreakdown[index].percentage = percentage;
    newBreakdown[index].amount = (parseInt(formData.quote || "0") * percentage / 100).toFixed(2);
    setFormData({ ...formData, milestoneBreakdown: newBreakdown });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const isValid = formData.proposal.trim() && formData.timeline.trim() && formData.quote;

  return (
    <Card className="card-base">
      <CardHeader>
        <CardTitle>Submit Your Proposal</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{jobTitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 ? (
          <>
            {/* Step 1: Proposal Details */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Your Proposal
                </label>
                <Textarea
                  value={formData.proposal}
                  onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                  placeholder="Explain why you're the right fit for this job, your approach, and relevant experience..."
                  className="input-base w-full h-32 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Timeline (e.g., 2 weeks, 10 days)
                </label>
                <Input
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="How long will this project take?"
                  className="input-base"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Your Quote (ETH)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={formData.quote}
                    onChange={handleQuoteChange}
                    placeholder={budget}
                    className="input-base flex-1"
                  />
                  <div className="px-3 py-2 bg-background/50 rounded-lg border border-border text-sm text-muted-foreground">
                    Budget: ${budget}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-300">
                  Your quote should be competitive but fair. Consider the project scope and timeline.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={onCancel} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={!isValid}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Next: Review Milestones
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Milestone Breakdown */}
            <div className="space-y-4">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-300">
                  <p className="font-semibold">Proposal Details Confirmed</p>
                  <p className="text-xs mt-1">Quote: ${formData.quote} • Timeline: {formData.timeline}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">
                  Milestone Breakdown
                </label>
                <div className="space-y-3">
                  {formData.milestoneBreakdown.map((milestone, idx) => (
                    <div key={idx} className="p-4 bg-background/50 rounded-lg border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{milestone.name}</p>
                        <Badge className="bg-primary/20 text-primary">${milestone.amount}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={milestone.percentage}
                          onChange={(e) => handleMilestoneChange(idx, parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-semibold text-foreground w-12 text-right">
                          {milestone.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-background/50 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Total Quote</p>
                  <p className="text-lg font-bold text-primary">${formData.quote}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Submit Proposal
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
