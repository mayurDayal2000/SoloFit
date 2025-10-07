"use client";

import { AlertCircle, CheckCircle2, Dumbbell, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Password strength calculation
  const calculatePasswordStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.length >= 12) strength += 25;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength += 25;
    if (/\d/.test(pass)) strength += 15;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(password);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return "bg-destructive";
    if (passwordStrength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 70) return "Medium";
    return "Strong";
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Email Required", {
        description: "Please enter your email address first.",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <Card className="w-full max-w-md shadow-elevated animate-fade-in">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div
              aria-hidden="true"
              className="bg-gradient-hero p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <Dumbbell className="w-8 h-8 text-slate-500" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              Enter the SoloFit Realm
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Your journey to a better you starts here
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs
            className="w-full"
            defaultValue="signin"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <TabsList className="grid w-full grid-cols-2 h-11 sm:h-12">
              <TabsTrigger
                aria-label="Switch to sign in form"
                className="text-sm sm:text-base"
                value="signin"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                aria-label="Switch to sign up form"
                className="text-sm sm:text-base"
                value="signup"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent className="mt-6" value="signin">
              <form className="space-y-5" noValidate onSubmit={handleSignIn}>
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium flex items-center gap-2"
                    htmlFor="signin-email"
                  >
                    <Mail aria-hidden="true" className="w-4 h-4" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      aria-describedby={emailError ? "signin-email-error" : undefined}
                      aria-invalid={!!emailError}
                      autoCapitalize="off"
                      autoComplete="email"
                      autoCorrect="off"
                      className={`h-12 pr-10 ${
                        emailError ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      disabled={loading}
                      id="signin-email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      placeholder="your@email.com"
                      required
                      spellCheck="false"
                      type="email"
                      value={email}
                    />
                    {email && validateEmail(email) && (
                      <CheckCircle2
                        aria-hidden="true"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500"
                      />
                    )}
                  </div>
                  {emailError && (
                    <p
                      className="text-sm text-destructive flex items-center gap-1"
                      id="signin-email-error"
                      role="alert"
                    >
                      <AlertCircle aria-hidden="true" className="w-4 h-4" />
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium flex items-center gap-2"
                    htmlFor="signin-password"
                  >
                    <Lock aria-hidden="true" className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      aria-describedby={passwordError ? "signin-password-error" : undefined}
                      aria-invalid={!!passwordError}
                      autoComplete="current-password"
                      className={`h-12 pr-12 ${
                        passwordError ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      disabled={loading}
                      id="signin-password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
                      disabled={loading}
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={0}
                      type="button"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p
                      className="text-sm text-destructive flex items-center gap-1"
                      id="signin-password-error"
                      role="alert"
                    >
                      <AlertCircle aria-hidden="true" className="w-4 h-4" />
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button
                    className="text-sm text-primary hover:text-primary/80 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1 transition-colors"
                    disabled={loading}
                    onClick={handleForgotPassword}
                    type="button"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  aria-busy={loading}
                  className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:ring-4 focus:ring-primary/30"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent className="mt-6" value="signup">
              <form className="space-y-5" noValidate onSubmit={handleSignUp}>
                {/* Password Requirements Alert */}
                <Alert className="bg-muted/50 border-muted">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs sm:text-sm">
                    Password must be at least 8 characters with uppercase, lowercase, and numbers.
                  </AlertDescription>
                </Alert>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium flex items-center gap-2"
                    htmlFor="signup-email"
                  >
                    <Mail aria-hidden="true" className="w-4 h-4" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      aria-describedby={emailError ? "signup-email-error" : undefined}
                      aria-invalid={!!emailError}
                      autoCapitalize="off"
                      autoComplete="email"
                      autoCorrect="off"
                      className={`h-12 pr-10 ${
                        emailError ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      disabled={loading}
                      id="signup-email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      placeholder="your@email.com"
                      required
                      spellCheck="false"
                      type="email"
                      value={email}
                    />
                    {email && validateEmail(email) && (
                      <CheckCircle2
                        aria-hidden="true"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500"
                      />
                    )}
                  </div>
                  {emailError && (
                    <p
                      className="text-sm text-destructive flex items-center gap-1"
                      id="signup-email-error"
                      role="alert"
                    >
                      <AlertCircle aria-hidden="true" className="w-4 h-4" />
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    className="text-sm font-medium flex items-center gap-2"
                    htmlFor="signup-password"
                  >
                    <Lock aria-hidden="true" className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      aria-describedby={
                        passwordError
                          ? "signup-password-error password-strength"
                          : "password-strength"
                      }
                      aria-invalid={!!passwordError}
                      autoComplete="new-password"
                      className={`h-12 pr-12 ${
                        passwordError ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                      disabled={loading}
                      id="signup-password"
                      minLength={8}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
                      disabled={loading}
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={0}
                      type="button"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div aria-live="polite" className="space-y-2" id="password-strength">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Password Strength:</span>
                        <span
                          className={`text-xs font-semibold ${
                            passwordStrength < 40
                              ? "text-destructive"
                              : passwordStrength < 70
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        >
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <Progress
                        className={cn("h-2", getPasswordStrengthColor())}
                        value={passwordStrength}
                      />
                    </div>
                  )}

                  {passwordError && (
                    <p
                      className="text-sm text-destructive flex items-center gap-1"
                      id="signup-password-error"
                      role="alert"
                    >
                      <AlertCircle aria-hidden="true" className="w-4 h-4" />
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  aria-busy={loading}
                  className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 focus:ring-4 focus:ring-primary/30"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
