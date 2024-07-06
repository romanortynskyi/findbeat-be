const mockEmailService = {
  sendEmail: () => {
    return new Promise<void>((resolve) => {
      resolve()
    })
  }
}

export default mockEmailService
