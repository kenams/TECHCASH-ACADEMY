import Stripe from "stripe";
import { getServerEnv } from "@/lib/env";

let stripeClient: Stripe | undefined;

export function getStripeClient() {
  if (!stripeClient) {
    const serverEnv = getServerEnv();

    stripeClient = new Stripe(serverEnv.stripeSecretKey, {
      apiVersion: "2025-02-24.acacia"
    });
  }

  return stripeClient;
}
