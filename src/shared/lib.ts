export const asyncDelay = async <Return>(
  cb: () => Promise<Return>,
  ms: number = 1000
): Promise<Return> => {
  const [cbResponce] = await Promise.all([
    cb(),
    new Promise(resolve => setTimeout(resolve, ms)),
  ])

  return cbResponce
}
