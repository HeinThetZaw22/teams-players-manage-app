"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { createTeam } from "@/state/teamSlice";
import { TeamSchema } from "@/schemas";
import toast from "react-hot-toast";

interface TeamCreateDialogProps {
  onSuccess?: () => void;
}

export const TeamCreateDialog = ({ onSuccess }: TeamCreateDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.teams.teams);

  const form = useForm<z.infer<typeof TeamSchema>>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: "",
      region: "",
      country: "",
    },
  });

  const onSubmit = (values: z.infer<typeof TeamSchema>) => {
    startTransition(() => {
      const nameExists = teams.some((t) => t.name === values.name);
      if (nameExists) {
        setError("Team name already exists.");
        setSuccess(undefined);
        return;
      }

      try {
        dispatch(createTeam(values));
        toast.success("Team created successfully!");
        setSuccess("Team created successfully!");
        setError(undefined);
        form.reset();
        onSuccess?.();
      } catch (err) {
        setError("Something went wrong.");
        setSuccess(undefined);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Real Madrid"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Madrid"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Spain"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Create Team
        </Button>
      </form>
    </Form>
  );
};
