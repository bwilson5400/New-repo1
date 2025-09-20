export async function createSquareCheckout(payload: any) {
  if (process.env.DEMO_MODE === 'true') {
    return { checkoutUrl: '/demo/checkout-success' };
  }
  // TODO: Real Square call with SDK
  return { checkoutUrl: 'https://squareup.com/checkout/...' };
}
