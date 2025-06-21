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
import { useState, useTransition, useEffect } from "react";
import { useAppDispatch } from "@/app/redux";
import { updateTeam } from "@/state/teamSlice";
import { TeamSchema } from "@/schemas";
import toast from "react-hot-toast";
import { Team } from "@/state/teamSlice";

interface TeamEditDialogProps {
  team: Team;
  onSuccess?: () => void;
}

export const TeamEditDialog = ({ team, onSuccess }: TeamEditDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof TeamSchema>>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: team.name,
      region: team.region,
      country: team.country,
    },
  });

  useEffect(() => {
    form.reset({
      name: team.name,
      region: team.region,
      country: team.country,
    });
  }, [team, form]);

  const onSubmit = (values: z.infer<typeof TeamSchema>) => {
    startTransition(() => {
      try {
        dispatch(updateTeam({ ...values, id: team.id }));
        toast.success("Team updated successfully!");
        setSuccess("Team updated successfully!");
        setError(undefined);
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
                  <Input {...field} disabled={isPending} placeholder="Madrid" />
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
                  <Input {...field} disabled={isPending} placeholder="Spain" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
