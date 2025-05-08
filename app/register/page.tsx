"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, Briefcase, Code, Palette, PenTool } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  profession: z.enum(["content-creator", "graphic-designer", "software-developer", "entrepreneur"], {
    required_error: "Please select a profession.",
  }),
})

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profession: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this data to your backend
    console.log(values)

    toast({
      title: "Registration successful!",
      description: "You've been registered successfully.",
    })

    // Redirect to the workspace based on profession
    router.push(`/workspace/${values.profession}`)
  }

  const professions = [
    {
      value: "content-creator",
      icon: <PenTool className="h-6 w-6 text-rose-500" />,
      title: "Content Creator",
      description: "Video editing, content planning, and audience growth",
    },
    {
      value: "graphic-designer",
      icon: <Palette className="h-6 w-6 text-violet-500" />,
      title: "Graphic Designer",
      description: "Design software, asset libraries, and creative resources",
    },
    {
      value: "software-developer",
      icon: <Code className="h-6 w-6 text-emerald-500" />,
      title: "Software Developer",
      description: "Coding tools, frameworks, and development resources",
    },
    {
      value: "entrepreneur",
      icon: <Briefcase className="h-6 w-6 text-amber-500" />,
      title: "Entrepreneur",
      description: "Business planning, marketing, and management tools",
    },
  ]

  return (
    <div className="container max-w-md mx-auto py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">Register to get personalized tool recommendations</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    form.trigger(["name", "email", "password"]).then((isValid) => {
                      if (isValid) setStep(2)
                    })
                  }}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel>Select your profession</FormLabel>
                      <FormDescription>We'll customize your workspace based on your selection</FormDescription>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 gap-4"
                        >
                          {professions.map((profession) => (
                            <FormItem key={profession.value}>
                              <FormControl>
                                <RadioGroupItem
                                  value={profession.value}
                                  id={profession.value}
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={profession.value}
                                className="flex flex-col items-start space-y-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <div className="flex items-center gap-2">
                                  {profession.icon}
                                  <span className="font-medium">{profession.title}</span>
                                </div>
                                <span className="text-sm font-normal text-muted-foreground">
                                  {profession.description}
                                </span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
