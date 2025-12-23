"use client"

import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, ShieldCheck, UserCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const loginSchema = z.object({
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır.",
  }),
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    
    // UI/UX Gereksinimi: Hata simülasyonu
    if (values.email === "hata@fylexa.com") {
      setTimeout(() => {
        setIsLoading(false)
        toast.error("Giriş Başarısız", {
          description: "E-posta veya şifre hatalı. Lütfen tekrar deneyin.",
        })
        form.setError("email", { type: "manual", message: " " })
        form.setError("password", { type: "manual", message: " " })
      }, 1000)
      return
    }

    // UI/UX Gereksinimi: Rol bazlı yönlendirme simülasyonu
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Giriş Başarılı", {
        description: "Panel'e yönlendiriliyorsunuz...",
      })

      if (values.email === "staff@fylexa.com") {
        router.push("/operations")
      } else {
        router.push("/")
      }
    }, 1500)
  }

  const quickLogin = (email: string) => {
    form.setValue("email", email)
    form.setValue("password", "123456")
    form.handleSubmit(onSubmit)()
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sol Panel - Branding & Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary p-12 text-primary-foreground flex-col justify-between">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        <div className="relative z-20">
          <Link href="/" className="flex items-center">
            <Image 
              src="/horizontal-original.png" 
              alt="Fylexa Logo" 
              width={160} 
              height={40} 
              className="h-10 w-auto brightness-0 invert" 
              priority
            />
          </Link>
        </div>
        <div className="relative z-20 max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-4xl font-bold leading-tight">
              "Fylexa ile stüdyomun yönetimini tamamen dijitalleştirdim. Artık sadece üyelerime odaklanabiliyorum."
            </p>
            <footer className="text-lg opacity-80 font-medium">— Mehmet Demir, Stüdyo Sahibi</footer>
          </blockquote>
        </div>
        <div className="relative z-20">
          <p className="text-sm opacity-60">© 2025 Fylexa Panel. Tüm hakları saklıdır.</p>
        </div>
      </div>

      {/* Sağ Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md border-none shadow-none lg:shadow-sm bg-transparent lg:bg-card">
          <CardHeader className="space-y-2 text-center lg:text-left">
            <CardTitle className="text-3xl font-bold tracking-tight">Tekrar Hoş Geldiniz</CardTitle>
            <CardDescription className="text-base">
              Lütfen hesap bilgilerinizle giriş yapın.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">E-posta Adresi</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="mehmet@studyo.com" 
                          {...field} 
                          className={`h-11 ${form.formState.errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`} 
                        />
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
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Şifre</FormLabel>
                        <button type="button" className="text-xs font-medium text-primary hover:underline underline-offset-4">
                          Şifremi Unuttum
                        </button>
                      </div>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          className={`h-11 ${form.formState.errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-11 text-base font-bold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Giriş yapılıyor...
                    </>
                  ) : "Giriş Yap"}
                </Button>
              </form>
            </Form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background lg:bg-card px-2 text-muted-foreground font-medium">Hızlı Giriş (Test)</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button variant="outline" size="sm" className="h-10" onClick={() => quickLogin("owner@fylexa.com")} disabled={isLoading}>
                  <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                  Owner
                </Button>
                <Button variant="outline" size="sm" className="h-10" onClick={() => quickLogin("staff@fylexa.com")} disabled={isLoading}>
                  <UserCircle2 className="mr-2 h-4 w-4 text-orange-500" />
                  Staff
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-6 bg-muted/30 rounded-b-lg mt-6">
            <p className="text-center text-sm text-muted-foreground font-medium">
              Henüz bir ortağımız değil misiniz?{" "}
              <button className="text-primary font-bold hover:underline underline-offset-4">
                Hemen Başvurun
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

