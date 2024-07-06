/* eslint-disable @typescript-eslint/no-unused-vars */

const mockStripeAccountService = {
  addAccount: (_email: string) => {
    return Promise.resolve({
      id: 'new-id',
    })
  }
}

export default mockStripeAccountService
