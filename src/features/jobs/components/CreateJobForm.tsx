"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateJob } from "../hooks/useCreateJob";
import { useState } from "react";
import { JobType } from "../types/job";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const jobTypes: { value: JobType; label: string }[] = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

interface Props {
  onSuccess?: () => void;
}

export const CreateJobForm = ({ onSuccess }: Props) => {
  const createMutation = useCreateJob();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    type: "full_time" as JobType,
    salary: "",
    requirements: "",
    benefits: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      {
        title: form.title,
        description: form.description,
        company: form.company,
        location: form.location || undefined,
        type: form.type,
        salary: form.salary || undefined,
        requirements: form.requirements || undefined,
        benefits: form.benefits || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setForm({
            title: "",
            description: "",
            company: "",
            location: "",
            type: "full_time",
            salary: "",
            requirements: "",
            benefits: "",
          });
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <PlusIcon className="size-4 mr-1" /> Post a Job
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="e.g. Google"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label>Job Type</Label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((jt) => (
                  <button
                    key={jt.value}
                    type="button"
                    onClick={() => setForm({ ...form, type: jt.value })}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      form.type === jt.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {jt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary Range</Label>
            <Input
              id="salary"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              placeholder="e.g. $100k - $150k"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              placeholder="List the required skills and qualifications..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea
              id="benefits"
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
              placeholder="List the benefits and perks..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
