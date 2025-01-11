"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { contactSchema, onSubmit } from "@/utils/contact/contactForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formFields = [
  { name: "firstname", label: "Prénom", placeholder: "Prénom" },
  { name: "lastname", label: "Nom", placeholder: "Nom" },
  { name: "email", label: "Email", placeholder: "Email" },
] as const;

export default function ContactForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter();
  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      message: "",
    },
  });

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit((values) => {
          onSubmit({ values, setLoading });
          contactForm.reset();
        })}
        className="max-w-4xl space-y-4 px-3 py-5"
      >
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={contactForm.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="space-y-1">
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-50 dark:bg-transparent"
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-32 bg-gray-50 dark:bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="w-[190px]" loading={loading}>
            Envoyer mon message
          </Button>
        </div>
      </form>
    </Form>
  );
}
